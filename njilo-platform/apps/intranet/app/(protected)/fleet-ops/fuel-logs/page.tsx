import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createFuelLog(formData: FormData) {
  "use server";
  const vehicleId = String(formData.get("vehicleId") || "");
  const liters = Number(formData.get("liters") || 0);
  const cost = Number(formData.get("cost") || 0);

  if (!vehicleId) {
    return;
  }

  await prisma.fuelLog.create({
    data: { vehicleId, liters, cost }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "FuelLog", entityId: vehicleId }
  });

  revalidatePath("/fleet-ops/fuel-logs");
}

export default async function FuelLogsPage() {
  const logs = await prisma.fuelLog.findMany({ include: { vehicle: true } });
  const vehicles = await prisma.vehicle.findMany({ orderBy: { make: "asc" } });

  return (
    <div className="space-y-6">
      <Card title="Log fuel" description="Track fuel usage and costs.">
        <form action={createFuelLog} className="grid gap-3 md:grid-cols-2">
          <select name="vehicleId" className="rounded-md border border-slate-200 p-2 md:col-span-2" required>
            <option value="">Select vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>{vehicle.make} {vehicle.model}</option>
            ))}
          </select>
          <input name="liters" type="number" placeholder="Liters" className="rounded-md border border-slate-200 p-2" />
          <input name="cost" type="number" placeholder="Cost" className="rounded-md border border-slate-200 p-2" />
          <Button type="submit" className="md:col-span-2">Save log</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Fuel logs</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {logs.map((log) => (
            <li key={log.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{log.vehicle.make} {log.vehicle.model}</p>
              <p className="text-slate-500">{log.liters}L · R{log.cost}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
