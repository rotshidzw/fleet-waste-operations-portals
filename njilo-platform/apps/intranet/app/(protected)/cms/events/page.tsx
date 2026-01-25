import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createEvent(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "");
  const summary = String(formData.get("summary") || "");
  const eventDate = String(formData.get("eventDate") || "");

  await prisma.event.create({
    data: { title, summary, eventDate: new Date(eventDate) }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Event", entityId: title }
  });

  revalidatePath("/cms/events");
  revalidatePath("/media/company-events");
}

export default async function EventsPage() {
  const events = await prisma.event.findMany({ orderBy: { eventDate: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Add event" description="Track company and partner events.">
        <form action={createEvent} className="grid gap-3">
          <input name="title" placeholder="Title" className="rounded-md border border-slate-200 p-2" required />
          <input name="summary" placeholder="Summary" className="rounded-md border border-slate-200 p-2" required />
          <input name="eventDate" type="date" className="rounded-md border border-slate-200 p-2" required />
          <Button type="submit">Save event</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Events</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {events.map((event) => (
            <li key={event.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{event.title}</p>
              <p className="text-slate-500">{event.summary} · {event.eventDate.toDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
