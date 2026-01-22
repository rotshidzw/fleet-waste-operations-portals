import Link from "next/link";
import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createMaintenanceSchedule(formData: FormData) {
  "use server";
  const assetId = String(formData.get("assetId") || "").trim();
  const serviceType = String(formData.get("serviceType") || "").trim();
  const nextServiceAt = String(formData.get("nextServiceAt") || "").trim();
  const status = String(formData.get("status") || "UPCOMING").trim();
  const notes = String(formData.get("notes") || "").trim();

  if (!serviceType || !nextServiceAt) {
    return;
  }

  await prisma.maintenanceSchedule.create({
    data: {
      assetId: assetId || null,
      serviceType,
      nextServiceAt: new Date(nextServiceAt),
      status: status as "UPCOMING" | "IN_PROGRESS" | "COMPLETED" | "OVERDUE",
      notes: notes || null
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "MaintenanceSchedule", entityId: serviceType }
  });

  revalidatePath("/maintenance");
}

export default async function MaintenancePage() {
  const schedules = await prisma.maintenanceSchedule.findMany({ orderBy: { nextServiceAt: "asc" } });
  const assets = await prisma.asset.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="space-y-6">
      <Card title="Maintenance planning" description="Plan preventative maintenance and service windows.">
        <form action={createMaintenanceSchedule} className="grid gap-3 md:grid-cols-2">
          <input name="serviceType" placeholder="Service type" className="rounded-md border border-slate-200 p-2" required />
          <select name="assetId" className="rounded-md border border-slate-200 p-2">
            <option value="">Select asset</option>
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>{asset.name}</option>
            ))}
          </select>
          <input name="nextServiceAt" type="date" className="rounded-md border border-slate-200 p-2" required />
          <select name="status" className="rounded-md border border-slate-200 p-2">
            <option value="UPCOMING">Upcoming</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="OVERDUE">Overdue</option>
          </select>
          <textarea name="notes" placeholder="Notes" className="rounded-md border border-slate-200 p-2 md:col-span-2" rows={2} />
          <Button type="submit" className="md:col-span-2">Schedule maintenance</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Maintenance schedules</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {schedules.map((schedule) => (
            <li key={schedule.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{schedule.serviceType}</p>
                <p className="text-slate-500">Next service: {schedule.nextServiceAt.toDateString()}</p>
                <p className="text-xs text-slate-400">Status: {schedule.status.replace("_", " ")}</p>
              </div>
              <Link href={`/maintenance/${schedule.id}`} className="text-xs font-semibold text-blue-700">View</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
