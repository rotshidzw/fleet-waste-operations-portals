import Link from "next/link";
import { prisma } from "@njilo/db";
import { Card } from "@njilo/ui";

export default async function ReportDetailPage({ params }: { params: { id: string } }) {
  const report = await prisma.reportExport.findUnique({ where: { id: params.id } });

  if (!report) {
    return <Card title="Report not found" description="No report export found." />;
  }

  return (
    <div className="space-y-6">
      <Card title={report.title} description={report.period}>
        <div className="space-y-2 text-sm text-slate-600">
          <p><span className="font-semibold text-slate-900">Status:</span> {report.status}</p>
          <p><span className="font-semibold text-slate-900">Created:</span> {report.createdAt.toDateString()}</p>
        </div>
      </Card>
      <Link href="/reports" className="text-sm font-semibold text-blue-700">← Back to reports</Link>
    </div>
  );
}
