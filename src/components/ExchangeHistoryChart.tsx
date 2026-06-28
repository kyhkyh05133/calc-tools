"use client";

type ExchangeHistoryChartProps = {
  historyPoints: Array<[string, Record<string, number>]>,
  targetCurrency: string,
};

export default function ExchangeHistoryChart({ historyPoints, targetCurrency }: ExchangeHistoryChartProps) {
  if (historyPoints.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
        환율 차트 데이터를 불러오는 중입니다...
      </div>
    );
  }

  const values = historyPoints.map(([_, entry]) => entry[targetCurrency] ?? 0);
  const labels = historyPoints.map(([date]) => date.slice(5));
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const width = 760;
  const height = 260;
  const paddingX = 40;
  const paddingY = 24;

  const points = values.map((value, index) => {
    const x = paddingX + (index / Math.max(historyPoints.length - 1, 1)) * (width - paddingX * 2);
    const y = paddingY + ((maxValue - value) / Math.max(maxValue - minValue, 1)) * (height - paddingY * 2);
    return `${x},${y}`;
  });

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
      <div className="mt-6 overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[24rem]">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.35)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width={width} height={height} fill="transparent" />
          <path
            d={`M${paddingX},${height - paddingY} L${points.join(" L")} L${width - paddingX},${height - paddingY} Z`}
            fill="url(#chartGradient)"
            opacity="0.9"
          />
          <polyline
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="3"
            points={points.join(" ")}
          />
          {points.map((point, index) => {
            const [x, y] = point.split(",").map(Number);
            return (
              <circle key={String(index)} cx={x} cy={y} r="3.5" fill="#0ea5e9" stroke="#fff" strokeWidth="1.5" />
            );
          })}
          {labels.map((label, index) => {
            const x = paddingX + (index / Math.max(labels.length - 1, 1)) * (width - paddingX * 2);
            return (
              <text key={label} x={x} y={height - 6} textAnchor="middle" fontSize="10" fill="#64748b">
                {label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
