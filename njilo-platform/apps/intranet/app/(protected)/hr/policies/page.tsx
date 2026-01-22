import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createPolicyAck(formData: FormData) {
  "use server";
  const policy = String(formData.get("policy") || "").trim();
  const employee = String(formData.get("employee") || "").trim();
  const owner = String(formData.get("owner") || "").trim();
  const summary = String(formData.get("summary") || "").trim();

  if (!policy || !employee || !owner) {
    return;
  }

  await prisma.workflowItem.create({
    data: {
      area: "HR_POLICIES",
      title: `${policy} · ${employee}`,
      owner,
      status: "Pending acknowledgement",
      details: summary || "Policy distribution in progress."
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "PolicyAck", entityId: policy }
  });

  revalidatePath("/hr/policies");
}

async function updatePolicyStatus(formData: FormData) {
  "use server";
  const recordId = String(formData.get("recordId") || "").trim();
  const status = String(formData.get("status") || "").trim();

  if (!recordId || !status) {
    return;
  }

  await prisma.workflowItem.update({
    where: { id: recordId },
    data: { status }
  });

  await prisma.auditLog.create({
    data: { action: "UPDATE", entity: "PolicyAck", entityId: recordId }
  });

  revalidatePath("/hr/policies");
}

export default async function PoliciesPage() {
  const policies = await prisma.workflowItem.findMany({
    where: { area: "HR_POLICIES" },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <Card title="Policy acknowledgements" description="Distribute policy updates and capture confirmations.">
        <form action={createPolicyAck} className="grid gap-3 md:grid-cols-2">
          <input name="policy" placeholder="Policy name" className="rounded-md border border-slate-200 p-2" required />
          <input name="employee" placeholder="Employee name" className="rounded-md border border-slate-200 p-2" required />
          <input name="owner" placeholder="Policy owner" className="rounded-md border border-slate-200 p-2" required />
          <input name="summary" placeholder="Summary or link" className="rounded-md border border-slate-200 p-2 md:col-span-2" />
          <Button type="submit" className="md:col-span-2">Record distribution</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Policy register</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {policies.map((policy) => (
            <li key={policy.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{policy.title}</p>
                  <p className="text-xs text-slate-500">Owner: {policy.owner}</p>
                  <p className="mt-1 text-sm text-slate-600">{policy.details}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  {policy.status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <form action={updatePolicyStatus}>
                  <input type="hidden" name="recordId" value={policy.id} />
                  <input type="hidden" name="status" value="Acknowledged" />
                  <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">Mark acknowledged</Button>
                </form>
                <form action={updatePolicyStatus}>
                  <input type="hidden" name="recordId" value={policy.id} />
                  <input type="hidden" name="status" value="Follow-up required" />
                  <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">Needs follow-up</Button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
