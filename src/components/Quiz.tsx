import { useState } from "react";
import type { QuizQuestion } from "../types";
import { useApp } from "../context/AppContext";
import { RichText } from "../lib/RichText";
import { UI, num, tr } from "../lib/ui";

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const { lang } = useApp();
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (questions.length === 0) return null;

  if (finished) {
    const pct = score / questions.length;
    const msg = pct >= 0.8 ? UI.scoreGreat : pct >= 0.5 ? UI.scoreOk : UI.scoreLow;
    return (
      <div className="card p-5 text-center">
        <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">{tr(UI.yourScore, lang)}</div>
        <div className="my-2 text-4xl font-bold">
          {num(score, lang)} / {num(questions.length, lang)}
        </div>
        <p className="mb-4">{tr(msg, lang)}</p>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            setI(0);
            setPicked(null);
            setScore(0);
            setFinished(false);
          }}
        >
          {tr(UI.retry, lang)}
        </button>
      </div>
    );
  }

  const q = questions[i];
  const answered = picked !== null;
  const isLast = i === questions.length - 1;

  return (
    <div className="card space-y-4 p-4 sm:p-5">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>
          {tr(UI.question, lang)} {num(i + 1, lang)} / {num(questions.length, lang)}
        </span>
        <span>
          ✔ {num(score, lang)}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div className="h-full bg-indigo-500 transition-all" style={{ width: `${(i / questions.length) * 100}%` }} />
      </div>
      <RichText text={tr(q.question, lang)} className="text-[17px] font-semibold" />
      {q.code && (
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-[13px] text-slate-100">{q.code}</pre>
      )}
      <div className="grid gap-2">
        {q.options.map((o, oi) => {
          const isCorrect = oi === q.correctIndex;
          let cls = "border-slate-300 hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-600 dark:hover:bg-slate-800";
          if (answered) {
            if (isCorrect) cls = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40";
            else if (oi === picked) cls = "border-rose-500 bg-rose-50 dark:bg-rose-950/40";
            else cls = "border-slate-200 opacity-60 dark:border-slate-700";
          }
          return (
            <button
              key={oi}
              type="button"
              disabled={answered}
              onClick={() => {
                setPicked(oi);
                if (isCorrect) setScore((s) => s + 1);
              }}
              className={`flex items-start gap-3 rounded-xl border-2 px-3 py-2.5 text-left transition-colors ${cls}`}
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold dark:bg-slate-700">
                {String.fromCharCode(65 + oi)}
              </span>
              <span className="min-w-0 break-words font-medium">{tr(o, lang)}</span>
            </button>
          );
        })}
      </div>
      {answered && (
        <div
          className={`rounded-xl p-3 ${
            picked === q.correctIndex ? "bg-emerald-50 dark:bg-emerald-950/40" : "bg-rose-50 dark:bg-rose-950/40"
          }`}
          aria-live="polite"
        >
          <div className="mb-1 font-semibold">{picked === q.correctIndex ? tr(UI.correct, lang) : tr(UI.wrong, lang)}</div>
          <RichText text={tr(q.explanation, lang)} />
        </div>
      )}
      {answered && (
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            if (isLast) setFinished(true);
            else {
              setI(i + 1);
              setPicked(null);
            }
          }}
        >
          {isLast ? tr(UI.seeScore, lang) : tr(UI.nextQuestion, lang)} →
        </button>
      )}
    </div>
  );
}
