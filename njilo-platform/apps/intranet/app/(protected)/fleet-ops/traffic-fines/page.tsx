import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createFine(formData: FormData) {
  "use server";
  const vehicleId = String(formData.get("vehicleId") || "");
  const amount = Number(formData.get("amount") || 0);

  if (!vehicleId) {
    return;
  }

  await prisma.trafficFine.create({
    data: { vehicleId, amount, status: "Open", issuedAt: new Date() }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "TrafficFine", entityId: vehicleId }
  });

  revalidatePath("/fleet-ops/traffic-fines");
}

export default async function TrafficFinesPage() {
  const fines = await prisma.trafficFine.findMany({ include: { vehicle: true } });
  const vehicles = await prisma.vehicle.findMany({ orderBy: { make: "asc" } });

  return (
    <div className="space-y-6">
      <Card title="Log traffic fine" description="Capture compliance issues and resolution status.">
        <form action={createFine} className="grid gap-3 md:grid-cols-2">
          <select name="vehicleId" className="rounded-md border border-slate-200 p-2 md:col-span-2" required>
            <option value="">Select vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>{vehicle.make} {vehicle.model}</option>
            ))}
          </select>
          <input name="amount" type="number" placeholder="Amount" className="rounded-md border border-slate-200 p-2" />
          <Button type="submit" className="md:col-span-2">Save fine</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Traffic fines</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {fines.map((fine) => (
            <li key={fine.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{fine.vehicle.make} {fine.vehicle.model}</p>
              <p className="text-slate-500">R{fine.amount} · {fine.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
