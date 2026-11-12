import { useEffect } from "react";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ALL_TOPICS, findTopic, hasContent } from "../data";
import { UI, num, tr } from "../lib/ui";
import { SectionView } from "../components/Sections";
import { PracticeCard } from "../components/PracticeCard";
import { Quiz } from "../components/Quiz";
import { StatusSelect } from "../components/StatusSelect";
import { NotFound } from "./NotFound";

export function TopicPage() {
  const { topicId } = useParams();
  const { lang } = useApp();
  const [params, setParams] = useSearchParams();
  const loc = useLocation();
  const ref = findTopic(topicId);
  const isMixed = ref?.topic.kind === "mixed";
  const tab = isMixed || params.get("tab") === "practice" ? "practice" : "learn";

  // Scroll to a section (#s-3) or to the top when the page or tab changes.
  useEffect(() => {
    const id = loc.hash.slice(1);
    if (id) {
      const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0 });
  }, [loc.pathname, loc.hash, tab]);

  if (!ref) return <NotFound />;
  const { module, topic, index } = ref;
  const prev = ALL_TOPICS[index - 1];
  const next = ALL_TOPICS[index + 1];

  const setTab = (t: "learn" | "practice") => {
    setParams(t === "practice" ? { tab: "practice" } : {}, { replace: false });
  };

  const counts = {
    easy: topic.practice.filter((p) => p.level === "easy").length,
    medium: topic.practice.filter((p) => p.level === "medium").length,
    hard: topic.practice.filter((p) => p.level === "hard").length,
    qa: topic.practice.filter((p) => p.level === "qa").length,
  };

  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-6 space-y-3">
        <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          {tr(UI.module, lang)} {num(module.number, lang)} · {tr(module.title, lang)}
        </div>
        <h1 className="text-2xl font-bold leading-tight sm:text-3xl">{tr(topic.title, lang)}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
          <span>⏱ ~{num(topic.estimatedMinutes, lang)} {tr(UI.minutes, lang)}</span>
          {topic.practice.length > 0 && (
            <span>
              📝 {num(topic.practice.length, lang)} {tr(UI.tasks, lang)}
            </span>
          )}
          {topic.quiz.length > 0 && (
            <span>
              ❓ {num(topic.quiz.length, lang)} {tr(UI.questions, lang)}
            </span>
          )}
          <StatusSelect topicId={topic.id} />
        </div>
      </header>

      {!hasContent(topic) ? (
        <div className="card p-6 text-center">
          <div className="text-4xl">🚧</div>
          <h2 className="mt-2 text-xl font-bold">{tr(UI.comingSoon, lang)}</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{tr(UI.comingSoonBody, lang)}</p>
          <Link to="/" className="btn-primary mt-4 inline-flex">
            {tr(UI.goHome, lang)}
          </Link>
        </div>
      ) : (
        <>
          {!isMixed && (
            <div className="sticky top-[57px] z-30 -mx-4 mb-6 border-b border-slate-200 bg-slate-50/95 px-4 pt-2 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10 dark:border-slate-800 dark:bg-slate-950/95">
              <div className="flex gap-1" role="tablist">
                {(["learn", "practice"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={`-mb-px rounded-t-lg border-b-2 px-4 py-2.5 font-semibold ${
                      tab === t
                        ? "border-indigo-600 text-indigo-700 dark:border-indigo-400 dark:text-indigo-300"
                        : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                    }`}
                  >
                    {t === "learn" ? `📘 ${tr(UI.learn, lang)}` : `✍️ ${tr(UI.practice, lang)} (${num(topic.practice.length, lang)})`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {tab === "learn" ? (
            <div className="space-y-8">
              {topic.sections.map((s, i) => (
                <SectionView key={i} section={s} index={i} />
              ))}
              <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
                <span className="font-semibold">
                  ✍️ {tr(UI.practice, lang)}: {num(topic.practice.length, lang)} {tr(UI.tasks, lang)} + {tr(UI.quiz, lang)}
                </span>
                <button type="button" className="btn-primary" onClick={() => setTab("practice")}>
                  {tr(UI.practice, lang)} →
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="rounded-2xl bg-sky-50 p-4 text-[15px] dark:bg-sky-950/40">
                <p>{tr(UI.tryFirst, lang)}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {lang === "bn"
                    ? `সহজ ${num(counts.easy, lang)} · মাঝারি ${num(counts.medium, lang)} · কঠিন ${num(counts.hard, lang)} · QA ${num(counts.qa, lang)}`
                    : `Easy ${counts.easy} · Medium ${counts.medium} · Hard ${counts.hard} · QA ${counts.qa}`}
                </p>
              </div>
              {topic.practice.map((p, i) => (
                <PracticeCard key={p.id} task={p} index={i} />
              ))}
              {topic.quiz.length > 0 && (
                <section className="pt-4">
                  <h2 className="mb-3 text-xl font-bold">❓ {tr(UI.quiz, lang)}</h2>
                  <Quiz key={topic.id} questions={topic.quiz} />
                </section>
              )}
            </div>
          )}
        </>
      )}

      <nav className="mt-10 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2 dark:border-slate-800">
        {prev ? (
          <Link to={`/topic/${prev.topic.id}`} className="card block p-4 hover:ring-indigo-400">
            <div className="text-xs font-semibold uppercase text-slate-500">← {tr(UI.prev, lang)}</div>
            <div className="font-semibold">{tr(prev.topic.title, lang)}</div>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/topic/${next.topic.id}`} className="card block p-4 text-right hover:ring-indigo-400">
            <div className="text-xs font-semibold uppercase text-slate-500">{tr(UI.next, lang)} →</div>
            <div className="font-semibold">{tr(next.topic.title, lang)}</div>
          </Link>
        )}
      </nav>
    </article>
  );
}
