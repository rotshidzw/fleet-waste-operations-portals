import Link from "next/link";
import { prisma } from "@njilo/db";
import { Card } from "@njilo/ui";

export default async function MaintenanceDetailPage({ params }: { params: { id: string } }) {
  const schedule = await prisma.maintenanceSchedule.findUnique({ where: { id: params.id } });

  if (!schedule) {
    return <Card title="Schedule not found" description="No maintenance record found." />;
  }

  return (
    <div className="space-y-6">
      <Card title={schedule.serviceType} description={`Next: ${schedule.nextServiceAt.toDateString()}`}>
        <div className="space-y-2 text-sm text-slate-600">
          <p><span className="font-semibold text-slate-900">Status:</span> {schedule.status.replace("_", " ")}</p>
          <p><span className="font-semibold text-slate-900">Notes:</span> {schedule.notes || "None"}</p>
        </div>
      </Card>
      <Link href="/maintenance" className="text-sm font-semibold text-blue-700">← Back to maintenance</Link>
    </div>
  );
}
