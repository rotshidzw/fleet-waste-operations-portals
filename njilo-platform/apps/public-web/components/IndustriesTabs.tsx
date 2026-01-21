"use client";

import { useState } from "react";

const industries = [
  {
    name: "Public Works",
    description: "Municipal fleets, utilities, and public infrastructure operations with audit-ready delivery."
  },
  {
    name: "Mining & Resources",
    description: "Heavy plant coordination, safety compliance, and remote asset visibility."
  },
  {
    name: "Manufacturing",
    description: "Inbound/outbound logistics, waste diversion, and equipment uptime planning."
  },
  {
    name: "Retail Distribution",
    description: "Route optimization, cold-chain reporting, and cost-to-serve insights."
  },
  {
    name: "Ports & Logistics",
    description: "Harbor-side operations, fleet staging, and real-time compliance reporting."
  },
  {
    name: "Healthcare",
    description: "Regulated waste streams, secure fleet operations, and SLA-driven coverage."
  },
  {
    name: "Municipal Services",
    description: "City-wide waste management, recycling targets, and service transparency."
  },
  {
    name: "Construction",
    description: "Plant rentals, operator training, and site-based waste logistics."
  }
];

export function IndustriesTabs() {
  const [active, setActive] = useState(industries[0].name);
  const activeIndustry = industries.find((industry) => industry.name === active) ?? industries[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-wrap gap-3">
        {industries.map((industry) => (
          <button
            key={industry.name}
            onClick={() => setActive(industry.name)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              active === industry.name
                ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950 dark:text-blue-200"
                : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-200"
            }`}
          >
            {industry.name}
          </button>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
        <p className="text-xs font-semibold uppercase text-slate-500">{activeIndustry.name}</p>
        <p className="mt-2">{activeIndustry.description}</p>
      </div>
    </div>
  );
}
