import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { UI, tr } from "../lib/ui";
import { Search } from "./Search";
import { Sidebar } from "./Sidebar";

function LangToggle() {
  const { lang, setLang } = useApp();
  return (
    <div className="flex shrink-0 overflow-hidden rounded-lg ring-1 ring-slate-300 dark:ring-slate-600" role="group" aria-label="Language">
      {(["bn", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-1.5 text-sm font-semibold ${
            lang === l ? "bg-indigo-600 text-white" : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          } ${l === "bn" ? "font-bn" : ""}`}
        >
          {l === "bn" ? "বাংলা" : "English"}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle() {
  const { dark, toggleDark, lang } = useApp();
  return (
    <button
      type="button"
      onClick={toggleDark}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ring-slate-300 hover:bg-slate-100 dark:ring-slate-600 dark:hover:bg-slate-800"
      aria-label={dark ? tr(UI.light, lang) : tr(UI.dark, lang)}
      title={dark ? tr(UI.light, lang) : tr(UI.dark, lang)}
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { lang } = useApp();
  const [drawer, setDrawer] = useState(false);
  const loc = useLocation();

  useEffect(() => setDrawer(false), [loc.pathname]);
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-4 py-2.5 sm:gap-3">
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ring-slate-300 lg:hidden dark:ring-slate-600"
            onClick={() => setDrawer(true)}
            aria-label={tr(UI.menu, lang)}
          >
            ☰
          </button>
          <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-mono text-sm font-bold text-yellow-300">py</span>
            <span className="hidden font-bold sm:inline">{tr(UI.siteName, lang)}</span>
          </Link>
          <div className="hidden min-w-0 flex-1 md:block md:max-w-md">
            <Search />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-72 shrink-0 overflow-y-auto border-r border-slate-200 p-3 lg:block dark:border-slate-800">
          <Sidebar />
        </aside>

        {drawer && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setDrawer(false)} />
            <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-xs flex-col bg-white shadow-xl dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-200 p-3 dark:border-slate-800">
                <span className="font-bold">{tr(UI.siteName, lang)}</span>
                <button type="button" className="h-9 w-9 rounded-lg text-xl" onClick={() => setDrawer(false)} aria-label="Close">
                  ✕
                </button>
              </div>
              <div className="p-3">
                <Search onNavigate={() => setDrawer(false)} />
              </div>
              <div className="flex-1 overflow-y-auto px-3 pb-6">
                <Sidebar onNavigate={() => setDrawer(false)} />
              </div>
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
