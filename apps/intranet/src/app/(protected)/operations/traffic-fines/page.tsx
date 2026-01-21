import { prisma } from "@njilo/db";

export default async function TrafficFinesPage() {
  const fines = await prisma.trafficFine.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Traffic Fines Register</h1>
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-3 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>Reference</span>
          <span>Status</span>
          <span>Amount</span>
        </div>
        {fines.map((fine) => (
          <div key={fine.id} className="grid grid-cols-3 gap-4 border-b border-slate-100 px-4 py-3 text-sm">
            <span>{fine.reference}</span>
            <span>{fine.status}</span>
            <span>R {fine.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
