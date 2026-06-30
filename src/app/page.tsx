import HomePageContent from "@/components/HomePageContent";

export const metadata = {
  title: "홈 | 환율 + BMI 계산기",
  description:
    "환율 변환기와 BMI 계산기를 한 곳에서 제공합니다. 빠르게 계산하고 차트, 수수료, 체중 범위를 확인하세요.",
};

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
    <>
      <HomePageContent />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
