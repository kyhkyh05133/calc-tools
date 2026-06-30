import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600;

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
};

const buildLatestFallbackRates = (base: string, to?: string) => {
  const baseRate = fallbackRates[base] ?? 1;
  const symbols = to
    ? to.split(",").filter(Boolean)
    : Object.keys(fallbackRates).filter((currency) => currency !== base);

  const rates: Record<string, number> = {};
  for (const symbol of symbols) {
    if (symbol === base) {
      rates[symbol] = 1;
      continue;
    }

    const symbolRate = fallbackRates[symbol] ?? 1;
    rates[symbol] = baseRate / symbolRate;
  }

  return rates;
};

const buildHistoryFallbackRates = (base: string, to: string, start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const rates: Record<string, Record<string, number>> = {};

  const current = new Date(startDate);
  while (current <= endDate) {
    const date = current.toISOString().split("T")[0];
    const baseRate = fallbackRates[base] ?? 1;
    const targetRate = fallbackRates[to] ?? 1;
    rates[date] = { [to]: baseRate / targetRate };
    current.setDate(current.getDate() + 1);
  }

  return rates;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const base = searchParams.get("base") ?? "USD";
  const to = searchParams.get("to") ?? "";
  const start = searchParams.get("start") ?? "";
  const end = searchParams.get("end") ?? "";

  const headers = {
    "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
  };

  if (start && end) {
    const url = new URL(`https://api.frankfurter.app/${start}..${end}`);
    url.searchParams.set("from", base);
    if (to) {
      url.searchParams.set("to", to);
    }

    try {
      const response = await fetch(url.toString(), {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("history fetch failed");
      }

      const data = await response.json();
      return NextResponse.json(data, { status: 200, headers });
    } catch {
      return NextResponse.json(
        {
          fallback: true,
          base,
          start,
          end,
          rates: buildHistoryFallbackRates(base, to || "KRW", start, end),
        },
        { status: 200, headers }
      );
    }
  }

  const url = new URL("https://api.frankfurter.app/latest");
  url.searchParams.set("from", base);
  if (to) {
    url.searchParams.set("to", to);
  }

  try {
    const response = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error("latest fetch failed");
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200, headers });
  } catch {
    return NextResponse.json(
      {
        fallback: true,
        base,
        date: new Date().toISOString().split("T")[0],
        rates: buildLatestFallbackRates(base, to || ""),
      },
      { status: 200, headers }
    );
  }
}
