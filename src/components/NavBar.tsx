"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "홈", href: "/" },
  { label: "환율 변환기", href: "/exchange" },
  { label: "BMI 계산기", href: "/bmi" },
  { label: "About", href: "/about" },
];

export default function NavBar() {
  const [isDark, setIsDark] = useState(false);

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
          환율 + BMI 계산기
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:border-slate-400 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {isDark ? "라이트" : "다크"}
          </button>
        </div>
      </div>
    </header>
  );
}
