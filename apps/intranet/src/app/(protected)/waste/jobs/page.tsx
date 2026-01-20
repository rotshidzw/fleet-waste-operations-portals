import { prisma } from "@njilo/db";

export default async function WasteJobsPage() {
  const jobs = await prisma.wasteJob.findMany({ orderBy: { jobDate: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Waste Jobs / Pickups</h1>
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-4 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>Client</span>
          <span>Location</span>
          <span>Date</span>
          <span>Status</span>
        </div>
        {jobs.map((job) => (
          <div key={job.id} className="grid grid-cols-4 gap-4 border-b border-slate-100 px-4 py-3 text-sm">
            <span>{job.client}</span>
            <span>{job.location}</span>
            <span>{job.jobDate.toDateString()}</span>
            <span>{job.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
