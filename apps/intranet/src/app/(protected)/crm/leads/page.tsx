import { prisma } from "@njilo/db";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Leads</h1>
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-5 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Company</span>
          <span>Message</span>
        </div>
        {leads.map((lead) => (
          <div key={lead.id} className="grid grid-cols-5 gap-4 border-b border-slate-100 px-4 py-3 text-sm">
            <span>{lead.name}</span>
            <span>{lead.email}</span>
            <span>{lead.phone ?? "-"}</span>
            <span>{lead.company ?? "-"}</span>
            <span className="text-slate-500">{lead.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
