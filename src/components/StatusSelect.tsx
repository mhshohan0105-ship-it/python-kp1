import { useApp } from "../context/AppContext";
import { STATUS_LABEL, STATUS_STYLE, UI, tr } from "../lib/ui";
import type { Status } from "../types";

const ORDER: Status[] = ["not_started", "learning", "practice_left", "done"];

export function StatusSelect({ topicId }: { topicId: string }) {
  const { lang, progress, setStatus } = useApp();
  const value: Status = progress[topicId] ?? "not_started";
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="text-slate-500 dark:text-slate-400">{tr(UI.status, lang)}:</span>
      <select
        value={value}
        onChange={(e) => setStatus(topicId, e.target.value as Status)}
        className={`rounded-full px-3 py-1.5 font-semibold ring-1 ${STATUS_STYLE[value]} cursor-pointer outline-none`}
      >
        {ORDER.map((s) => (
          <option key={s} value={s} className="bg-white text-slate-900 dark:bg-slate-800 dark:text-white">
            {tr(STATUS_LABEL[s], lang)}
          </option>
        ))}
      </select>
    </label>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  const { lang } = useApp();
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${STATUS_STYLE[status]}`}>
      {tr(STATUS_LABEL[status], lang)}
    </span>
  );
}
