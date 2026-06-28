import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | 환율 + BMI 계산기",
  description: "개인정보 처리방침과 사용자 정보 보호 방침을 안내합니다.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
      <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">개인정보 처리방침</h1>
      <div className="space-y-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
        <p>
          본 웹사이트는 개인정보를 직접 수집하지 않습니다. 사용자가 입력하는 키, 몸무게, 환율 계산 정보는 클라이언트 측에서 처리됩니다.
        </p>
        <p>
          frankfurter.app API 호출을 통해 환율 데이터를 가져오며, 이 과정에서 사용자의 별도 개인 정보는 전송되지 않습니다.
        </p>
        <p>
          광고 게재 시에도 사용자의 개인 정보 수집은 이루어지지 않으며, 광고 네트워크의 정책은 해당 광고 파트너에 따릅니다.
        </p>
        <p>
          문의가 필요한 경우, 웹사이트 소유자가 제공하는 연락 수단을 통해 연락해 주세요.
        </p>
      </div>
    </div>
  );
}
