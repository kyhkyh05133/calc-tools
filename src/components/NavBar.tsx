"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation } from "@/lib/translations";

const navItems = [
  { key: "navHome", href: "/" },
  { key: "navExchange", href: "/exchange" },
  { key: "navLoan", href: "/loan" },
  { key: "navBmi", href: "/bmi" },
  { key: "navAbout", href: "/about" },
];

export default function NavBar() {
  const [isDark, setIsDark] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    const preferred = saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(preferred);
    document.documentElement.classList.toggle("dark", preferred);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-slate-950 dark:text-white">
          {getTranslation("appTitle", language)}
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
              >
                {getTranslation(item.key as never, language)}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setLanguage(language === "ko" ? "en" : "ko")}
            className="rounded-full border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:border-slate-400 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {getTranslation("languageToggle", language)}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:border-slate-400 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {isDark ? getTranslation("themeLight", language) : getTranslation("themeDark", language)}
          </button>
        </div>
      </div>
    </header>
  );
}
