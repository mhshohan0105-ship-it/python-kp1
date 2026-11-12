import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Lang, Status } from "../types";

const LANG_KEY = "kp1-lang";
const THEME_KEY = "kp1-theme";
const PROGRESS_KEY = "kp1-progress";

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage blocked — the site still works, it just won't remember */
  }
}

interface AppState {
  lang: Lang;
  setLang: (l: Lang) => void;
  dark: boolean;
  toggleDark: () => void;
  progress: Record<string, Status>;
  setStatus: (topicId: string, s: Status) => void;
  resetProgress: () => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (read(LANG_KEY) === "en" ? "en" : "bn"));
  const [dark, setDark] = useState<boolean>(() => document.documentElement.classList.contains("dark"));
  const [progress, setProgress] = useState<Record<string, Status>>(() => {
    try {
      return JSON.parse(read(PROGRESS_KEY) || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.classList.toggle("lang-bn", lang === "bn");
    document.title = lang === "bn" ? "Python KP1 — শিখি সহজে" : "Python KP1 — Learn Python simply";
  }, [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    write(LANG_KEY, l);
  }, []);

  const toggleDark = useCallback(() => {
    setDark((d) => {
      write(THEME_KEY, d ? "light" : "dark");
      return !d;
    });
  }, []);

  const setStatus = useCallback((topicId: string, s: Status) => {
    setProgress((p) => {
      const next = { ...p, [topicId]: s };
      write(PROGRESS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({});
    write(PROGRESS_KEY, "{}");
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, dark, toggleDark, progress, setStatus, resetProgress }),
    [lang, setLang, dark, toggleDark, progress, setStatus, resetProgress],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used inside AppProvider");
  return v;
}
