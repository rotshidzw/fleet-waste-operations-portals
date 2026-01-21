const features = [
  "Lifecycle planning",
  "Telematics integration",
  "Route optimization",
  "Compliance audits",
  "Cost-to-serve dashboards",
  "24/7 control room",
  "Driver safety coaching",
  "Fuel variance tracking",
  "Maintenance SLAs",
  "Waste diversion KPIs",
  "ESG reporting",
  "Insurance readiness",
  "Incident response",
  "Asset utilization",
  "Supplier governance",
  "Executive insights"
];

export function ServiceFeatureList() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
        Service capabilities
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-600 transition hover:border-blue-500 hover:text-blue-700 dark:border-slate-700 dark:text-slate-200"
          >
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}
