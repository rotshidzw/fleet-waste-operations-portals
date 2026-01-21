"use client";

import { useEffect, useState } from "react";

const stats = [
  { label: "Active Fleet Assets", value: 1250 },
  { label: "Annual Waste Jobs", value: 4800 },
  { label: "Compliance Audits", value: 320 }
];

export function StatsCounters() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const timers = stats.map((stat, index) => {
      let current = 0;
      const increment = Math.ceil(stat.value / 80);
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setCounts((prev) => {
          const next = [...prev];
          next[index] = current;
          return next;
        });
      }, 20);
      return timer;
    });

    return () => {
      timers.forEach(clearInterval);
    };
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="flex flex-col items-center rounded-full border border-slate-200 bg-white px-6 py-10 text-center shadow-sm"
        >
          <span className="text-4xl font-semibold text-blue-900">{counts[index]}</span>
          <span className="mt-2 text-sm text-slate-600">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
