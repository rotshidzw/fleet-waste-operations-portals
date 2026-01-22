import Link from "next/link";
import { prisma } from "@njilo/db";
import { Card } from "@njilo/ui";

export default async function FineDetailPage({ params }: { params: { id: string } }) {
  const fine = await prisma.trafficFine.findUnique({
    where: { id: params.id },
    include: { vehicle: true }
  });

  if (!fine) {
    return <Card title="Fine not found" description="No traffic fine record found." />;
  }

  return (
    <div className="space-y-6">
      <Card title={`Fine for ${fine.vehicle.make} ${fine.vehicle.model}`} description={fine.status}>
        <div className="space-y-2 text-sm text-slate-600">
          <p><span className="font-semibold text-slate-900">Amount:</span> R{fine.amount.toFixed(2)}</p>
          <p><span className="font-semibold text-slate-900">Issued:</span> {fine.issuedAt.toDateString()}</p>
          <p><span className="font-semibold text-slate-900">Vehicle:</span> {fine.vehicle.vin}</p>
        </div>
      </Card>
      <Link href="/compliance/fines" className="text-sm font-semibold text-blue-700">← Back to fines</Link>
    </div>
  );
}
