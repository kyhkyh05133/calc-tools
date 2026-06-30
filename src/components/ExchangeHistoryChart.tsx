"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type ExchangeHistoryChartProps = {
  historyPoints: Array<[string, Record<string, number>]>,
  targetCurrency: string,
  emptyMessage?: string,
};

export default function ExchangeHistoryChart({ historyPoints, targetCurrency, emptyMessage }: ExchangeHistoryChartProps) {
  if (historyPoints.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
        {emptyMessage ?? "환율 차트 데이터를 불러오는 중입니다..."}
      </div>
    );
  }

  const chartData = historyPoints.map(([date, entry]) => ({
    date: date.slice(5),
    value: entry[targetCurrency] ?? 0,
  }));

  const maxValue = Math.max(...chartData.map((item) => item.value));
  const minValue = Math.min(...chartData.map((item) => item.value));

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">환율 추세 차트</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">최근 30일간 {targetCurrency} 기준 환율 변동 그래프입니다.</p>
        </div>
        <div className="text-right text-sm text-slate-600 dark:text-slate-400">
          <p>최고 {maxValue.toFixed(4)}</p>
          <p>최저 {minValue.toFixed(4)}</p>
        </div>
      </div>
      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 12 }} minTickGap={20} />
            <YAxis domain={[minValue * 0.99, maxValue * 1.01]} tick={{ fill: "#64748b", fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
