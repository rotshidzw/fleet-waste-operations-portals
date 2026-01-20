import { prisma } from "@njilo/db";

export default async function FuelLogsPage() {
  const logs = await prisma.fuelLog.findMany({ orderBy: { loggedAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Fuel Logs</h1>
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-4 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>Vehicle</span>
          <span>Litres</span>
          <span>Cost</span>
          <span>Date</span>
        </div>
        {logs.map((log) => (
          <div key={log.id} className="grid grid-cols-4 gap-4 border-b border-slate-100 px-4 py-3 text-sm">
            <span>{log.vehicleId}</span>
            <span>{log.litres}</span>
            <span>R {log.cost.toFixed(2)}</span>
            <span>{log.loggedAt.toDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
