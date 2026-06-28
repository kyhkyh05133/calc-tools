import Link from "next/link";

export const metadata = {
  title: "홈 | 환율 + BMI 계산기",
  description:
    "환율 변환기와 BMI 계산기를 한 곳에서 제공합니다. 빠르게 계산하고 차트, 수수료, 체중 범위를 확인하세요.",
};

const faqs = [
  {
    question: "환율 변환기는 무료인가요?",
    answer:
      "네, frankfurter.app 무료 API를 사용하여 실시간 환율 정보를 제공합니다. 수수료 계산은 참고용으로 제공됩니다.",
  },
  {
    question: "BMI 결과는 어떤 기준으로 평가되나요?",
    answer:
      "일반 WHO 기준과 아시아 기준을 모두 보여주며 정상 체중 범위와 권장 무게를 계산합니다.",
  },
  {
    question: "광고 자리 표시자는 실제 광고가 아닙니까?",
    answer:
      "맞습니다. 광고 자리 표시자는 수익형 웹사이트용 레이아웃에 맞춘 자리 표시자입니다.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "환율 + BMI 계산기",
  url: "https://your-calculator-site.vercel.app",
  description:
    "환율 변환기와 BMI 계산기를 제공하는 반응형 한국어 웹 앱입니다.",
};

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <section className="rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-slate-950/20">
        <p className="mb-4 inline-flex rounded-full bg-sky-100 px-4 py-1 text-sm font-semibold text-sky-900 dark:bg-sky-900/15 dark:text-sky-200">
          무료 환율 & BMI 계산기
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          환율과 건강을 함께 계산하는 스마트 도구
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          KRW ↔ USD, EUR, JPY 등 10개 통화를 지원하는 환율 변환기와 WHO/아시아 기준 BMI 계산기로 빠르고 정확하게 결과를 확인하세요.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800" href="/exchange">
            환율 변환기 바로가기
          </Link>
          <Link className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900" href="/bmi">
            BMI 계산기 바로가기
          </Link>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "환율 변환기",
            description: "실시간 환율 조회, 수수료 계산, 30일 차트로 환율 흐름을 확인하세요.",
            href: "/exchange",
          },
          {
            title: "BMI 계산기",
            description: "키와 몸무게를 입력하여 BMI, 정상 체중 범위, WHO/아시아 기준을 확인합니다.",
            href: "/bmi",
          },
          {
            title: "개인정보 처리방침",
            description: "애드센스 승인용 필수 페이지로 사용자 개인정보 처리 원칙을 설명합니다.",
            href: "/privacy",
          },
          {
            title: "서비스 이용약관",
            description: "웹사이트 이용 약관 및 면책 사항을 제공합니다.",
            href: "/terms",
          },
        ].map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-slate-700"
          >
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
              {card.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {card.description}
            </p>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
          <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">이 사이트는 어떤 기능을 제공하나요?</h2>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <li>• 10개 주요 통화 간 환율 변환과 수수료 포함 금액 계산</li>
            <li>• 30일 환율 차트로 추세 분석</li>
            <li>• BMI 계산과 WHO / 아시아 기준 건강 상태 비교</li>
            <li>• 모바일 최적화, 다크 모드, 광고 자리 표시자</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-8 dark:border-slate-800 dark:bg-slate-900/80">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-700 dark:text-sky-300">주의</p>
          <h3 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">건강 정보는 참고용입니다.</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            본 BMI 계산 결과는 의료 진단을 대체하지 않습니다. 환율 정보는 외환 시장 상황에 따라 변동될 수 있습니다.
          </p>
          <div className="mt-6 rounded-3xl border border-dashed border-slate-300/80 bg-white/80 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-300">
            광고 자리 표시자
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
        <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">자주 묻는 질문</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((item) => (
            <div key={item.question} className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/80">
              <p className="font-semibold text-slate-900 dark:text-white">{item.question}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
