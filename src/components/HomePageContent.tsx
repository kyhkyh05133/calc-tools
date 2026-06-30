"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation } from "@/lib/translations";

const faqs = [
  {
    questionKey: "faq1Question",
    answerKey: "faq1Answer",
  },
  {
    questionKey: "faq2Question",
    answerKey: "faq2Answer",
  },
  {
    questionKey: "faq3Question",
    answerKey: "faq3Answer",
  },
];

export default function HomePageContent() {
  const { language } = useLanguage();

  const cards = [
    {
      title: getTranslation("cardExchangeTitle", language),
      description: getTranslation("cardExchangeDescription", language),
      href: "/exchange",
    },
    {
      title: getTranslation("cardBmiTitle", language),
      description: getTranslation("cardBmiDescription", language),
      href: "/bmi",
    },
    {
      title: getTranslation("cardPrivacyTitle", language),
      description: getTranslation("cardPrivacyDescription", language),
      href: "/privacy",
    },
    {
      title: getTranslation("cardTermsTitle", language),
      description: getTranslation("cardTermsDescription", language),
      href: "/terms",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <section className="rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-slate-950/20">
        <p className="mb-4 inline-flex rounded-full bg-sky-100 px-4 py-1 text-sm font-semibold text-sky-900 dark:bg-sky-900/15 dark:text-sky-200">
          {getTranslation("homeBadge", language)}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          {getTranslation("homeTitle", language)}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          {getTranslation("homeDescription", language)}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800" href="/exchange">
            {getTranslation("exchangeCta", language)}
          </Link>
          <Link className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900" href="/bmi">
            {getTranslation("bmiCta", language)}
          </Link>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-slate-700"
          >
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{card.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{card.description}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
          <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">{getTranslation("homeFeaturesTitle", language)}</h2>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <li>{getTranslation("homeFeature1", language)}</li>
            <li>{getTranslation("homeFeature2", language)}</li>
            <li>{getTranslation("homeFeature3", language)}</li>
            <li>{getTranslation("homeFeature4", language)}</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-8 dark:border-slate-800 dark:bg-slate-900/80">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-700 dark:text-sky-300">주의</p>
          <h3 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">{getTranslation("homeNoticeTitle", language)}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{getTranslation("homeNoticeDesc", language)}</p>
          <div className="mt-6 rounded-3xl border border-dashed border-slate-300/80 bg-white/80 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-300">
            광고 자리 표시자
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
        <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">{getTranslation("homeFaqTitle", language)}</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((item) => (
            <div key={item.questionKey} className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/80">
              <p className="font-semibold text-slate-900 dark:text-white">{getTranslation(item.questionKey as never, language)}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{getTranslation(item.answerKey as never, language)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
