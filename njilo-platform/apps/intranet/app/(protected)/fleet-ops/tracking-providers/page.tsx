import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createProvider(formData: FormData) {
  "use server";
  const providerName = String(formData.get("providerName") || "");
  const apiKey = String(formData.get("apiKey") || "");

  await prisma.trackingProvider.create({
    data: { providerName, apiKey }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "TrackingProvider", entityId: providerName }
  });

  revalidatePath("/fleet-ops/tracking-providers");
}

export default async function TrackingProvidersPage() {
  const providers = await prisma.trackingProvider.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Add tracking provider" description="Store telematics provider credentials.">
        <form action={createProvider} className="grid gap-3 md:grid-cols-2">
          <input name="providerName" placeholder="Provider name" className="rounded-md border border-slate-200 p-2" required />
          <input name="apiKey" placeholder="API key" className="rounded-md border border-slate-200 p-2" required />
          <Button type="submit" className="md:col-span-2">Save provider</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Tracking providers</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {providers.map((provider) => (
            <li key={provider.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{provider.providerName}</p>
              <p className="text-slate-500">Last sync: {provider.lastSyncAt ? provider.lastSyncAt.toDateString() : "Never"}</p>
            </li>
          ))}
        </ul>
      </div>

      <Card title="Live telemetry snapshot" description="Demo tracking view for insured assets.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-xs uppercase text-slate-500">Asset NJ-204</p>
            <p className="mt-2 text-sm text-slate-600">Speed: 62 km/h · Battery: 88%</p>
            <p className="text-sm text-slate-600">Location: Johannesburg CBD</p>
            <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
              <div className="h-2 w-3/4 rounded-full bg-blue-600" />
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-xs uppercase text-slate-500">Asset NJ-318</p>
            <p className="mt-2 text-sm text-slate-600">Speed: 45 km/h · Battery: 71%</p>
            <p className="text-sm text-slate-600">Location: Cape Town Foreshore</p>
            <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
              <div className="h-2 w-2/3 rounded-full bg-green-600" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
