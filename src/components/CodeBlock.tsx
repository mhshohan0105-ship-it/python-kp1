import { useState } from "react";
import type { CodeLang, CodeLine, Lang } from "../types";
import { useApp } from "../context/AppContext";
import { highlightPython } from "../lib/highlight";
import { UI, tr } from "../lib/ui";

/** Turn code lines + comments (in the chosen language) into plain text lines. */
export function renderLines(lines: CodeLine[], lang: Lang): string[] {
  // Align comments in a column, but never wider than 36 chars of code.
  const width = Math.min(
    36,
    Math.max(0, ...lines.filter((l) => l.c && (l.bn || l.en) && l.c.length <= 36).map((l) => l.c.length)),
  );
  return lines.map((l) => {
    const comment = lang === "bn" ? l.bn ?? l.en : l.en ?? l.bn;
    if (!l.c) return comment ? `# ${comment}` : "";
    if (!comment) return l.c;
    return `${l.c.padEnd(width)}  # ${comment}`;
  });
}

export function CopyButton({ text }: { text: string }) {
  const { lang } = useApp();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(
          () => {
            setDone(true);
            setTimeout(() => setDone(false), 1500);
          },
          () => undefined,
        );
      }}
      className="rounded-md border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-slate-100 hover:bg-white/20"
    >
      {done ? tr(UI.copied, lang) : tr(UI.copy, lang)}
    </button>
  );
}

/** For terminal commands: colour only the comments. */
function highlightShell(line: string) {
  const i = line.indexOf("#");
  if (i < 0) return line;
  return (
    <>
      {line.slice(0, i)}
      <span className="tok-comment">{line.slice(i)}</span>
    </>
  );
}

export function CodeView({
  lines,
  highlightLine,
  title,
  lang: codeLang = "python",
}: {
  lines: CodeLine[];
  highlightLine?: number;
  title?: string;
  lang?: CodeLang;
}) {
  const { lang } = useApp();
  const text = renderLines(lines, lang);
  return (
    <div className="overflow-hidden rounded-xl bg-slate-900 ring-1 ring-slate-800 dark:bg-slate-950">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2">
        <span className="truncate text-xs font-medium text-slate-400">{title || (codeLang === "shell" ? "Terminal" : "Python")}</span>
        <CopyButton text={text.join("\n")} />
      </div>
      <pre className="code-pre overflow-x-auto py-3 text-[13px] leading-6 text-slate-100">
        {text.map((line, i) => (
          <div
            key={i}
            className={`flex px-3 ${highlightLine === i ? "bg-yellow-400/20 ring-1 ring-inset ring-yellow-400/60" : ""}`}
          >
            <span className="mr-3 inline-block w-6 shrink-0 select-none text-right text-slate-500">{i + 1}</span>
            <code className="whitespace-pre">{line ? (codeLang === "shell" ? highlightShell(line) : highlightPython(line)) : " "}</code>
          </div>
        ))}
      </pre>
    </div>
  );
}

export function OutputBox({ output, isError }: { output: string; isError?: boolean }) {
  const { lang } = useApp();
  return (
    <div
      className={`overflow-hidden rounded-xl border ${
        isError
          ? "border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/40"
          : "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30"
      }`}
    >
      <div
        className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${
          isError ? "text-rose-700 dark:text-rose-300" : "text-emerald-700 dark:text-emerald-300"
        }`}
      >
        {isError ? tr(UI.errorOutput, lang) : tr(UI.output, lang)}
      </div>
      <pre
        className={`overflow-x-auto px-3 pb-3 font-mono text-[13px] leading-6 ${
          isError ? "text-rose-900 dark:text-rose-100" : "text-slate-900 dark:text-slate-100"
        }`}
      >
        {output}
      </pre>
    </div>
  );
}

export function CodeBlock({
  lines,
  output,
  isError,
  title,
  lang,
}: {
  lines: CodeLine[];
  output?: string;
  isError?: boolean;
  title?: string;
  lang?: CodeLang;
}) {
  return (
    <div className="space-y-2">
      <CodeView lines={lines} title={title} lang={lang} />
      {output !== undefined && <OutputBox output={output} isError={isError} />}
    </div>
  );
}
