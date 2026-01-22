import Link from "next/link";
import { prisma } from "@njilo/db";
import { Card } from "@njilo/ui";

export default async function ContractDetailPage({ params }: { params: { id: string } }) {
  const contract = await prisma.contract.findUnique({
    where: { id: params.id },
    include: { client: true }
  });

  if (!contract) {
    return <Card title="Contract not found" description="No contract record found." />;
  }

  return (
    <div className="space-y-6">
      <Card title={contract.name} description={contract.client.name}>
        <div className="space-y-2 text-sm text-slate-600">
          <p><span className="font-semibold text-slate-900">Status:</span> {contract.status.replace("_", " ")}</p>
          <p><span className="font-semibold text-slate-900">Dates:</span> {contract.startDate.toDateString()} → {contract.endDate.toDateString()}</p>
          <p><span className="font-semibold text-slate-900">Document:</span> {contract.documentRef || "Not linked"}</p>
        </div>
      </Card>
      <Link href="/contracts" className="text-sm font-semibold text-blue-700">← Back to contracts</Link>
    </div>
  );
}
