import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createBudgetRequest(formData: FormData) {
  "use server";
  const department = String(formData.get("department") || "").trim();
  const requester = String(formData.get("requester") || "").trim();
  const amount = Number(formData.get("amount") || 0);
  const summary = String(formData.get("summary") || "").trim();

  if (!department || !requester || !amount) {
    return;
  }

  await prisma.workflowItem.create({
    data: {
      area: "ADMIN_BUDGET",
      title: `${department} · R${amount.toLocaleString()}`,
      owner: requester,
      status: "Pending finance approval",
      details: summary || "Budget request pending details."
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "BudgetApproval", entityId: department }
  });

  revalidatePath("/admin/budget-approvals");
}

async function updateBudgetStatus(formData: FormData) {
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
    data: { action: "UPDATE", entity: "BudgetApproval", entityId: requestId }
  });

  revalidatePath("/admin/budget-approvals");
}

export default async function BudgetApprovalsPage() {
  const requests = await prisma.workflowItem.findMany({
    where: { area: "ADMIN_BUDGET" },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <Card title="Budget approvals" description="Route operational budgets for approval.">
        <form action={createBudgetRequest} className="grid gap-3 md:grid-cols-2">
          <input name="department" placeholder="Department" className="rounded-md border border-slate-200 p-2" required />
          <input name="requester" placeholder="Requester" className="rounded-md border border-slate-200 p-2" required />
          <input name="amount" type="number" placeholder="Amount (ZAR)" className="rounded-md border border-slate-200 p-2" required />
          <input name="summary" placeholder="Purpose and impact" className="rounded-md border border-slate-200 p-2 md:col-span-2" />
          <Button type="submit" className="md:col-span-2">Submit budget</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Approval queue</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {requests.map((request) => (
            <li key={request.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{request.title}</p>
                  <p className="text-xs text-slate-500">Requester: {request.owner}</p>
                  <p className="mt-1 text-sm text-slate-600">{request.details}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  {request.status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <form action={updateBudgetStatus}>
                  <input type="hidden" name="requestId" value={request.id} />
                  <input type="hidden" name="status" value="Approved" />
                  <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">Approve</Button>
                </form>
                <form action={updateBudgetStatus}>
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
