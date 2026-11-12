import { useState } from "react";
import type { StepperSection } from "../types";
import { useApp } from "../context/AppContext";
import { CodeView } from "./CodeBlock";
import { RichText } from "../lib/RichText";
import { UI, num, tr } from "../lib/ui";

/**
 * Interactive code stepper:
 * highlights the current line, shows variable boxes, and grows the output step by step.
 */
export function Stepper({ section }: { section: StepperSection }) {
  const { lang } = useApp();
  const [pos, setPos] = useState(-1); // -1 = not started
  const total = section.steps.length;
  const step = pos >= 0 ? section.steps[pos] : undefined;
  const prevVars = pos > 0 ? section.steps[pos - 1].vars : {};
  const output = section.steps
    .slice(0, pos + 1)
    .map((s) => s.out)
    .filter((o): o is string => o !== undefined)
    .join("\n");

  return (
    <div className="space-y-3 rounded-2xl border border-indigo-200 bg-indigo-50/60 p-3 sm:p-4 dark:border-indigo-900 dark:bg-indigo-950/30">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-semibold text-indigo-900 dark:text-indigo-200">▶ {tr(section.title, lang)}</h4>
        <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:ring-indigo-700">
          {tr(UI.step, lang)} {num(Math.max(pos + 1, 0), lang)} {tr(UI.of, lang)} {num(total, lang)}
        </span>
      </div>

      <CodeView lines={section.code} highlightLine={step?.line} />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 [&>*]:min-w-0">
        <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{tr(UI.variables, lang)}</div>
          {step && Object.keys(step.vars).length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {Object.entries(step.vars).map(([k, v]) => {
                const changed = prevVars[k] !== v;
                return (
                  <div
                    key={k}
                    className={`min-w-[4.5rem] rounded-lg border-2 px-2 py-1 text-center transition-colors ${
                      changed
                        ? "border-amber-400 bg-amber-50 dark:bg-amber-900/30"
                        : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
                    }`}
                  >
                    <div className="font-mono text-xs text-slate-500 dark:text-slate-400">{k}</div>
                    <div className="break-all font-mono text-sm font-semibold">{v}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-sm text-slate-400">{tr(UI.noVars, lang)}</div>
          )}
        </div>
        <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{tr(UI.output, lang)}</div>
          <pre className="min-h-[2.5rem] overflow-x-auto whitespace-pre font-mono text-sm">{output}</pre>
        </div>
      </div>

      <div
        className="rounded-xl bg-white p-3 text-[15px] ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700"
        aria-live="polite"
      >
        {step ? (
          <RichText text={tr(step.note, lang)} />
        ) : (
          <span className="text-slate-500">{tr(UI.notStartedStepper, lang)}</span>
        )}
        {pos === total - 1 && <div className="mt-2 font-semibold text-emerald-600">{tr(UI.finished, lang)}</div>}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => setPos((p) => Math.max(-1, p - 1))}
          disabled={pos < 0}
        >
          {tr(UI.stepperPrev, lang)}
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={() => setPos((p) => Math.min(total - 1, p + 1))}
          disabled={pos >= total - 1}
        >
          {tr(UI.stepperNext, lang)}
        </button>
        <button type="button" className="btn-secondary" onClick={() => setPos(-1)}>
          {tr(UI.stepperReset, lang)}
        </button>
      </div>
    </div>
  );
}
