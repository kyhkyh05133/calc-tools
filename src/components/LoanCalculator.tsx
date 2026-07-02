"use client";

import React, { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation } from "@/lib/translations";

type Method = "annuity" | "principal" | "bullet";

function format(n: number) {
  return n.toLocaleString();
}

export default function LoanCalculator() {
  const { language } = useLanguage();
  const [amount, setAmount] = useState(10000000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(3.5);
  const [method, setMethod] = useState<Method>("annuity");

  const r = rate / 100 / 12;
  const n = years * 12;

  const schedule = useMemo(() => {
    const rows: { period: number; principal: number; interest: number; balance: number }[] = [];
    let balance = amount;
    if (method === "annuity") {
      if (r === 0) {
        const monthly = amount / n;
        for (let i = 1; i <= n; i++) {
          const principal = monthly;
          balance -= principal;
          rows.push({ period: i, principal, interest: 0, balance: Math.max(balance, 0) });
        }
      } else {
        const factor = Math.pow(1 + r, n);
        const monthly = (amount * r * factor) / (factor - 1);
        for (let i = 1; i <= n; i++) {
          const interest = balance * r;
          const principal = monthly - interest;
          balance -= principal;
          rows.push({ period: i, principal, interest, balance: Math.max(balance, 0) });
        }
      }
    } else if (method === "principal") {
      const principalMonthly = amount / n;
      for (let i = 1; i <= n; i++) {
        const interest = balance * r;
        const principal = principalMonthly;
        balance -= principal;
        rows.push({ period: i, principal, interest, balance: Math.max(balance, 0) });
      }
    } else {
      // bullet: interest-only monthly, principal at end
      for (let i = 1; i <= n; i++) {
        const interest = balance * r;
        const principal = i === n ? amount : 0;
        balance -= principal;
        rows.push({ period: i, principal, interest, balance: Math.max(balance, 0) });
      }
    }
    return rows;
  }, [amount, years, rate, method, r, n]);

  const totals = useMemo(() => {
    const totalInterest = schedule.reduce((s, r) => s + r.interest, 0);
    const totalPrincipal = schedule.reduce((s, r) => s + r.principal, 0);
    const monthly = schedule.length > 0 ? schedule[0].principal + schedule[0].interest : 0;
    return { totalInterest, totalPrincipal, monthly };
  }, [schedule]);

  useEffect(() => {
    const ld = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: getTranslation("loanTitle", language),
      description: getTranslation("loanSeoBody1", language),
      url: typeof window !== "undefined" ? window.location.href : "",
    } as any;
    const faq = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: getTranslation("loanFaq1Q", language),
          acceptedAnswer: { "@type": "Answer", text: getTranslation("loanFaq1A", language) },
        },
        {
          "@type": "Question",
          name: getTranslation("loanFaq2Q", language),
          acceptedAnswer: { "@type": "Answer", text: getTranslation("loanFaq2A", language) },
        },
        {
          "@type": "Question",
          name: getTranslation("loanFaq3Q", language),
          acceptedAnswer: { "@type": "Answer", text: getTranslation("loanFaq3A", language) },
        },
      ],
    } as any;

    const s1 = document.getElementById("loan-jsonld-webapp");
    if (s1) s1.remove();
    const s2 = document.getElementById("loan-jsonld-faq");

    const script1 = document.createElement("script");
    script1.type = "application/ld+json";
    script1.id = "loan-jsonld-webapp";
    script1.text = JSON.stringify(ld);
    document.head.appendChild(script1);

    if (s2) s2.remove();
    const script2 = document.createElement("script");
    script2.type = "application/ld+json";
    script2.id = "loan-jsonld-faq";
    script2.text = JSON.stringify(faq);
    document.head.appendChild(script2);

    return () => {
      const a = document.getElementById("loan-jsonld-webapp");
      if (a) a.remove();
      const b = document.getElementById("loan-jsonld-faq");
      if (b) b.remove();
    };
  }, [language]);

  const pieData = [
    { name: "Principal", value: totals.totalPrincipal },
    { name: "Interest", value: totals.totalInterest },
  ];

  const COLORS = ["#8884d8", "#82ca9d"];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">{getTranslation("loanTitle", language)}</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col">
          <span className="text-sm text-slate-600">{getTranslation("loanAmountLabel", language)}</span>
          <input type="number" className="mt-1 rounded border px-3 py-2" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-slate-600">{getTranslation("loanYearsLabel", language)}</span>
          <input type="number" className="mt-1 rounded border px-3 py-2" value={years} onChange={(e) => setYears(Number(e.target.value))} />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-slate-600">{getTranslation("loanRateLabel", language)}</span>
          <input type="number" step="0.01" className="mt-1 rounded border px-3 py-2" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-slate-600">{getTranslation("loanMethodLabel", language)}</span>
          <select className="mt-1 rounded border px-3 py-2" value={method} onChange={(e) => setMethod(e.target.value as Method)}>
            <option value="annuity">{getTranslation("loanMethodAnnuity", language)}</option>
            <option value="principal">{getTranslation("loanMethodPrincipal", language)}</option>
            <option value="bullet">{getTranslation("loanMethodBullet", language)}</option>
          </select>
        </label>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <button className="rounded bg-slate-800 px-4 py-2 text-white" onClick={() => {}}>{getTranslation("loanComputeButton", language)}</button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded border p-4">
          <div className="text-sm text-slate-500">{getTranslation("loanMonthlyPayment", language)}</div>
          <div className="mt-2 text-xl font-semibold">{format(Math.round(totals.monthly))}</div>
        </div>
        <div className="rounded border p-4">
          <div className="text-sm text-slate-500">{getTranslation("loanTotalInterest", language)}</div>
          <div className="mt-2 text-xl font-semibold">{format(Math.round(totals.totalInterest))}</div>
        </div>
        <div className="rounded border p-4">
          <div className="text-sm text-slate-500">{getTranslation("loanTotalPayment", language)}</div>
          <div className="mt-2 text-xl font-semibold">{format(Math.round(totals.totalInterest + totals.totalPrincipal))}</div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-medium">{getTranslation("loanScheduleTitle", language)}</h2>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="p-2">{getTranslation("loanTableRound", language)}</th>
                <th className="p-2">{getTranslation("loanTablePrincipal", language)}</th>
                <th className="p-2">{getTranslation("loanTableInterest", language)}</th>
                <th className="p-2">{getTranslation("loanTableBalance", language)}</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.period} className="border-t">
                  <td className="p-2">{row.period}</td>
                  <td className="p-2">{format(Math.round(row.principal))}</td>
                  <td className="p-2">{format(Math.round(row.interest))}</td>
                  <td className="p-2">{format(Math.round(row.balance))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded border p-4">
          <h3 className="text-sm text-slate-600">{getTranslation("loanChartTitle", language)}</h3>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded border p-4">
          <h3 className="text-sm text-slate-600">{getTranslation("loanSeoTitle2", language)}</h3>
          <p className="mt-2 text-sm text-slate-700">{getTranslation("loanSeoBody2", language)}</p>
        </div>
      </div>

      <div className="mt-6 rounded border p-6 text-center text-slate-500">{getTranslation("exchangeAdBody", language)}</div>

      <div className="mt-8">
        <h3 className="text-lg font-medium">{getTranslation("loanSeoTitle1", language)}</h3>
        <p className="mt-2 text-sm text-slate-700">{getTranslation("loanSeoBody1", language)}</p>

        <div className="mt-4">
          <h4 className="font-medium">{getTranslation("homeFaqTitle", language)}</h4>
          <div className="mt-2 space-y-3 text-sm text-slate-700">
            <div>
              <strong>{getTranslation("loanFaq1Q", language)}</strong>
              <div>{getTranslation("loanFaq1A", language)}</div>
            </div>
            <div>
              <strong>{getTranslation("loanFaq2Q", language)}</strong>
              <div>{getTranslation("loanFaq2A", language)}</div>
            </div>
            <div>
              <strong>{getTranslation("loanFaq3Q", language)}</strong>
              <div>{getTranslation("loanFaq3A", language)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded border p-6 text-center text-slate-500">{getTranslation("exchangeAdBody", language)}</div>
    </div>
  );
}
