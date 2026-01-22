import Link from "next/link";
import { prisma } from "@njilo/db";
import { Card } from "@njilo/ui";

export default async function ComplianceDetailPage({ params }: { params: { id: string } }) {
  const record = await prisma.complianceRecord.findUnique({ where: { id: params.id } });

  if (!record) {
    return <Card title="Compliance record not found" description="No compliance record found." />;
  }

  return (
    <div className="space-y-6">
      <Card title={record.reference} description={record.type.replace("_", " ")}>
        <div className="space-y-2 text-sm text-slate-600">
          <p><span className="font-semibold text-slate-900">Status:</span> {record.status}</p>
          <p><span className="font-semibold text-slate-900">Owner:</span> {record.owner}</p>
          <p><span className="font-semibold text-slate-900">Expires:</span> {record.expiresAt?.toDateString() || "Not scheduled"}</p>
          <p><span className="font-semibold text-slate-900">Notes:</span> {record.notes || "None"}</p>
        </div>
      </Card>
      <Link href="/compliance" className="text-sm font-semibold text-blue-700">← Back to compliance</Link>
    </div>
  );
}
