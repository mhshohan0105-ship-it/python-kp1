import { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ALL_TOPICS, hasContent } from "../data";
import { sectionAnchor } from "./Sections";
import { UI, tr } from "../lib/ui";

interface Hit {
  label: string;
  sub: string;
  to: string;
}

export function Search({ onNavigate }: { onNavigate?: () => void }) {
  const { lang } = useApp();
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const hits = useMemo<Hit[]>(() => {
    const query = q.trim().toLowerCase();
    if (query.length < 2) return [];
    const res: Hit[] = [];
    for (const { module, topic } of ALL_TOPICS) {
      const topicTitle = tr(topic.title, lang);
      const modTitle = `${tr(UI.module, lang)} ${module.number}`;
      if (topicTitle.toLowerCase().includes(query)) res.push({ label: topicTitle, sub: modTitle, to: `/topic/${topic.id}` });
      if (!hasContent(topic)) continue;
      topic.sections.forEach((s, i) => {
        if (!("title" in s) || !s.title) return;
        const st = tr(s.title, lang);
        const body = "body" in s ? tr(s.body, lang).toLowerCase() : "";
        if (st.toLowerCase().includes(query) || body.includes(query))
          res.push({ label: st, sub: `${modTitle} › ${topicTitle}`, to: `/topic/${topic.id}#${sectionAnchor(i)}` });
      });
      topic.practice.forEach((p) => {
        if (tr(p.title, lang).toLowerCase().includes(query))
          res.push({ label: tr(p.title, lang), sub: `${topicTitle} › ${tr(UI.practice, lang)}`, to: `/topic/${topic.id}?tab=practice` });
      });
    }
    return res.slice(0, 12);
  }, [q, lang]);

  return (
    <div ref={boxRef} className="relative w-full">
      <input
        type="search"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={tr(UI.search, lang)}
        aria-label={tr(UI.search, lang)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-600 dark:bg-slate-800 dark:focus:ring-indigo-900"
      />
      {open && q.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[60vh] overflow-y-auto rounded-xl bg-white p-1 shadow-xl ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
          {hits.length === 0 ? (
            <div className="px-3 py-2 text-sm text-slate-500">{tr(UI.noResults, lang)}</div>
          ) : (
            hits.map((h, i) => (
              <button
                key={i}
                type="button"
                className="block w-full rounded-lg px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => {
                  setOpen(false);
                  setQ("");
                  nav(h.to);
                  onNavigate?.();
                }}
              >
                <div className="text-sm font-medium">{h.label}</div>
                <div className="truncate text-xs text-slate-500 dark:text-slate-400">{h.sub}</div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
