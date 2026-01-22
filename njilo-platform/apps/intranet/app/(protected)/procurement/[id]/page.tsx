import Link from "next/link";
import { prisma } from "@njilo/db";
import { Card } from "@njilo/ui";

export default async function ProcurementDetailPage({ params }: { params: { id: string } }) {
  const request = await prisma.procurementRequest.findUnique({ where: { id: params.id } });

  if (!request) {
    return <Card title="Request not found" description="No procurement request found." />;
  }

  return (
    <div className="space-y-6">
      <Card title={request.item} description={`Quantity: ${request.quantity}`}>
        <div className="space-y-2 text-sm text-slate-600">
          <p><span className="font-semibold text-slate-900">Department:</span> {request.department}</p>
          <p><span className="font-semibold text-slate-900">Requester:</span> {request.requester}</p>
          <p><span className="font-semibold text-slate-900">Status:</span> {request.status.replace("_", " ")}</p>
          <p><span className="font-semibold text-slate-900">Notes:</span> {request.notes || "No notes"}</p>
        </div>
      </Card>
      <Link href="/procurement" className="text-sm font-semibold text-blue-700">← Back to procurement</Link>
    </div>
  );
}
