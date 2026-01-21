import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";

async function createJob(formData: FormData) {
  "use server";
  const jobNumber = String(formData.get("jobNumber") || "");
  const site = String(formData.get("site") || "");

  await prisma.wasteJob.create({
    data: { jobNumber, site, status: "Scheduled", scheduledAt: new Date() }
  });
}

export default async function WasteJobsPage() {
  const jobs = await prisma.wasteJob.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Log job" description="Schedule a waste pickup or service call.">
        <form action={createJob} className="grid gap-3 md:grid-cols-2">
          <input name="jobNumber" placeholder="Job number" className="rounded-md border border-slate-200 p-2" required />
          <input name="site" placeholder="Site" className="rounded-md border border-slate-200 p-2" required />
          <Button type="submit" className="md:col-span-2">Save job</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Jobs</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {jobs.map((job) => (
            <li key={job.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{job.jobNumber}</p>
              <p className="text-slate-500">{job.site} · {job.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
