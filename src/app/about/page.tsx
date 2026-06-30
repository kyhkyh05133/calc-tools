"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation } from "@/lib/translations";

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl space-y-8 rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
      <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">{getTranslation("aboutTitle", language)}</h1>
      <p className="text-base leading-7 text-slate-700 dark:text-slate-300">
        {getTranslation("aboutIntro", language)}
      </p>
      <div className="space-y-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
        <p>{getTranslation("aboutParagraph1", language)}</p>
        <p>{getTranslation("aboutParagraph2", language)}</p>
        <p>{getTranslation("aboutParagraph3", language)}</p>
      </div>
    </div>
  );
}
