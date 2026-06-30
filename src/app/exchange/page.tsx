"use client";

import { useEffect, useMemo, useState } from "react";
import ExchangeHistoryChart from "@/components/ExchangeHistoryChart";

const currencies = [
  "USD",
  "EUR",
  "JPY",
  "KRW",
  "GBP",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "SGD",
];

const fallbackRates: Record<string, number> = {
  USD: 1380,
  EUR: 1550,
  JPY: 9.2,
  CNY: 190,
  GBP: 1750,
  AUD: 900,
  CAD: 1010,
  THB: 38,
  VND: 0.055,
  KRW: 1,
  CHF: 0.91,
  SGD: 1.35,
};

const fetchRates = async (symbols: string[]) => {
  const url = new URL("https://api.frankfurter.app/latest");
  url.searchParams.set("from", "USD");
  url.searchParams.set("to", symbols.filter((symbol) => symbol !== "USD").join(","));
  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error("환율 정보를 불러오는 데 실패했습니다.");
  }
  return res.json();
};

const fetchHistory = async () => {
  const startDate = "2025-06-01";
  const endDate = "2026-06-30";
  const url = new URL(`https://api.frankfurter.app/${startDate}..${endDate}`);
  url.searchParams.set("from", "USD");
  url.searchParams.set("to", "KRW");
  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error("환율 차트 데이터를 불러오는 데 실패했습니다.");
  }
  return res.json();
};

export default function ExchangePage() {
  const [baseCurrency, setBaseCurrency] = useState("KRW");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [amount, setAmount] = useState(1000);
  const [feePercent, setFeePercent] = useState(0.5);
  const [rateData, setRateData] = useState<Record<string, number>>({ ...fallbackRates });
  const [history, setHistory] = useState<Record<string, Record<string, number>>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [historyError, setHistoryError] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setHistoryError(false);
      setIsUsingFallback(false);

      try {
        const symbols = currencies.filter((currency) => currency !== "USD");
        const rates = await fetchRates(symbols);
        const nextRates: Record<string, number> = { ...fallbackRates };
        const usdToKrw = fallbackRates.USD;

        for (const [currency, value] of Object.entries(rates.rates || {})) {
          if (typeof value === "number" && value > 0) {
            nextRates[currency] = usdToKrw / value;
          }
        }

        setRateData(nextRates);
      } catch {
        setRateData({ ...fallbackRates });
        setIsUsingFallback(true);
      }

      try {
        const historyData = await fetchHistory();
        setHistory(historyData.rates || {});
      } catch {
        setHistoryError(true);
        setHistory({});
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [baseCurrency, targetCurrency]);

  const baseRate = rateData[baseCurrency] ?? fallbackRates[baseCurrency] ?? 1;
  const targetRate = rateData[targetCurrency] ?? fallbackRates[targetCurrency] ?? 1;
  const convertedAmount = useMemo(() => (amount * targetRate) / baseRate, [amount, baseRate, targetRate]);
  const feeAmount = useMemo(() => convertedAmount * (feePercent / 100), [convertedAmount, feePercent]);
  const totalWithFee = useMemo(() => convertedAmount - feeAmount, [convertedAmount, feeAmount]);
  const historyPoints = useMemo(
    () => Object.entries(history).sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime()),
    [history]
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
        <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">환율 변환기</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          10개 통화 간 환율을 빠르게 변환하고 수수료 적용 결과를 확인하세요.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4 rounded-3xl border border-slate-200/80 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-950/80">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">국가 통화</label>
            <select
              value={baseCurrency}
              onChange={(event) => setBaseCurrency(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">변환할 통화</label>
            <select
              value={targetCurrency}
              onChange={(event) => setTargetCurrency(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">금액</label>
            <input
              type="number"
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />

            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">수수료 (%)</label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={feePercent}
              onChange={(event) => setFeePercent(Number(event.target.value))}
              className="mt-2 w-full"
            />
            <div className="text-sm text-slate-600 dark:text-slate-400">현재 수수료: {feePercent.toFixed(1)}%</div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">계산 결과</h2>
            {isLoading ? (
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">환율 정보를 불러오는 중입니다...</p>
            ) : (
              <div className="mt-4 space-y-4">
                {isUsingFallback ? (
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    실시간 환율을 불러오지 못해 기본 환율로 계산합니다.
                  </p>
                ) : null}
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                  <p className="text-sm text-slate-500 dark:text-slate-400">1 {baseCurrency} = {targetRate.toFixed(4)} {targetCurrency}</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{convertedAmount.toLocaleString()} {targetCurrency}</p>
                </div>
                <div className="grid gap-3 rounded-3xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                    <span>수수료 금액</span>
                    <span>{feeAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {targetCurrency}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                    <span>수수료 적용 후 금액</span>
                    <span>{totalWithFee.toLocaleString(undefined, { maximumFractionDigits: 2 })} {targetCurrency}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 rounded-3xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">광고 자리 표시자</p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                광고를 게재할 수 있는 공간입니다. 실제 애드센스 코드를 여기로 교체하세요.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <ExchangeHistoryChart
            historyPoints={historyPoints}
            targetCurrency={targetCurrency}
            emptyMessage={historyError ? "데이터를 불러올 수 없습니다" : undefined}
          />
        </section>
      </section>
    </div>
  );
}
