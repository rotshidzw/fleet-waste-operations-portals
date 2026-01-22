import Link from "next/link";
import { prisma } from "@njilo/db";
import { Card } from "@njilo/ui";

export default async function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = await prisma.client.findUnique({
    where: { id: params.id },
    include: { contracts: true }
  });

  if (!client) {
    return <Card title="Client not found" description="No client record found." />;
  }

  return (
    <div className="space-y-6">
      <Card title={client.name} description={`Status: ${client.status.replace("_", " ")}`}>
        <div className="space-y-2 text-sm text-slate-600">
          <p><span className="font-semibold text-slate-900">Service scope:</span> {client.serviceScope || "Not set"}</p>
          <p><span className="font-semibold text-slate-900">Contract dates:</span> {client.contractStart?.toDateString() || "TBD"} → {client.contractEnd?.toDateString() || "TBD"}</p>
          <p><span className="font-semibold text-slate-900">Contracts:</span> {client.contracts.length}</p>
        </div>
      </Card>
      <Link href="/clients" className="text-sm font-semibold text-blue-700">← Back to clients</Link>
    </div>
  );
}
