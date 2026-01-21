import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createAccessRequest(formData: FormData) {
  "use server";
  const requester = String(formData.get("requester") || "").trim();
  const system = String(formData.get("system") || "").trim();
  const level = String(formData.get("level") || "Standard").trim();
  const approver = String(formData.get("approver") || "").trim();

  if (!requester || !system || !approver) {
    return;
  }

  await prisma.workflowItem.create({
    data: {
      area: "ADMIN_ACCESS",
      title: `${requester} · ${system}`,
      owner: approver,
      status: "Pending approval",
      details: `Access level: ${level}.`
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "AccessRequest", entityId: requester }
  });

  revalidatePath("/admin/access-requests");
}

async function updateAccessStatus(formData: FormData) {
  "use server";
  const requestId = String(formData.get("requestId") || "").trim();
  const status = String(formData.get("status") || "").trim();

  if (!requestId || !status) {
    return;
  }

  await prisma.workflowItem.update({
    where: { id: requestId },
    data: { status }
  });

  await prisma.auditLog.create({
    data: { action: "UPDATE", entity: "AccessRequest", entityId: requestId }
  });

  revalidatePath("/admin/access-requests");
}

export default async function AccessRequestsPage() {
  const requests = await prisma.workflowItem.findMany({
    where: { area: "ADMIN_ACCESS" },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <Card title="Access requests" description="Approve system access and role changes.">
        <form action={createAccessRequest} className="grid gap-3 md:grid-cols-2">
          <input name="requester" placeholder="Requester" className="rounded-md border border-slate-200 p-2" required />
          <input name="system" placeholder="System / app" className="rounded-md border border-slate-200 p-2" required />
          <select name="level" className="rounded-md border border-slate-200 p-2">
            <option value="Standard">Standard access</option>
            <option value="Elevated">Elevated access</option>
            <option value="Admin">Admin access</option>
          </select>
          <input name="approver" placeholder="Approver" className="rounded-md border border-slate-200 p-2" required />
          <Button type="submit" className="md:col-span-2">Submit request</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Pending approvals</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {requests.map((request) => (
            <li key={request.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{request.title}</p>
                  <p className="text-xs text-slate-500">Approver: {request.owner}</p>
                  <p className="mt-1 text-sm text-slate-600">{request.details}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  {request.status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <form action={updateAccessStatus}>
                  <input type="hidden" name="requestId" value={request.id} />
                  <input type="hidden" name="status" value="Approved" />
                  <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">Approve</Button>
                </form>
                <form action={updateAccessStatus}>
                  <input type="hidden" name="requestId" value={request.id} />
                  <input type="hidden" name="status" value="Declined" />
                  <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">Decline</Button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
