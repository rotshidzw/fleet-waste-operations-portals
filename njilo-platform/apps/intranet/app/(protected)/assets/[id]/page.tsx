import Link from "next/link";
import { prisma } from "@njilo/db";
import { Card } from "@njilo/ui";

export default async function AssetDetailPage({ params }: { params: { id: string } }) {
  const asset = await prisma.asset.findUnique({ where: { id: params.id } });

  if (!asset) {
    return <Card title="Asset not found" description="No asset record found." />;
  }

  return (
    <div className="space-y-6">
      <Card title={asset.name} description={asset.assetTag}>
        <div className="space-y-2 text-sm text-slate-600">
          <p><span className="font-semibold text-slate-900">Type:</span> {asset.type}</p>
          <p><span className="font-semibold text-slate-900">Status:</span> {asset.status.replace("_", " ")}</p>
          <p><span className="font-semibold text-slate-900">Tracking ID:</span> {asset.trackingId || "Not assigned"}</p>
          <p><span className="font-semibold text-slate-900">Service interval:</span> {asset.serviceIntervalDays ? `${asset.serviceIntervalDays} days` : "Not set"}</p>
        </div>
      </Card>
      <Link href="/assets" className="text-sm font-semibold text-blue-700">← Back to assets</Link>
    </div>
  );
}
