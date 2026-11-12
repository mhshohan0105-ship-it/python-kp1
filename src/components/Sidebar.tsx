import { useState, useEffect } from "react";
import { Link, NavLink, matchPath, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { MODULES, hasContent } from "../data";
import { sectionAnchor } from "./Sections";
import { UI, num, tr } from "../lib/ui";
import type { Status } from "../types";

const DOT: Record<Status, string> = {
  not_started: "bg-slate-300 dark:bg-slate-600",
  learning: "bg-sky-500",
  practice_left: "bg-amber-500",
  done: "bg-emerald-500",
};

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { lang, progress } = useApp();
  // The sidebar lives outside <Routes>, so read the topic id from the URL directly.
  const { pathname } = useLocation();
  const topicId = matchPath("/topic/:topicId", pathname)?.params.topicId;
  const currentModule = MODULES.find((m) => m.topics.some((t) => t.id === topicId));
  const [openMods, setOpenMods] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(MODULES.map((m) => [m.id, m.id === (currentModule?.id ?? "m2")])),
  );

  useEffect(() => {
    if (currentModule) setOpenMods((o) => ({ ...o, [currentModule.id]: true }));
  }, [currentModule]);

  return (
    <nav className="space-y-1 text-[15px]" aria-label="Course">
      <NavLink
        to="/"
        end
        onClick={onNavigate}
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-lg px-3 py-2 font-semibold ${
            isActive ? "bg-indigo-100 text-indigo-900 dark:bg-indigo-900/50 dark:text-indigo-100" : "hover:bg-slate-100 dark:hover:bg-slate-800"
          }`
        }
      >
        📊 {tr(UI.dashboard, lang)}
      </NavLink>

      {MODULES.map((m) => {
        const open = !!openMods[m.id];
        const done = m.topics.filter((t) => progress[t.id] === "done").length;
        return (
          <div key={m.id} className="pt-1">
            <button
              type="button"
              onClick={() => setOpenMods((o) => ({ ...o, [m.id]: !open }))}
              className="flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-expanded={open}
            >
              <span className={`mt-1 inline-block text-xs transition-transform ${open ? "rotate-90" : ""}`}>▶</span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {tr(UI.module, lang)} {num(m.number, lang)}
                  {!m.ready && <span className="ml-1 normal-case">· {tr(UI.comingSoon, lang)}</span>}
                </span>
                <span className="block font-semibold leading-snug">{tr(m.title, lang)}</span>
              </span>
              <span className="mt-1 shrink-0 text-xs text-slate-500">
                {num(done, lang)}/{num(m.topics.length, lang)}
              </span>
            </button>
            {open && (
              <ul className="ml-4 space-y-0.5 border-l border-slate-200 pl-2 dark:border-slate-700">
                {m.topics.map((t) => {
                  const active = t.id === topicId;
                  const st: Status = progress[t.id] ?? "not_started";
                  const subs = active
                    ? t.sections
                        .map((s, i) => ({ s, i }))
                        .filter(({ s }) => s.type === "text" && s.title)
                    : [];
                  return (
                    <li key={t.id}>
                      <Link
                        to={`/topic/${t.id}`}
                        onClick={onNavigate}
                        className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${
                          active
                            ? "bg-indigo-100 font-semibold text-indigo-900 dark:bg-indigo-900/50 dark:text-indigo-100"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800"
                        } ${hasContent(t) ? "" : "text-slate-400 dark:text-slate-500"}`}
                      >
                        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${DOT[st]}`} title={st} />
                        <span className="min-w-0 flex-1 leading-snug">{tr(t.title, lang)}</span>
                      </Link>
                      {subs.length > 0 && (
                        <ul className="mb-1 ml-5 space-y-0.5">
                          {subs.map(({ s, i }) => (
                            <li key={i}>
                              <Link
                                to={`/topic/${t.id}#${sectionAnchor(i)}`}
                                onClick={onNavigate}
                                className="block rounded px-2 py-1 text-[13px] leading-snug text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                              >
                                {"title" in s && s.title ? tr(s.title, lang) : ""}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
