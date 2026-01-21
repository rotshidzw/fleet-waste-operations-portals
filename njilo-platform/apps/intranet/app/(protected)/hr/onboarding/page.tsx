import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createOnboardingPlan(formData: FormData) {
  "use server";
  const employee = String(formData.get("employee") || "").trim();
  const manager = String(formData.get("manager") || "").trim();
  const startDate = String(formData.get("startDate") || "").trim();
  const equipment = String(formData.get("equipment") || "In progress").trim();
  const accounts = String(formData.get("accounts") || "In progress").trim();

  if (!employee || !manager || !startDate) {
    return;
  }

  await prisma.workflowItem.create({
    data: {
      area: "HR_ONBOARDING",
      title: `${employee} onboarding`,
      owner: manager,
      status: "In progress",
      details: `Start date: ${startDate}. Equipment: ${equipment}. Accounts: ${accounts}.`,
      dueDate: new Date(startDate)
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Onboarding", entityId: employee }
  });

  revalidatePath("/hr/onboarding");
}

async function updateOnboardingStatus(formData: FormData) {
  "use server";
  const planId = String(formData.get("planId") || "").trim();
  const status = String(formData.get("status") || "").trim();

  if (!planId || !status) {
    return;
  }

  await prisma.workflowItem.update({
    where: { id: planId },
    data: { status }
  });

  await prisma.auditLog.create({
    data: { action: "UPDATE", entity: "Onboarding", entityId: planId }
  });

  revalidatePath("/hr/onboarding");
}

export default async function OnboardingPage() {
  const plans = await prisma.workflowItem.findMany({
    where: { area: "HR_ONBOARDING" },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <Card title="Onboarding tracker" description="Plan new hire readiness and access provisioning.">
        <form action={createOnboardingPlan} className="grid gap-3 md:grid-cols-2">
          <input name="employee" placeholder="New hire name" className="rounded-md border border-slate-200 p-2" required />
          <input name="manager" placeholder="Hiring manager" className="rounded-md border border-slate-200 p-2" required />
          <input name="startDate" type="date" className="rounded-md border border-slate-200 p-2" required />
          <select name="equipment" className="rounded-md border border-slate-200 p-2">
            <option value="In progress">Equipment in progress</option>
            <option value="Ready">Equipment ready</option>
            <option value="Needs attention">Needs attention</option>
          </select>
          <select name="accounts" className="rounded-md border border-slate-200 p-2">
            <option value="In progress">Accounts in progress</option>
            <option value="Ready">Accounts ready</option>
            <option value="Needs attention">Needs attention</option>
          </select>
          <Button type="submit" className="md:col-span-2">Create plan</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Active onboarding plans</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {plans.map((plan) => (
            <li key={plan.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{plan.title}</p>
                  <p className="text-xs text-slate-500">Owner: {plan.owner}</p>
                  <p className="mt-1 text-sm text-slate-600">{plan.details}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  {plan.status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <form action={updateOnboardingStatus}>
                  <input type="hidden" name="planId" value={plan.id} />
                  <input type="hidden" name="status" value="Completed" />
                  <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">Mark complete</Button>
                </form>
                <form action={updateOnboardingStatus}>
                  <input type="hidden" name="planId" value={plan.id} />
                  <input type="hidden" name="status" value="Needs follow-up" />
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
