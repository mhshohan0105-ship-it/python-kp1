import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ALL_TOPICS, MODULES, hasContent } from "../data";
import { RichText } from "../lib/RichText";
import { STATUS_LABEL, UI, num, tr } from "../lib/ui";
import { StatusBadge } from "../components/StatusSelect";
import type { Status } from "../types";

const BAR: Record<Status, string> = {
  done: "bg-emerald-500",
  practice_left: "bg-amber-400",
  learning: "bg-sky-500",
  not_started: "bg-slate-200 dark:bg-slate-700",
};

export function Dashboard() {
  const { lang, progress, resetProgress } = useApp();
  const total = ALL_TOPICS.length;
  const counts: Record<Status, number> = { not_started: 0, learning: 0, practice_left: 0, done: 0 };
  ALL_TOPICS.forEach(({ topic }) => counts[progress[topic.id] ?? "not_started"]++);
  const pct = Math.round((counts.done / total) * 100);
  const next =
    ALL_TOPICS.find(({ topic }) => hasContent(topic) && progress[topic.id] !== "done") ??
    ALL_TOPICS.find(({ topic }) => hasContent(topic));

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-white shadow-lg sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-100">Python KP1 · Test Automation</p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{tr(UI.tagline, lang)}</h1>
        {next && (
          <Link
            to={`/topic/${next.topic.id}`}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 font-semibold text-indigo-700 shadow hover:bg-indigo-50"
          >
            {counts.done + counts.learning + counts.practice_left > 0 ? tr(UI.continueLearning, lang) : tr(UI.startHere, lang)}:{" "}
            {tr(next.topic.title, lang)} →
          </Link>
        )}
      </section>

      <section className="card space-y-4 p-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-xl font-bold">{tr(UI.overall, lang)}</h2>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            <strong className="text-2xl text-slate-900 dark:text-white">{num(counts.done, lang)}</strong> / {num(total, lang)}{" "}
            {tr(UI.topicsDone, lang)} · <strong>{num(pct, lang)}%</strong>
          </div>
        </div>
        <div className="flex h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700" aria-label={`${pct}%`}>
          {(["done", "practice_left", "learning"] as Status[]).map((s) => (
            <div key={s} className={`${BAR[s]} transition-all`} style={{ width: `${(counts[s] / total) * 100}%` }} />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {(["done", "practice_left", "learning", "not_started"] as Status[]).map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5">
              <span className={`h-3 w-3 rounded-full ${BAR[s]}`} />
              {tr(STATUS_LABEL[s], lang)}: <strong>{num(counts[s], lang)}</strong>
            </span>
          ))}
        </div>
      </section>

      <section className="card p-5">
        <h2 className="mb-2 text-lg font-bold">📖 {tr(UI.howToUse, lang)}</h2>
        <RichText text={tr(UI.howToUseBody, lang)} className="leading-7" />
      </section>

      <section className="space-y-4">
        {MODULES.map((m) => {
          const done = m.topics.filter((t) => progress[t.id] === "done").length;
          return (
            <div key={m.id} className="card p-4 sm:p-5">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {tr(UI.module, lang)} {num(m.number, lang)}
                    {!m.ready && <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 normal-case dark:bg-slate-800">{tr(UI.comingSoon, lang)}</span>}
                  </div>
                  <h3 className="text-lg font-bold">{tr(m.title, lang)}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{tr(m.description, lang)}</p>
                </div>
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {num(done, lang)}/{num(m.topics.length, lang)}
                </div>
              </div>
              <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full bg-emerald-500" style={{ width: `${(done / m.topics.length) * 100}%` }} />
              </div>
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {m.topics.map((t) => (
                  <li key={t.id}>
                    <Link
                      to={`/topic/${t.id}`}
                      className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <span className={`min-w-0 ${hasContent(t) ? "" : "text-slate-400"}`}>{tr(t.title, lang)}</span>
                      <StatusBadge status={progress[t.id] ?? "not_started"} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <div className="pb-6 text-center">
        <button
          type="button"
          className="text-sm text-slate-500 underline hover:text-rose-600"
          onClick={() => {
            if (window.confirm(tr(UI.resetConfirm, lang))) resetProgress();
          }}
        >
          {tr(UI.resetProgress, lang)}
        </button>
      </div>
    </div>
  );
}
