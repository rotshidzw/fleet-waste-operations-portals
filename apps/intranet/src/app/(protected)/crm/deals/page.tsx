import { prisma } from "@njilo/db";

export default async function DealsPage() {
  const deals = await prisma.deal.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Deals / Opportunities</h1>
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-4 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>Name</span>
          <span>Stage</span>
          <span>Value</span>
          <span>Company</span>
        </div>
        {deals.map((deal) => (
          <div key={deal.id} className="grid grid-cols-4 gap-4 border-b border-slate-100 px-4 py-3 text-sm">
            <span>{deal.name}</span>
            <span>{deal.stage}</span>
            <span>R {deal.value.toFixed(2)}</span>
            <span>{deal.companyId ?? "-"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
