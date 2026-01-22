import Link from "next/link";
import { prisma } from "@njilo/db";
import { Card } from "@njilo/ui";

export default async function HelpdeskDetailPage({ params }: { params: { id: string } }) {
  const ticket = await prisma.helpdeskTicket.findUnique({ where: { id: params.id } });

  if (!ticket) {
    return <Card title="Ticket not found" description="No helpdesk ticket found." />;
  }

  return (
    <div className="space-y-6">
      <Card title={ticket.subject} description={ticket.category}>
        <div className="space-y-2 text-sm text-slate-600">
          <p><span className="font-semibold text-slate-900">Priority:</span> {ticket.priority}</p>
          <p><span className="font-semibold text-slate-900">Status:</span> {ticket.status.replace("_", " ")}</p>
          <p><span className="font-semibold text-slate-900">Requester:</span> {ticket.requester}</p>
          <p><span className="font-semibold text-slate-900">Assigned to:</span> {ticket.assignedTo || "Unassigned"}</p>
          <p><span className="font-semibold text-slate-900">Details:</span> {ticket.details || "No details provided"}</p>
        </div>
      </Card>
      <Link href="/helpdesk" className="text-sm font-semibold text-blue-700">← Back to helpdesk</Link>
    </div>
  );
}
