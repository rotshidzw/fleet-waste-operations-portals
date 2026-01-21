import { prisma } from "@njilo/db";

export default async function ApplicationsPage() {
  const applications = await prisma.application.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Applications</h1>
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-4 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>Name</span>
          <span>Email</span>
          <span>Stage</span>
          <span>Vacancy</span>
        </div>
        {applications.map((application) => (
          <div key={application.id} className="grid grid-cols-4 gap-4 border-b border-slate-100 px-4 py-3 text-sm">
            <span>{application.name}</span>
            <span>{application.email}</span>
            <span>{application.stage}</span>
            <span>{application.vacancyId ?? "-"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
