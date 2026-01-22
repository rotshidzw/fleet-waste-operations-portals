"use client";

import { useMemo, useState } from "react";

const services = [
  {
    id: "fleet",
    name: "Fleet Management",
    bullets: ["Lifecycle planning", "Telematics + tracking", "Compliance dashboards"]
  },
  {
    id: "waste",
    name: "Waste Operations",
    bullets: ["Route optimization", "Licensed disposal", "Reporting & audits"]
  },
  {
    id: "plant",
    name: "Plant & Equipment",
    bullets: ["Yellow plant rentals", "Maintenance schedules", "Operator training"]
  }
];

export function ServiceComparison() {
  const [selected, setSelected] = useState<string[]>(["fleet", "waste"]);

  const selectedServices = useMemo(
    () => services.filter((service) => selected.includes(service.id)),
    [selected]
  );

  function toggleService(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id].slice(0, 3)
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
        Compare services
      </p>
      <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Build your service stack</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Select up to three services to compare delivery capabilities.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {services.map((service) => (
          <label
            key={service.id}
            className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
              selected.includes(service.id)
                ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950 dark:text-blue-200"
                : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(service.id)}
              onChange={() => toggleService(service.id)}
              className="hidden"
            />
            {service.name}
          </label>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {selectedServices.map((service) => (
          <div key={service.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
            <h4 className="font-semibold text-slate-900 dark:text-white">{service.name}</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {service.bullets.map((bullet) => (
                <li key={bullet}>• {bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
