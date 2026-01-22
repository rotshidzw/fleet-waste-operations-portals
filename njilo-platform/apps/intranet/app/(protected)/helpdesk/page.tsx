import Link from "next/link";
import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createTicket(formData: FormData) {
  "use server";
  const subject = String(formData.get("subject") || "").trim();
  const category = String(formData.get("category") || "IT").trim();
  const priority = String(formData.get("priority") || "MEDIUM").trim();
  const status = String(formData.get("status") || "OPEN").trim();
  const requester = String(formData.get("requester") || "").trim();
  const assignedTo = String(formData.get("assignedTo") || "").trim();
  const details = String(formData.get("details") || "").trim();

  if (!subject || !requester) {
    return;
  }

  await prisma.helpdeskTicket.create({
    data: {
      subject,
      category,
      priority: priority as "LOW" | "MEDIUM" | "HIGH",
      status: status as "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED",
      requester,
      assignedTo: assignedTo || null,
      details: details || null
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "HelpdeskTicket", entityId: subject }
  });

  revalidatePath("/helpdesk");
}

export default async function HelpdeskPage() {
  const tickets = await prisma.helpdeskTicket.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Helpdesk" description="Track internal requests and SLA priorities.">
        <form action={createTicket} className="grid gap-3 md:grid-cols-2">
          <input name="subject" placeholder="Issue summary" className="rounded-md border border-slate-200 p-2" required />
          <input name="requester" placeholder="Requester" className="rounded-md border border-slate-200 p-2" required />
          <select name="category" className="rounded-md border border-slate-200 p-2">
            <option value="IT">IT</option>
            <option value="Access">Access</option>
            <option value="Devices">Devices</option>
          </select>
          <select name="priority" className="rounded-md border border-slate-200 p-2">
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          <input name="assignedTo" placeholder="Assigned to" className="rounded-md border border-slate-200 p-2" />
          <select name="status" className="rounded-md border border-slate-200 p-2">
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
          <textarea name="details" placeholder="Details" className="rounded-md border border-slate-200 p-2 md:col-span-2" rows={3} />
          <Button type="submit" className="md:col-span-2">Submit ticket</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Open tickets</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{ticket.subject}</p>
                <p className="text-slate-500">{ticket.category} · {ticket.priority}</p>
                <p className="text-xs text-slate-400">Requester: {ticket.requester}</p>
              </div>
              <Link href={`/helpdesk/${ticket.id}`} className="text-xs font-semibold text-blue-700">View</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
