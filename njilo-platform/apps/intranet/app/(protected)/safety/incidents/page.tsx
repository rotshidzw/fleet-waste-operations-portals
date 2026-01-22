import Link from "next/link";
import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createIncident(formData: FormData) {
  "use server";
  const incidentType = String(formData.get("incidentType") || "").trim();
  const severity = String(formData.get("severity") || "MEDIUM").trim();
  const location = String(formData.get("location") || "").trim();
  const reportedBy = String(formData.get("reportedBy") || "").trim();
  const rootCause = String(formData.get("rootCause") || "").trim();
  const correctiveAction = String(formData.get("correctiveAction") || "").trim();
  const status = String(formData.get("status") || "Open").trim();

  if (!incidentType || !location || !reportedBy) {
    return;
  }

  await prisma.incident.create({
    data: {
      incidentType,
      severity: severity as "LOW" | "MEDIUM" | "HIGH",
      location,
      reportedBy,
      rootCause: rootCause || null,
      correctiveAction: correctiveAction || null,
      status
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Incident", entityId: incidentType }
  });

  revalidatePath("/safety/incidents");
}

export default async function IncidentsPage() {
  const incidents = await prisma.incident.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Incident reporting" description="Capture safety incidents and corrective actions.">
        <form action={createIncident} className="grid gap-3 md:grid-cols-2">
          <input name="incidentType" placeholder="Incident type" className="rounded-md border border-slate-200 p-2" required />
          <input name="location" placeholder="Location" className="rounded-md border border-slate-200 p-2" required />
          <input name="reportedBy" placeholder="Reported by" className="rounded-md border border-slate-200 p-2" required />
          <select name="severity" className="rounded-md border border-slate-200 p-2">
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          <input name="status" placeholder="Status" className="rounded-md border border-slate-200 p-2" />
          <textarea name="rootCause" placeholder="Root cause" className="rounded-md border border-slate-200 p-2 md:col-span-2" rows={2} />
          <textarea name="correctiveAction" placeholder="Corrective action" className="rounded-md border border-slate-200 p-2 md:col-span-2" rows={2} />
          <Button type="submit" className="md:col-span-2">Log incident</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Incident register</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {incidents.map((incident) => (
            <li key={incident.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{incident.incidentType}</p>
                <p className="text-slate-500">{incident.location} · {incident.severity}</p>
                <p className="text-xs text-slate-400">Status: {incident.status}</p>
              </div>
              <Link href={`/safety/incidents/${incident.id}`} className="text-xs font-semibold text-blue-700">View</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
