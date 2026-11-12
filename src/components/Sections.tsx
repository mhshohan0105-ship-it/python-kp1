import type { Section } from "../types";
import { useApp } from "../context/AppContext";
import { InlineText, RichText } from "../lib/RichText";
import { UI, tr } from "../lib/ui";
import { CodeBlock } from "./CodeBlock";
import { Stepper } from "./Stepper";

export function sectionAnchor(i: number) {
  return `s-${i}`;
}

function H({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 text-lg font-bold text-slate-900 sm:text-xl dark:text-white">{children}</h3>;
}

const CALLOUT: Record<string, { box: string; icon: string; label: keyof typeof UI }> = {
  tip: { box: "border-sky-300 bg-sky-50 dark:border-sky-800 dark:bg-sky-950/40", icon: "💡", label: "tip" },
  warning: { box: "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30", icon: "⚠️", label: "warning" },
  qa: { box: "border-violet-300 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/30", icon: "🧪", label: "qa" },
  error: { box: "border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30", icon: "🐞", label: "warning" },
};

export function SectionView({ section, index }: { section: Section; index: number }) {
  const { lang } = useApp();
  const id = sectionAnchor(index);

  switch (section.type) {
    case "text":
      return (
        <section id={id} className="scroll-mt-24">
          {section.title && <H>{tr(section.title, lang)}</H>}
          <RichText text={tr(section.body, lang)} className="text-[16px] leading-7" />
        </section>
      );

    case "analogy":
      return (
        <section id={id} className="scroll-mt-24 rounded-2xl border border-orange-200 bg-orange-50 p-4 sm:p-5 dark:border-orange-900 dark:bg-orange-950/30">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-orange-700 dark:text-orange-300">
            {section.emoji ?? "🏠"} {tr(UI.realLife, lang)}
          </div>
          <H>{tr(section.title, lang)}</H>
          <RichText text={tr(section.body, lang)} className="leading-7" />
        </section>
      );

    case "callout": {
      const c = CALLOUT[section.variant];
      return (
        <section id={id} className={`scroll-mt-24 rounded-2xl border p-4 sm:p-5 ${c.box}`}>
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide opacity-80">
            {c.icon} {tr(UI[c.label], lang)}
          </div>
          <H>{tr(section.title, lang)}</H>
          <RichText text={tr(section.body, lang)} className="leading-7" />
        </section>
      );
    }

    case "code":
      return (
        <section id={id} className="scroll-mt-24">
          {section.title && <H>{tr(section.title, lang)}</H>}
          <CodeBlock lines={section.lines} output={section.output} isError={section.isError} lang={section.lang} title={section.file} />
          {section.note && (
            <div className="mt-2 text-[15px] text-slate-600 dark:text-slate-300">
              <RichText text={tr(section.note, lang)} />
            </div>
          )}
        </section>
      );

    case "table":
      return (
        <section id={id} className="scroll-mt-24">
          {section.title && <H>{tr(section.title, lang)}</H>}
          <div className="overflow-x-auto rounded-xl ring-1 ring-slate-200 dark:ring-slate-700">
            <table className="w-full min-w-[480px] border-collapse text-left text-[14px]">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  {section.headers.map((h, i) => (
                    <th key={i} className="px-3 py-2 font-semibold">
                      {tr(h, lang)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, ri) => (
                  <tr key={ri} className="border-t border-slate-200 odd:bg-white even:bg-slate-50 dark:border-slate-700 dark:odd:bg-slate-900 dark:even:bg-slate-800/50">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-3 py-2 align-top">
                        {section.codeCols?.includes(ci) ? (
                          <code className="whitespace-pre font-mono text-[13px] text-indigo-700 dark:text-indigo-300">{tr(cell, lang)}</code>
                        ) : (
                          <InlineText text={tr(cell, lang)} />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {section.caption && (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              <InlineText text={tr(section.caption, lang)} />
            </p>
          )}
        </section>
      );

    case "stepper":
      return (
        <section id={id} className="scroll-mt-24">
          <Stepper section={section} />
        </section>
      );

    case "mistakes":
      return (
        <section id={id} className="scroll-mt-24">
          <H>🐞 {section.title ? tr(section.title, lang) : tr(UI.commonMistakes, lang)}</H>
          <div className="space-y-3">
            {section.items.map((m, i) => (
              <div key={i} className="overflow-hidden rounded-xl ring-1 ring-slate-200 dark:ring-slate-700">
                <div className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-2 dark:bg-slate-700 [&>*]:min-w-0">
                  <div className="bg-rose-50 p-3 dark:bg-rose-950/30">
                    <div className="mb-1 text-xs font-semibold uppercase text-rose-700 dark:text-rose-300">❌ {tr(UI.mistakeCol, lang)}</div>
                    <pre className="overflow-x-auto whitespace-pre font-mono text-[13px]">{m.mistake}</pre>
                  </div>
                  <div className="bg-white p-3 dark:bg-slate-900">
                    <div className="mb-1 text-xs font-semibold uppercase text-slate-500">{tr(UI.errorCol, lang)}</div>
                    <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-[13px] text-rose-700 dark:text-rose-300">{tr(m.error, lang)}</pre>
                  </div>
                  <div className="bg-white p-3 dark:bg-slate-900">
                    <div className="mb-1 text-xs font-semibold uppercase text-slate-500">{tr(UI.whyCol, lang)}</div>
                    <div className="text-[15px]"><InlineText text={tr(m.why, lang)} /></div>
                  </div>
                  <div className="bg-emerald-50 p-3 dark:bg-emerald-950/30">
                    <div className="mb-1 text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-300">✅ {tr(UI.fixCol, lang)}</div>
                    <pre className="overflow-x-auto whitespace-pre font-mono text-[13px]">{m.fix}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      );

    case "summary":
      return (
        <section id={id} className="scroll-mt-24 rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-4 sm:p-5 dark:border-emerald-700 dark:bg-emerald-950/30">
          <div className="mb-2 text-sm font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            📌 {tr(UI.rememberOneLine, lang)}
          </div>
          <RichText text={tr(section.body, lang)} className="text-[16px] font-medium leading-7" />
        </section>
      );
  }
}
