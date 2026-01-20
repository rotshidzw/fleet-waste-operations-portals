import { prisma } from "@njilo/db";

export default async function EventsAdminPage() {
  const events = await prisma.event.findMany({ orderBy: { date: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Company Events</h1>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-xs text-slate-500">{event.date.toDateString()}</p>
            <p className="text-sm font-semibold">{event.title}</p>
            <p className="mt-2 text-sm text-slate-600">{event.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
