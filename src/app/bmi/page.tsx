"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation } from "@/lib/translations";

const getCategories = (language: "ko" | "en") => [
  { label: getTranslation("bmiCategoryUnderweight", language), max: 18.5, description: getTranslation("bmiDescUnderweight", language) },
  { label: getTranslation("bmiCategoryNormal", language), min: 18.5, max: 23, description: getTranslation("bmiDescNormal", language) },
  { label: getTranslation("bmiCategoryOverweight", language), min: 23, max: 25, description: getTranslation("bmiDescOverweight", language) },
  { label: getTranslation("bmiCategoryObese", language), min: 25, description: getTranslation("bmiDescObese", language) },
];

const getBmiCategory = (bmi: number, language: "ko" | "en") => {
  const categories = getCategories(language);
  if (bmi < 18.5) return categories[0];
  if (bmi < 23) return categories[1];
  if (bmi < 25) return categories[2];
  return categories[3];
};

export default function BmiPage() {
  const { language } = useLanguage();
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);

  const bmi = useMemo(() => {
    if (height <= 0) return 0;
    return weight / ((height / 100) ** 2);
  }, [height, weight]);

  const categories = useMemo(() => getCategories(language), [language]);
  const category = getBmiCategory(bmi, language);
  const idealMin = 18.5 * ((height / 100) ** 2);
  const idealMax = 23 * ((height / 100) ** 2);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
        <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">{getTranslation("bmiTitle", language)}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {getTranslation("bmiDescription", language)}
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-5 rounded-3xl border border-slate-200/80 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-950/80">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">{getTranslation("bmiHeightLabel", language)}</label>
              <input
                type="number"
                value={height}
                onChange={(event) => setHeight(Number(event.target.value))}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">{getTranslation("bmiWeightLabel", language)}</label>
              <input
                type="number"
                value={weight}
                onChange={(event) => setWeight(Number(event.target.value))}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
            <div className="rounded-3xl bg-slate-50 p-6 text-center dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{getTranslation("bmiCurrentLabel", language)}</p>
              <p className="mt-4 text-5xl font-semibold text-slate-950 dark:text-white">{bmi.toFixed(1)}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {category.label} · {category.description}
              </p>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">{getTranslation("bmiRangeLabel", language)}</p>
                <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                  {idealMin.toFixed(1)}kg - {idealMax.toFixed(1)}kg
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">{getTranslation("bmiRecommendedLabel", language)}</p>
                <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                  {idealMin.toFixed(1)}kg 이상
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{getTranslation("bmiGuideTitle", language)}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {categories.map((item) => (
              <div key={item.label} className="rounded-3xl border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <p className="font-semibold text-slate-900 dark:text-white">{item.label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
