import { prisma } from "@njilo/db";

export default async function ActivitiesPage() {
  const activities = await prisma.activity.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Activities</h1>
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-3 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>Type</span>
          <span>Notes</span>
          <span>Date</span>
        </div>
        {activities.map((activity) => (
          <div key={activity.id} className="grid grid-cols-3 gap-4 border-b border-slate-100 px-4 py-3 text-sm">
            <span>{activity.type}</span>
            <span className="text-slate-500">{activity.notes}</span>
            <span>{activity.createdAt.toDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
