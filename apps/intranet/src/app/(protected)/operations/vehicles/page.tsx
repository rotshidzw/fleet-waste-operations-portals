import { prisma } from "@njilo/db";

export default async function VehiclesPage() {
  const vehicles = await prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Vehicles</h1>
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-4 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>VIN</span>
          <span>Plate</span>
          <span>Status</span>
          <span>Assigned To</span>
        </div>
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="grid grid-cols-4 gap-4 border-b border-slate-100 px-4 py-3 text-sm">
            <span>{vehicle.vin}</span>
            <span>{vehicle.plate}</span>
            <span>{vehicle.status}</span>
            <span>{vehicle.assignedTo ?? "-"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
