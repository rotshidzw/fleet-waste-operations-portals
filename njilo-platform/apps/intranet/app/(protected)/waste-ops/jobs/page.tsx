import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createJob(formData: FormData) {
  "use server";
  const jobNumber = String(formData.get("jobNumber") || "").trim();
  const site = String(formData.get("site") || "").trim();
  const status = String(formData.get("status") || "Scheduled").trim();
  const scheduledAt = String(formData.get("scheduledAt") || "").trim();

  if (!jobNumber || !site || !scheduledAt) {
    return;
  }

  const scheduledDate = new Date(scheduledAt);
  if (Number.isNaN(scheduledDate.getTime())) {
    return;
  }

  await prisma.wasteJob.create({
    data: { jobNumber, site, status, scheduledAt: scheduledDate }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "WasteJob", entityId: jobNumber }
  });

  revalidatePath("/waste-ops/jobs");
  revalidatePath("/dashboard");
}

async function deleteJob(formData: FormData) {
  "use server";
  const jobId = String(formData.get("jobId") || "").trim();
  if (!jobId) return;

  await prisma.wasteJob.delete({ where: { id: jobId } });
  await prisma.auditLog.create({
    data: { action: "DELETE", entity: "WasteJob", entityId: jobId }
  });

  revalidatePath("/waste-ops/jobs");
  revalidatePath("/dashboard");
}

export default async function WasteJobsPage() {
  const jobs = await prisma.wasteJob.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Log job" description="Schedule a waste pickup or service call.">
        <form action={createJob} className="grid gap-3 md:grid-cols-2">
          <input name="jobNumber" placeholder="Job number" className="rounded-md border border-slate-200 p-2" required />
          <input name="site" placeholder="Site / client" className="rounded-md border border-slate-200 p-2" required />
          <select name="status" className="rounded-md border border-slate-200 p-2">
            <option value="Scheduled">Scheduled</option>
            <option value="En route">En route</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
          <input name="scheduledAt" type="datetime-local" className="rounded-md border border-slate-200 p-2" required />
          <Button type="submit" className="md:col-span-2">Save job</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Jobs</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {jobs.map((job) => (
            <li key={job.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{job.jobNumber}</p>
                <p className="text-slate-500">{job.site} · {job.status}</p>
                <p className="text-xs text-slate-400">Scheduled: {job.scheduledAt.toLocaleString()}</p>
              </div>
              <form action={deleteJob}>
                <input type="hidden" name="jobId" value={job.id} />
                <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">
                  Delete
                </Button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
