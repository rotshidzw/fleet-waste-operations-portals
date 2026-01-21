import { prisma } from "@njilo/db";

export default async function CompaniesPage() {
  const companies = await prisma.company.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Companies / Clients</h1>
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-3 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>Name</span>
          <span>Sector</span>
          <span>Created</span>
        </div>
        {companies.map((company) => (
          <div key={company.id} className="grid grid-cols-3 gap-4 border-b border-slate-100 px-4 py-3 text-sm">
            <span>{company.name}</span>
            <span>{company.sector ?? "-"}</span>
            <span>{company.createdAt.toDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
