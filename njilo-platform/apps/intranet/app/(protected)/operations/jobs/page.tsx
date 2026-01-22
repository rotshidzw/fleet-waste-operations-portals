import Link from "next/link";
import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createWorkOrder(formData: FormData) {
  "use server";
  const jobNumber = String(formData.get("jobNumber") || "").trim();
  const client = String(formData.get("client") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const assignedAsset = String(formData.get("assignedAsset") || "").trim();
  const assignedTeam = String(formData.get("assignedTeam") || "").trim();
  const status = String(formData.get("status") || "REQUESTED").trim();
  const scheduledFor = String(formData.get("scheduledFor") || "").trim();

  if (!jobNumber || !client || !location) {
    return;
  }

  await prisma.workOrder.create({
    data: {
      jobNumber,
      client,
      location,
      assignedAsset: assignedAsset || null,
      assignedTeam: assignedTeam || null,
      status: status as "REQUESTED" | "APPROVED" | "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CLOSED",
      scheduledFor: scheduledFor ? new Date(scheduledFor) : null
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "WorkOrder", entityId: jobNumber }
  });

  revalidatePath("/operations/jobs");
}

export default async function OperationsJobsPage() {
  const orders = await prisma.workOrder.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Work orders" description="Track daily operational jobs and approvals.">
        <form action={createWorkOrder} className="grid gap-3 md:grid-cols-2">
          <input name="jobNumber" placeholder="Job number" className="rounded-md border border-slate-200 p-2" required />
          <input name="client" placeholder="Client" className="rounded-md border border-slate-200 p-2" required />
          <input name="location" placeholder="Site / location" className="rounded-md border border-slate-200 p-2" required />
          <input name="assignedAsset" placeholder="Assigned asset" className="rounded-md border border-slate-200 p-2" />
          <input name="assignedTeam" placeholder="Assigned team" className="rounded-md border border-slate-200 p-2" />
          <select name="status" className="rounded-md border border-slate-200 p-2">
            <option value="REQUESTED">Requested</option>
            <option value="APPROVED">Approved</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CLOSED">Closed</option>
          </select>
          <input name="scheduledFor" type="datetime-local" className="rounded-md border border-slate-200 p-2" />
          <Button type="submit" className="md:col-span-2">Log work order</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Active work orders</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {orders.map((order) => (
            <li key={order.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{order.jobNumber}</p>
                <p className="text-slate-500">{order.client} · {order.location}</p>
                <p className="text-xs text-slate-400">Status: {order.status.replace("_", " ")}</p>
              </div>
              <Link href={`/operations/jobs/${order.id}`} className="text-xs font-semibold text-blue-700">View</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
