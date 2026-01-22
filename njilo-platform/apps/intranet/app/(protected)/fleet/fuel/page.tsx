import Link from "next/link";
import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createFuelLog(formData: FormData) {
  "use server";
  const vehicleId = String(formData.get("vehicleId") || "").trim();
  const liters = Number(formData.get("liters") || 0);
  const cost = Number(formData.get("cost") || 0);

  if (!vehicleId || !liters || !cost) {
    return;
  }

  await prisma.fuelLog.create({
    data: { vehicleId, liters, cost }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "FuelLog", entityId: vehicleId }
  });

  revalidatePath("/fleet/fuel");
}

export default async function FuelPage() {
  const logs = await prisma.fuelLog.findMany({ include: { vehicle: true }, orderBy: { createdAt: "desc" } });
  const vehicles = await prisma.vehicle.findMany({ orderBy: { make: "asc" } });

  return (
    <div className="space-y-6">
      <Card title="Fuel management" description="Track fuel usage and spend.">
        <form action={createFuelLog} className="grid gap-3 md:grid-cols-2">
          <select name="vehicleId" className="rounded-md border border-slate-200 p-2" required>
            <option value="">Select vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>{vehicle.make} {vehicle.model}</option>
            ))}
          </select>
          <input name="liters" type="number" step="0.1" placeholder="Liters" className="rounded-md border border-slate-200 p-2" required />
          <input name="cost" type="number" step="0.01" placeholder="Cost" className="rounded-md border border-slate-200 p-2" required />
          <Button type="submit" className="md:col-span-2">Log fuel</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Fuel logs</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {logs.map((log) => (
            <li key={log.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{log.vehicle.make} {log.vehicle.model}</p>
                <p className="text-slate-500">{log.liters}L · R{log.cost.toFixed(2)}</p>
              </div>
              <Link href={`/fleet/fuel?vehicle=${log.vehicleId}`} className="text-xs font-semibold text-blue-700">View</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
