"use client";

import { useEffect, useMemo, useState } from "react";
import ExchangeHistoryChart from "@/components/ExchangeHistoryChart";
import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation } from "@/lib/translations";

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

const getFallbackRate = (baseCurrency: string, targetCurrency: string) => {
  const baseValue = fallbackRates[baseCurrency] ?? 1;
  const targetValue = fallbackRates[targetCurrency] ?? 1;
  return baseValue / targetValue;
};

const fetchRates = async (baseCurrency: string, symbols: string[]) => {
  const params = new URLSearchParams({ base: baseCurrency, to: symbols.join(",") });
  const res = await fetch(`/api/exchange?${params.toString()}`);
  if (!res.ok) {
    throw new Error("환율 정보를 불러오는 데 실패했습니다.");
  }
  return res.json();
};

const fetchHistory = async () => {
  const params = new URLSearchParams({ base: "USD", to: "KRW", start: "2025-06-01", end: "2026-06-30" });
  const res = await fetch(`/api/exchange?${params.toString()}`);
  if (!res.ok) {
    throw new Error("환율 차트 데이터를 불러오는 데 실패했습니다.");
  }
  return res.json();
};

export default function ExchangePage() {
  const { language } = useLanguage();
  const [baseCurrency, setBaseCurrency] = useState("KRW");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [amount, setAmount] = useState(1000);
  const [feePercent, setFeePercent] = useState(0.5);
  const [rateData, setRateData] = useState<Record<string, number>>({});
  const [history, setHistory] = useState<Record<string, Record<string, number>>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [historyError, setHistoryError] = useState(false);
  const [rateError, setRateError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setHistoryError(false);
      setIsUsingFallback(false);
      setRateError(null);

      try {
        const symbols = currencies.filter((currency) => currency !== "USD");
        const rates = await fetchRates("USD", symbols);
        const nextRates: Record<string, number> = { USD: 1 };

        for (const [currency, value] of Object.entries(rates.rates || {})) {
          if (typeof value === "number" && value > 0) {
            nextRates[currency] = value;
          }
        }

        const usdToBase = getFallbackRate("USD", baseCurrency);
        const usdToTarget = getFallbackRate("USD", targetCurrency);
        const baseToTarget = usdToTarget / usdToBase;

        for (const currency of currencies) {
          if (!(currency in nextRates)) {
            nextRates[currency] = getFallbackRate("USD", currency);
          }
        }

        setRateData(nextRates);
        setRateError(null);
        setIsUsingFallback(Boolean(rates.fallback));
      } catch {
        const fallbackRateData: Record<string, number> = { USD: 1 };
        for (const currency of currencies) {
          if (currency !== "USD") {
            fallbackRateData[currency] = getFallbackRate("USD", currency);
          }
        }
        setRateData(fallbackRateData);
        setIsUsingFallback(true);
        setRateError("실시간 연결이 불안정해 기본 환율로 계산합니다.");
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

  const targetRate = useMemo(() => {
    if (baseCurrency === targetCurrency) {
      return 1;
    }

    if (baseCurrency === "USD") {
      return rateData[targetCurrency] ?? getFallbackRate("USD", targetCurrency);
    }

    if (targetCurrency === "USD") {
      return 1 / (rateData[baseCurrency] ?? getFallbackRate("USD", baseCurrency));
    }

    const baseToUsd = 1 / (rateData[baseCurrency] ?? getFallbackRate("USD", baseCurrency));
    const usdToTarget = rateData[targetCurrency] ?? getFallbackRate("USD", targetCurrency);
    return baseToUsd * usdToTarget;
  }, [baseCurrency, rateData, targetCurrency]);

  const convertedAmount = useMemo(() => {
    if (baseCurrency === "USD") {
      return amount * targetRate;
    }

    if (targetCurrency === "USD") {
      return amount / (rateData[baseCurrency] ?? getFallbackRate("USD", baseCurrency));
    }

    return amount * targetRate;
  }, [amount, baseCurrency, rateData, targetCurrency, targetRate]);
  const feeAmount = useMemo(() => convertedAmount * (feePercent / 100), [convertedAmount, feePercent]);
  const totalWithFee = useMemo(() => convertedAmount - feeAmount, [convertedAmount, feeAmount]);
  const historyPoints = useMemo(
    () => Object.entries(history).sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime()),
    [history]
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
        <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">{getTranslation("exchangeTitle", language)}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {getTranslation("exchangeDescription", language)}
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4 rounded-3xl border border-slate-200/80 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-950/80">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">{getTranslation("exchangeBaseLabel", language)}</label>
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

            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">{getTranslation("exchangeTargetLabel", language)}</label>
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

            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">{getTranslation("exchangeAmountLabel", language)}</label>
            <input
              type="number"
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />

            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">{getTranslation("exchangeFeeLabel", language)}</label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={feePercent}
              onChange={(event) => setFeePercent(Number(event.target.value))}
              className="mt-2 w-full"
            />
            <div className="text-sm text-slate-600 dark:text-slate-400">{getTranslation("exchangeFeeValue", language)}: {feePercent.toFixed(1)}%</div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{getTranslation("exchangeResultTitle", language)}</h2>
            {isLoading ? (
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{getTranslation("exchangeLoading", language)}</p>
            ) : (
              <div className="mt-4 space-y-4">
                {isUsingFallback ? (
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    {rateError ?? getTranslation("exchangeLive", language)}
                  </p>
                ) : (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">{getTranslation("exchangeLive", language)}</p>
                )}
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                  <p className="text-sm text-slate-500 dark:text-slate-400">{getTranslation("exchangeRateLabel", language).replace("{baseCurrency}", baseCurrency).replace("{targetRate}", targetRate.toFixed(4)).replace("{targetCurrency}", targetCurrency)}</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{convertedAmount.toLocaleString()} {targetCurrency}</p>
                </div>
                <div className="grid gap-3 rounded-3xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                    <span>{getTranslation("exchangeFeeAmount", language)}</span>
                    <span>{feeAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {targetCurrency}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                    <span>{getTranslation("exchangeNetAmount", language)}</span>
                    <span>{totalWithFee.toLocaleString(undefined, { maximumFractionDigits: 2 })} {targetCurrency}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 rounded-3xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{getTranslation("exchangeAdTitle", language)}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {getTranslation("exchangeAdBody", language)}
              </p>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <ExchangeHistoryChart
            historyPoints={historyPoints}
            targetCurrency={targetCurrency}
            emptyMessage={historyError ? getTranslation("exchangeChartEmpty", language) : undefined}
          />
        </section>
      </section>
    </div>
  );
}
