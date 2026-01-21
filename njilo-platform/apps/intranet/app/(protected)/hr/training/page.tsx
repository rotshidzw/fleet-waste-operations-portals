import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createTrainingPlan(formData: FormData) {
  "use server";
  const employee = String(formData.get("employee") || "").trim();
  const course = String(formData.get("course") || "").trim();
  const provider = String(formData.get("provider") || "").trim();
  const dueDate = String(formData.get("dueDate") || "").trim();
  const status = String(formData.get("status") || "Enrolled").trim();

  if (!employee || !course || !provider) {
    return;
  }

  await prisma.workflowItem.create({
    data: {
      area: "HR_TRAINING",
      title: `${course} · ${employee}`,
      owner: provider,
      status,
      details: `Provider: ${provider}.`,
      dueDate: dueDate ? new Date(dueDate) : null
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "TrainingPlan", entityId: course }
  });

  revalidatePath("/hr/training");
}

async function updateTrainingStatus(formData: FormData) {
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
    data: { action: "UPDATE", entity: "TrainingPlan", entityId: planId }
  });

  revalidatePath("/hr/training");
}

export default async function TrainingPage() {
  const plans = await prisma.workflowItem.findMany({
    where: { area: "HR_TRAINING" },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <Card title="Training plans" description="Assign certifications and track completion.">
        <form action={createTrainingPlan} className="grid gap-3 md:grid-cols-2">
          <input name="employee" placeholder="Employee name" className="rounded-md border border-slate-200 p-2" required />
          <input name="course" placeholder="Course or certification" className="rounded-md border border-slate-200 p-2" required />
          <input name="provider" placeholder="Training provider" className="rounded-md border border-slate-200 p-2" required />
          <input name="dueDate" type="date" className="rounded-md border border-slate-200 p-2" />
          <select name="status" className="rounded-md border border-slate-200 p-2 md:col-span-2">
            <option value="Enrolled">Enrolled</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
          <Button type="submit" className="md:col-span-2">Assign training</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Active training roster</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {plans.map((plan) => (
            <li key={plan.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{plan.title}</p>
                  <p className="text-xs text-slate-500">Provider: {plan.owner}</p>
                  <p className="mt-1 text-sm text-slate-600">{plan.details}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  {plan.status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <form action={updateTrainingStatus}>
                  <input type="hidden" name="planId" value={plan.id} />
                  <input type="hidden" name="status" value="Completed" />
                  <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">Mark complete</Button>
                </form>
                <form action={updateTrainingStatus}>
                  <input type="hidden" name="planId" value={plan.id} />
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
