"use client";

import { useMemo, useState } from "react";

const categories = [
  { label: "저체중", max: 18.5, description: "건강한 체중 범위 아래입니다." },
  { label: "정상", min: 18.5, max: 23, description: "아시아 기준 정상 체중입니다." },
  { label: "과체중", min: 23, max: 25, description: "체중 감량을 고려할 수 있습니다." },
  { label: "비만", min: 25, description: "건강관리에 더 신경 써야 합니다." },
];

const getBmiCategory = (bmi: number) => {
  if (bmi < 18.5) return categories[0];
  if (bmi < 23) return categories[1];
  if (bmi < 25) return categories[2];
  return categories[3];
};

export default function BmiPage() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);

  const bmi = useMemo(() => {
    if (height <= 0) return 0;
    return weight / ((height / 100) ** 2);
  }, [height, weight]);

  const category = getBmiCategory(bmi);
  const idealMin = 18.5 * ((height / 100) ** 2);
  const idealMax = 23 * ((height / 100) ** 2);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
        <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">BMI 계산기</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          키와 몸무게를 입력하면 BMI 수치, 건강 등급, 정상 체중 범위를 확인할 수 있습니다.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-5 rounded-3xl border border-slate-200/80 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-950/80">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">키 (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(event) => setHeight(Number(event.target.value))}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">몸무게 (kg)</label>
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
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">현재 BMI</p>
              <p className="mt-4 text-5xl font-semibold text-slate-950 dark:text-white">{bmi.toFixed(1)}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {category.label} · {category.description}
              </p>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">정상 체중 범위</p>
                <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                  {idealMin.toFixed(1)}kg - {idealMax.toFixed(1)}kg
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">권장 체중</p>
                <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                  {idealMin.toFixed(1)}kg 이상
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">BMI 등급 안내</h2>
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
