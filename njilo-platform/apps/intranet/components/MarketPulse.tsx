"use client";

const metrics = [
  { label: "Pipeline velocity", value: 72 },
  { label: "Tasks completed", value: 54 },
  { label: "Service uptime", value: 91 },
  { label: "Customer sentiment", value: 68 }
];

export function MarketPulse() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase text-slate-500">{metric.label}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-semibold text-slate-900">{metric.value}%</span>
            <span className="text-xs text-slate-400">This week</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-blue-600" style={{ width: `${metric.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
