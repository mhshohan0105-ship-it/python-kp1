// Structure checker: practice counts per level (4 easy, 5 medium, 3 hard, 1 QA), quiz present,
// mistakes + summary sections, output boxes on code, and bilingual text that is really translated.
// Usage:  npm run check:structure
import { build } from "esbuild";
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
const work = mkdtempSync(join(tmpdir(), "kp1-struct-"));
const out = join(work, "data.mjs");
await build({ entryPoints: ["src/data/index.ts"], bundle: true, format: "esm", platform: "node", outfile: out, logLevel: "error" });
const { MODULES } = await import(pathToFileURL(out).href);
const bn = /[ঀ-৿]/;
const issues = [];
let tasks = 0, quiz = 0;
function walk(x, path) {
  if (Array.isArray(x)) return x.forEach((v, i) => walk(v, `${path}[${i}]`));
  if (x && typeof x === "object") {
    if ("bn" in x && "en" in x && Object.keys(x).length === 2) {
      // Ignore code spans and symbols: a hint that is only code reads the same in both languages.
      const prose = x.bn.replace(/`[^`]*`/g, "").replace(/[^A-Za-zঀ-৿]+/g, " ").trim();
      if (!x.bn || !x.en) issues.push(`EMPTY ${path}`);
      else if (prose.replace(/ /g, "").length < 25) return;
      else if (!bn.test(x.bn) && x.bn.length > 20 && x.bn === x.en) issues.push(`SAME ${path}: ${x.bn.slice(0, 60)}`);
      else if (!bn.test(x.bn) && x.bn.length > 30) issues.push(`NO-BANGLA ${path}: ${x.bn.slice(0, 60)}`);
      return;
    }
    for (const [k, v] of Object.entries(x)) walk(v, `${path}.${k}`);
  }
}
for (const m of MODULES) for (const t of m.topics) {
  const isMixed = t.kind === "mixed";
  if (!t.sections.length && !isMixed) { issues.push(`EMPTY TOPIC ${t.id}`); continue; }
  walk(t, `M${m.number}/${t.id}`);
  tasks += t.practice.length; quiz += t.quiz.length;
  const c = { easy: 0, medium: 0, hard: 0, qa: 0 };
  t.practice.forEach((p) => c[p.level]++);
  const ok = c.easy >= 4 && c.medium >= 5 && c.hard >= 3 && c.qa >= 1 && t.practice.length >= 12 && t.quiz.length > 0;
  console.log(`M${m.number} ${t.id.padEnd(26)} sections=${t.sections.length} E${c.easy} M${c.medium} H${c.hard} QA${c.qa} quiz=${t.quiz.length} ${ok ? "OK" : "MISSING"}`);
  if (!isMixed && !t.sections.some((s) => s.type === "mistakes")) issues.push(`NO MISTAKES ${t.id}`);
  if (!isMixed && !t.sections.some((s) => s.type === "summary")) issues.push(`NO SUMMARY ${t.id}`);
  t.sections.forEach((s, i) => { if (s.type === "code" && s.output === undefined && s.lang !== "shell") issues.push(`NO OUTPUT ${t.id} section ${i}`); });
}
console.log(`tasks=${tasks} quiz=${quiz}`);
console.log(issues.join("\n") || "no language issues");
