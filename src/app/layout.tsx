import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "환율 + BMI 계산기",
  description:
    "무료 환율 변환기와 BMI 계산기를 제공하는 반응형 수익형 웹사이트입니다.",
  metadataBase: new URL("https://your-calculator-site.vercel.app"),
  verification: {
    google: "qAW5DaMSvoFPquTk2M-pN6pMq3tBmkQuXoR2F7q5UAs",
    naver: "142b7b469a8bd3cf70b68c642489b8ee44bff08c",
  },
  openGraph: {
    title: "환율 + BMI 계산기",
    description:
      "환율 변환기, BMI 계산기, 수수료 계산, 30일 차트, 다크 모드를 지원하는 간편한 웹 앱.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
        <div className="flex min-h-screen flex-col">
          <NavBar />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
          <footer className="border-t border-slate-200/80 bg-white/80 px-4 py-4 text-center text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-400 sm:px-6">
            <p>© 2026 환율 + BMI 계산기. 개인용 정보 및 건강 정보를 제공합니다.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
