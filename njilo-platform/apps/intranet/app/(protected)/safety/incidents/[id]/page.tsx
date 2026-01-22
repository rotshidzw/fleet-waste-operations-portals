import Link from "next/link";
import { prisma } from "@njilo/db";
import { Card } from "@njilo/ui";

export default async function IncidentDetailPage({ params }: { params: { id: string } }) {
  const incident = await prisma.incident.findUnique({ where: { id: params.id } });

  if (!incident) {
    return <Card title="Incident not found" description="No incident record found." />;
  }

  return (
    <div className="space-y-6">
      <Card title={incident.incidentType} description={incident.location}>
        <div className="space-y-2 text-sm text-slate-600">
          <p><span className="font-semibold text-slate-900">Severity:</span> {incident.severity}</p>
          <p><span className="font-semibold text-slate-900">Status:</span> {incident.status}</p>
          <p><span className="font-semibold text-slate-900">Reported by:</span> {incident.reportedBy}</p>
          <p><span className="font-semibold text-slate-900">Root cause:</span> {incident.rootCause || "Pending"}</p>
          <p><span className="font-semibold text-slate-900">Corrective action:</span> {incident.correctiveAction || "Pending"}</p>
        </div>
      </Card>
      <Link href="/safety/incidents" className="text-sm font-semibold text-blue-700">← Back to incidents</Link>
    </div>
  );
}
