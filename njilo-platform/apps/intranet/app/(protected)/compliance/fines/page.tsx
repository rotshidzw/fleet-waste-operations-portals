import Link from "next/link";
import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createFine(formData: FormData) {
  "use server";
  const vehicleId = String(formData.get("vehicleId") || "").trim();
  const amount = Number(formData.get("amount") || 0);
  const status = String(formData.get("status") || "Open").trim();
  const issuedAt = String(formData.get("issuedAt") || "").trim();

  if (!vehicleId || !amount || !issuedAt) {
    return;
  }

  await prisma.trafficFine.create({
    data: { vehicleId, amount, status, issuedAt: new Date(issuedAt) }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "TrafficFine", entityId: vehicleId }
  });

  revalidatePath("/compliance/fines");
}

export default async function TrafficFinesPage() {
  const fines = await prisma.trafficFine.findMany({ include: { vehicle: true }, orderBy: { issuedAt: "desc" } });
  const vehicles = await prisma.vehicle.findMany({ orderBy: { make: "asc" } });

  return (
    <div className="space-y-6">
      <Card title="Traffic fines" description="Track fines, disputes, and payment status.">
        <form action={createFine} className="grid gap-3 md:grid-cols-2">
          <select name="vehicleId" className="rounded-md border border-slate-200 p-2" required>
            <option value="">Select vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>{vehicle.make} {vehicle.model}</option>
            ))}
          </select>
          <input name="amount" type="number" placeholder="Amount" className="rounded-md border border-slate-200 p-2" required />
          <select name="status" className="rounded-md border border-slate-200 p-2">
            <option value="Open">Open</option>
            <option value="Paid">Paid</option>
            <option value="Disputed">Disputed</option>
          </select>
          <input name="issuedAt" type="date" className="rounded-md border border-slate-200 p-2" required />
          <Button type="submit" className="md:col-span-2">Log fine</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Fines register</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {fines.map((fine) => (
            <li key={fine.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{fine.vehicle.make} {fine.vehicle.model}</p>
                <p className="text-slate-500">R{fine.amount.toFixed(2)} · {fine.status}</p>
                <p className="text-xs text-slate-400">Issued: {fine.issuedAt.toDateString()}</p>
              </div>
              <Link href={`/compliance/fines/${fine.id}`} className="text-xs font-semibold text-blue-700">View</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
