import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | 환율 + BMI 계산기",
  description: "환율 및 BMI 계산기 사이트에 대한 설명과 서비스 목적을 제공합니다.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
      <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">About</h1>
      <p className="text-base leading-7 text-slate-700 dark:text-slate-300">
        환율 + BMI 계산기는 빠르고 간편한 도구를 통해 일상에서 환율 계산과 건강 지표 확인을 돕기 위해 만들어졌습니다.
      </p>
      <div className="space-y-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
        <p>
          이 웹사이트는 frankfurter.app의 무료 환율 API를 사용하여 다양한 통화 간 환율을 조회하고, BMI 계산기를 통해 WHO 및 아시아 기준의 체중 상태를 제공합니다.
        </p>
        <p>
          제공되는 정보는 참고용이며, 건강 관련 결과는 의료 전문가의 상담을 대신하지 않습니다.
        </p>
        <p>
          광고 자리 표시자는 실제 광고 위치를 미리 보여주기 위한 것으로, 수익형 웹사이트 레이아웃에 맞춰 설계되었습니다.
        </p>
      </div>
    </div>
  );
}
