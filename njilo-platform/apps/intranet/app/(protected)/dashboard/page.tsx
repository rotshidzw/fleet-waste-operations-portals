import { prisma } from "@njilo/db";
import { Card, Button } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createTodo(formData: FormData) {
  "use server";
  const note = String(formData.get("note") || "");
  const owner = String(formData.get("owner") || "");

  await prisma.activity.create({
    data: { note: `TODO: ${note} · Owner: ${owner}` }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Todo", entityId: note.slice(0, 24) }
  });

  revalidatePath("/dashboard");
}

async function createMeeting(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "");
  const summary = String(formData.get("summary") || "");
  const eventDate = String(formData.get("eventDate") || "");

  await prisma.event.create({
    data: { title, summary, eventDate: new Date(eventDate) }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Meeting", entityId: title }
  });

  revalidatePath("/dashboard");
  revalidatePath("/cms/events");
}

export default async function DashboardPage() {
  const leadCount = await prisma.lead.count();
  const vehicleCount = await prisma.vehicle.count();
  const wasteJobs = await prisma.wasteJob.count();
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 });
  const todos = await prisma.activity.findMany({ orderBy: { createdAt: "desc" }, take: 6 });
  const events = await prisma.event.findMany({ orderBy: { eventDate: "asc" }, take: 4 });
  const auditLogs = await prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 6 });

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Active Leads" description={`${leadCount} total leads`} />
        <Card title="Fleet Assets" description={`${vehicleCount} vehicles monitored`} />
        <Card title="Waste Jobs" description={`${wasteJobs} scheduled jobs`} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Latest leads</h2>
          <div className="mt-4 space-y-3">
            {leads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm">
                <div>
                  <p className="font-semibold text-slate-900">{lead.fullName}</p>
                  <p className="text-slate-500">{lead.email}</p>
                </div>
                <span className="text-xs uppercase text-slate-400">{lead.department}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Activity feed</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            {auditLogs.map((log) => (
              <li key={log.id} className="border-b border-slate-100 pb-3">
                <p className="font-semibold text-slate-900">{log.action} · {log.entity}</p>
                <p className="text-slate-500">{log.entityId ?? "-"} · {log.createdAt.toDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Team to-do list" description="Assign tasks and capture completion updates.">
          <form action={createTodo} className="grid gap-3 md:grid-cols-2">
            <input name="note" placeholder="Task summary" className="rounded-md border border-slate-200 p-2" required />
            <input name="owner" placeholder="Owner" className="rounded-md border border-slate-200 p-2" required />
            <Button type="submit" className="md:col-span-2">Add task</Button>
          </form>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {todos.map((todo) => (
              <li key={todo.id} className="rounded-md border border-slate-100 bg-slate-50 p-2">
                {todo.note}
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Team calendar" description="Plan meetings and track availability.">
          <form action={createMeeting} className="grid gap-3 md:grid-cols-2">
            <input name="title" placeholder="Meeting title" className="rounded-md border border-slate-200 p-2" required />
            <input name="eventDate" type="date" className="rounded-md border border-slate-200 p-2" required />
            <input name="summary" placeholder="Agenda / attendees" className="rounded-md border border-slate-200 p-2 md:col-span-2" />
            <Button type="submit" className="md:col-span-2">Schedule meeting</Button>
          </form>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {events.map((event) => (
              <li key={event.id} className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 p-2">
                <span className="font-semibold text-slate-900">{event.title}</span>
                <span className="text-xs text-slate-500">{event.eventDate.toDateString()}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
