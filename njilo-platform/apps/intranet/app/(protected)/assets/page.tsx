import Link from "next/link";
import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createAsset(formData: FormData) {
  "use server";
  const assetTag = String(formData.get("assetTag") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const type = String(formData.get("type") || "VEHICLE").trim();
  const trackingId = String(formData.get("trackingId") || "").trim();
  const serviceIntervalDays = Number(formData.get("serviceIntervalDays") || 0);
  const status = String(formData.get("status") || "ACTIVE").trim();

  if (!assetTag || !name) {
    return;
  }

  await prisma.asset.create({
    data: {
      assetTag,
      name,
      type: type as "VEHICLE" | "PLANT" | "EQUIPMENT",
      trackingId: trackingId || null,
      serviceIntervalDays: serviceIntervalDays || null,
      status: status as "ACTIVE" | "IN_MAINTENANCE" | "DECOMMISSIONED"
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Asset", entityId: assetTag }
  });

  revalidatePath("/assets");
}

export default async function AssetsPage() {
  const assets = await prisma.asset.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Fleet & asset register" description="Track vehicles, plant, and equipment availability.">
        <form action={createAsset} className="grid gap-3 md:grid-cols-2">
          <input name="assetTag" placeholder="Asset tag" className="rounded-md border border-slate-200 p-2" required />
          <input name="name" placeholder="Asset name" className="rounded-md border border-slate-200 p-2" required />
          <select name="type" className="rounded-md border border-slate-200 p-2">
            <option value="VEHICLE">Vehicle</option>
            <option value="PLANT">Plant</option>
            <option value="EQUIPMENT">Equipment</option>
          </select>
          <select name="status" className="rounded-md border border-slate-200 p-2">
            <option value="ACTIVE">Active</option>
            <option value="IN_MAINTENANCE">In maintenance</option>
            <option value="DECOMMISSIONED">Decommissioned</option>
          </select>
          <input name="trackingId" placeholder="Tracking device ID" className="rounded-md border border-slate-200 p-2" />
          <input name="serviceIntervalDays" type="number" placeholder="Service interval (days)" className="rounded-md border border-slate-200 p-2" />
          <Button type="submit" className="md:col-span-2">Register asset</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Assets</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {assets.map((asset) => (
            <li key={asset.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{asset.name}</p>
                <p className="text-slate-500">{asset.assetTag} · {asset.type}</p>
                <p className="text-xs text-slate-400">Status: {asset.status.replace("_", " ")}</p>
              </div>
              <Link href={`/assets/${asset.id}`} className="text-xs font-semibold text-blue-700">View</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
