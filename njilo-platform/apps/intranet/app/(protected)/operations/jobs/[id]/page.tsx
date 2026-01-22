import Link from "next/link";
import { prisma } from "@njilo/db";
import { Card } from "@njilo/ui";

export default async function WorkOrderDetailPage({ params }: { params: { id: string } }) {
  const order = await prisma.workOrder.findUnique({ where: { id: params.id } });

  if (!order) {
    return <Card title="Work order not found" description="No work order record found." />;
  }

  return (
    <div className="space-y-6">
      <Card title={order.jobNumber} description={order.client}>
        <div className="space-y-2 text-sm text-slate-600">
          <p><span className="font-semibold text-slate-900">Location:</span> {order.location}</p>
          <p><span className="font-semibold text-slate-900">Assigned asset:</span> {order.assignedAsset || "Pending"}</p>
          <p><span className="font-semibold text-slate-900">Assigned team:</span> {order.assignedTeam || "Pending"}</p>
          <p><span className="font-semibold text-slate-900">Status:</span> {order.status.replace("_", " ")}</p>
          <p><span className="font-semibold text-slate-900">Scheduled:</span> {order.scheduledFor?.toLocaleString() || "Not scheduled"}</p>
        </div>
      </Card>
      <Link href="/operations/jobs" className="text-sm font-semibold text-blue-700">← Back to work orders</Link>
    </div>
  );
}
