"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Language } from "@/lib/translations";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
}>({
  language: "ko",
  setLanguage: () => undefined,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ko");

  useEffect(() => {
    const saved = window.localStorage.getItem("language") as Language | null;
    if (saved === "ko" || saved === "en") {
      setLanguageState(saved);
      document.documentElement.lang = saved;
      return;
    }
    document.documentElement.lang = "ko";
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("language", nextLanguage);
    document.documentElement.lang = nextLanguage;
  };

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
