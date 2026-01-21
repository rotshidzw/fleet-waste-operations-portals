"use client";

import { useState } from "react";

const features = [
  "Opportunity pipeline views",
  "Customer lifecycle tracking",
  "Driver telemetry snapshots",
  "Fleet maintenance scheduling",
  "Waste job SLA monitoring",
  "Compliance note library",
  "HR candidate vault",
  "Leave & absence planning",
  "Supplier governance",
  "Audit trail export",
  "Role-based dashboards",
  "Executive KPI summaries",
  "Incident response logs",
  "Asset utilization heatmaps",
  "Service catalog publishing",
  "Media & publications hub",
  "Risk scoring",
  "Cost recovery tracking",
  "Multi-site scheduling",
  "Invoice reconciliation",
  "Customer satisfaction tracking",
  "Contract renewal alerts"
];

export function IntranetCapabilities() {
  const [active, setActive] = useState(features[0]);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <button
            key={feature}
            type="button"
            onClick={() => setActive(feature)}
            className={`rounded-full border px-3 py-2 text-xs transition ${
              active === feature
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700"
            }`}
          >
            {feature}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
        <p className="text-xs font-semibold uppercase text-slate-500">Selected capability</p>
        <p className="mt-2">{active}</p>
      </div>
    </div>
  );
}
