import { prisma } from "@njilo/db";

export default async function DriversPage() {
  const drivers = await prisma.driver.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Drivers</h1>
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-3 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>Name</span>
          <span>License</span>
          <span>Phone</span>
        </div>
        {drivers.map((driver) => (
          <div key={driver.id} className="grid grid-cols-3 gap-4 border-b border-slate-100 px-4 py-3 text-sm">
            <span>{driver.name}</span>
            <span>{driver.license}</span>
            <span>{driver.phone ?? "-"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
