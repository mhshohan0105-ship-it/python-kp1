// Content checker: runs every code example, solution and common-mistake snippet
// through real Python and compares the result with the output written in the data files.
// Also warns about code lines without a comment.
//
// Snippets run in parallel, each in its own temporary folder (so files one snippet
// writes never affect another).
//
// Usage:  npm run check:content        (needs Python 3 on PATH as "python")
import { build } from "esbuild";
import { spawn } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { cpus, tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const work = mkdtempSync(join(tmpdir(), "kp1-check-"));
const bundle = join(work, "data.mjs");
await build({ entryPoints: ["src/data/index.ts"], bundle: true, format: "esm", platform: "node", outfile: bundle, logLevel: "error" });
const { MODULES } = await import(pathToFileURL(bundle).href);

const PY = process.env.PYTHON || "python";
const RUNNER = `import builtins, runpy, sys
def _echo_input(prompt=""):
    line = sys.stdin.readline()
    value = line.rstrip("\\n")
    print(str(prompt) + value)
    return value
builtins.input = _echo_input
runpy.run_path("main.py", run_name="__main__")
`;

const codeOf = (lines) => lines.map((l) => l.c).join("\n");
const norm = (s) => s.replace(/\r/g, "").split("\n").map((l) => l.replace(/\s+$/, "")).join("\n").trim();
const fixPath = (s) => s.replace(/File "[^"]*main\.py"/g, 'File "main.py"');

let jobId = 0;
/** Run one snippet in its own folder. echo=true simulates typing for input(). */
function run(code, stdin = "", echo = true) {
  const dir = join(work, `job${jobId++}`);
  mkdirSync(dir);
  writeFileSync(join(dir, "main.py"), code);
  if (echo) writeFileSync(join(dir, "runner.py"), RUNNER);
  return new Promise((resolve) => {
    const child = spawn(PY, [echo ? "runner.py" : "main.py"], {
      cwd: dir,
      env: { ...process.env, PYTHONIOENCODING: "utf-8", PYTHONUTF8: "1" },
    });
    let out = "";
    let err = "";
    // A snippet that hangs (e.g. an infinite loop) is reported instead of blocking the run.
    const timer = setTimeout(() => {
      err += "\n[TIMED OUT after 20s]";
      child.kill();
    }, 20000);
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ out, err: fixPath(err), code });
    });
    child.stdin.end(stdin.endsWith("\n") || stdin === "" ? stdin : stdin + "\n");
  });
}

/** For examples with input(): read the typed values from the expected output ("Prompt: value"). */
function guessInput(code, output) {
  const prompts = [...code.matchAll(/input\("([^"]*)"\)/g)].map((x) => x[1]);
  const lines = output.split("\n");
  return prompts
    .map((p) => {
      const l = lines.find((x) => x.startsWith(p));
      return l ? l.slice(p.length) : "";
    })
    .join("\n");
}

const warn = [];
function checkComments(where, lines) {
  lines.forEach((l, i) => {
    if (l.c.trim() && !l.c.trim().startsWith("#") && !(l.bn && l.en)) warn.push(`${where} line ${i + 1}: no comment → ${l.c}`);
  });
}

// ---- collect every check as a job: { where, start(): Promise<null | {expected, actual}> }
const jobs = [];
for (const m of MODULES) {
  for (const tpc of m.topics) {
    const base = `M${m.number}/${tpc.id}`;
    tpc.sections.forEach((s, i) => {
      const where = `${base} section ${i} (${s.type})`;
      if (s.type === "code") {
        // Terminal commands and verbatim files (lang: "shell") may show lines without comments on purpose.
        if (s.lang !== "shell") checkComments(where, s.lines);
        if (s.output === undefined || s.lang === "shell" || s.noRun) return;
        const code = codeOf(s.lines);
        // Use the typed values shown after the prompts in the expected output as stdin.
        const stdin = code.includes("input(") ? guessInput(code, s.output) : "";
        jobs.push({
          where,
          start: async () => {
            if (s.isError) {
              const r = await run(code, stdin, false);
              const exp = s.output.slice(s.output.indexOf("Traceback"));
              return norm(r.err) === norm(exp) ? null : { expected: exp, actual: r.err };
            }
            const r = await run(code, stdin, true);
            return norm(r.out) === norm(s.output) && r.code === 0 ? null : { expected: s.output, actual: r.out + r.err };
          },
        });
      }
      if (s.type === "stepper") {
        checkComments(where, s.code);
        const code = codeOf(s.code);
        const exp = s.steps.map((x) => x.out).filter((x) => x !== undefined).join("\n");
        jobs.push({
          where,
          start: async () => {
            const r = await run(code, code.includes("input(") ? guessInput(code, exp) : "", true);
            return norm(r.out) === norm(exp) ? null : { expected: exp, actual: r.out + r.err };
          },
        });
      }
      if (s.type === "mistakes") {
        s.items.forEach((it, j) => {
          const err = typeof it.error === "string" ? it.error : it.error.en;
          // Run every mistake whose "error" is a real Python error line (dotted names like json.decoder.JSONDecodeError too).
          if (!/^[\w.]+(Error|UnsupportedOperation):/.test(err) || it.mistake.includes("input(") || it.noRun) return;
          jobs.push({
            where: `${where} mistake ${j + 1}`,
            start: async () => {
              const r = await run(it.mistake, "", false);
              const last = norm(r.err).split("\n").pop();
              return last === norm(err) ? null : { expected: err, actual: r.err };
            },
          });
        });
      }
    });
    tpc.practice.forEach((p) => {
      const where = `${base} practice ${p.id}`;
      checkComments(where, p.solution);
      if (p.lang === "shell" || p.noRun) return;
      jobs.push({
        where,
        start: async () => {
          const r = await run(codeOf(p.solution), p.sampleInput ?? "", true);
          return norm(r.out) === norm(p.expectedOutput) && r.code === 0 ? null : { expected: p.expectedOutput, actual: r.out + r.err };
        },
      });
    });
  }
}

// ---- run jobs with a small worker pool, keep results in order
const results = new Array(jobs.length);
let next = 0;
async function worker() {
  while (next < jobs.length) {
    const i = next++;
    results[i] = await jobs[i].start();
  }
}
await Promise.all(Array.from({ length: Math.max(2, cpus().length) }, worker));

let fails = 0;
results.forEach((res, i) => {
  if (!res) return;
  fails++;
  console.log(`\n✘ ${jobs[i].where}\n--- expected ---\n${res.expected}\n--- actual ---\n${res.actual}`);
});

rmSync(work, { recursive: true, force: true });
if (warn.length) console.log(`\n⚠ ${warn.length} code line(s) without a comment:\n` + warn.map((w) => "  " + w).join("\n"));
console.log(`\n${jobs.length - fails}/${jobs.length} snippets match their expected output.`);
process.exit(fails ? 1 : 0);
