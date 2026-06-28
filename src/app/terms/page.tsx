import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms | 환율 + BMI 계산기",
  description: "서비스 이용약관과 면책사항 안내 페이지입니다.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
      <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">서비스 이용약관</h1>
      <div className="space-y-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
        <p>
          이 웹사이트는 정보 제공을 목적으로 하며, 제공되는 환율 및 BMI 계산 정보는 참고용입니다.
        </p>
        <p>
          환율은 외환 시장 변동에 따라 실제 환율과 차이가 있을 수 있으며, BMI 결과는 의료 진단을 대체하지 않습니다.
        </p>
        <p>
          웹사이트 이용 중 발생하는 손해에 대해서는 책임을 지지 않습니다. 사용자는 본 약관에 동의하는 것으로 간주됩니다.
        </p>
        <p>
          광고 자리 표시자는 실제 광고가 아니며, 광고 네트워크가 제공하는 콘텐츠에 따른 책임은 해당 광고 파트너에게 있습니다.
        </p>
      </div>
    </div>
  );
}
