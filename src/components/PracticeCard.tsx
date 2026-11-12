import { useState } from "react";
import type { PracticeTask } from "../types";
import { useApp } from "../context/AppContext";
import { RichText, InlineText } from "../lib/RichText";
import { LEVEL_LABEL, LEVEL_STYLE, UI, num, tr } from "../lib/ui";
import { CodeBlock } from "./CodeBlock";

function Mono({ label, text, tone }: { label: string; text: string; tone: "in" | "out" }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border ${
        tone === "in"
          ? "border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60"
          : "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30"
      }`}
    >
      <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</div>
      <pre className="overflow-x-auto px-3 pb-3 font-mono text-[13px] leading-6">{text}</pre>
    </div>
  );
}

export function PracticeCard({ task, index }: { task: PracticeTask; index: number }) {
  const { lang } = useApp();
  const [hint, setHint] = useState(false);
  const [sol, setSol] = useState(false);

  return (
    <article className="card space-y-4 p-4 sm:p-5">
      <header className="flex flex-wrap items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white dark:bg-white dark:text-slate-900">
          {num(index + 1, lang)}
        </span>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${LEVEL_STYLE[task.level]}`}>
          {tr(LEVEL_LABEL[task.level], lang)}
        </span>
        <h4 className="min-w-0 flex-1 font-semibold">{tr(task.title, lang)}</h4>
      </header>

      <RichText text={tr(task.task, lang)} className="text-[16px] leading-7" />

      {task.sampleInput && <Mono label={tr(UI.sampleInput, lang)} text={task.sampleInput} tone="in" />}
      <Mono label={tr(UI.expectedOutput, lang)} text={task.expectedOutput} tone="out" />

      {task.boundary && (
        <div>
          <div className="mb-2 text-sm font-semibold">🧪 {tr(UI.testValues, lang)}</div>
          <div className="overflow-x-auto rounded-xl ring-1 ring-slate-200 dark:ring-slate-700">
            <table className="w-full min-w-[420px] text-left text-[14px]">
              <thead className="bg-violet-100 dark:bg-violet-950/50">
                <tr>
                  <th className="px-3 py-2">{tr(UI.input, lang)}</th>
                  <th className="px-3 py-2">{tr(UI.expected, lang)}</th>
                  <th className="px-3 py-2">{tr(UI.reason, lang)}</th>
                </tr>
              </thead>
              <tbody>
                {task.boundary.map((b, i) => (
                  <tr key={i} className="border-t border-slate-200 dark:border-slate-700">
                    <td className="px-3 py-2 font-mono text-[13px]">{tr(b.input, lang)}</td>
                    <td className="px-3 py-2 font-mono text-[13px]">{tr(b.expected, lang)}</td>
                    <td className="px-3 py-2">{b.why ? <InlineText text={tr(b.why, lang)} /> : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn-secondary" onClick={() => setHint((h) => !h)} aria-expanded={hint}>
          💡 {hint ? tr(UI.hideHint, lang) : tr(UI.showHint, lang)}
        </button>
        <button type="button" className="btn-primary" onClick={() => setSol((s) => !s)} aria-expanded={sol}>
          🔑 {sol ? tr(UI.hideSolution, lang) : tr(UI.showSolution, lang)}
        </button>
      </div>

      {hint && (
        <div className="rounded-xl border border-sky-300 bg-sky-50 p-3 dark:border-sky-800 dark:bg-sky-950/40">
          <RichText text={tr(task.hint, lang)} />
        </div>
      )}

      {sol && (
        <div className="space-y-3">
          <CodeBlock lines={task.solution} output={task.expectedOutput} lang={task.lang} />
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950/30">
            <div className="mb-1 text-sm font-semibold text-emerald-800 dark:text-emerald-300">✅ {tr(UI.whyWorks, lang)}</div>
            <RichText text={tr(task.explanation, lang)} />
          </div>
        </div>
      )}
    </article>
  );
}
