import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createDriver(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "");
  const licenseNo = String(formData.get("licenseNo") || "");

  await prisma.driver.create({
    data: { name, licenseNo, status: "Active" }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Driver", entityId: licenseNo }
  });

  revalidatePath("/fleet-ops/drivers");
}

export default async function DriversPage() {
  const drivers = await prisma.driver.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Register driver" description="Add licensed drivers and certifications.">
        <form action={createDriver} className="grid gap-3 md:grid-cols-2">
          <input name="name" placeholder="Driver name" className="rounded-md border border-slate-200 p-2" required />
          <input name="licenseNo" placeholder="License number" className="rounded-md border border-slate-200 p-2" required />
          <Button type="submit" className="md:col-span-2">Save driver</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Drivers</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {drivers.map((driver) => (
            <li key={driver.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{driver.name}</p>
              <p className="text-slate-500">{driver.licenseNo} · {driver.status}</p>
            </li>
          ))}
        </ul>
      </div>

      <Card title="Live driver tracking" description="Demo-only location telemetry feed.">
        <div className="grid gap-4 md:grid-cols-3">
          {drivers.slice(0, 3).map((driver, index) => (
            <div key={driver.id} className="rounded-lg border border-slate-200 p-3 text-sm">
              <p className="font-semibold text-slate-900">{driver.name}</p>
              <p className="text-slate-500">Status: On-route · Unit {index + 12}</p>
              <p className="text-slate-500">Lat: -26.{320 + index} · Long: 28.{640 + index}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
