import { prisma } from "@njilo/db";
import { Card } from "@njilo/ui";

export default async function DashboardPage() {
  const leadCount = await prisma.lead.count();
  const vehicleCount = await prisma.vehicle.count();
  const wasteJobs = await prisma.wasteJob.count();
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 });

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Active Leads" description={`${leadCount} total leads`} />
        <Card title="Fleet Assets" description={`${vehicleCount} vehicles monitored`} />
        <Card title="Waste Jobs" description={`${wasteJobs} scheduled jobs`} />
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Latest leads</h2>
        <div className="mt-4 space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm">
              <div>
                <p className="font-semibold text-slate-900">{lead.fullName}</p>
                <p className="text-slate-500">{lead.email}</p>
              </div>
              <span className="text-xs uppercase text-slate-400">{lead.department}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
