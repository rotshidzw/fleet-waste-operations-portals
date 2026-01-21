import { prisma } from "@njilo/db";

export default async function DashboardPage() {
  const [leadCount, vehicleCount, vacancyCount, wasteJobs] = await Promise.all([
    prisma.lead.count(),
    prisma.vehicle.count(),
    prisma.vacancy.count(),
    prisma.wasteJob.count()
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Operations Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Leads", value: leadCount },
          { label: "Vehicles", value: vehicleCount },
          { label: "Vacancies", value: vacancyCount },
          { label: "Waste Jobs", value: wasteJobs }
        ].map((item) => (
          <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
