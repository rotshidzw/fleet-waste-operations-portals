import Link from "next/link";
import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createReport(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "").trim();
  const period = String(formData.get("period") || "").trim();
  const status = String(formData.get("status") || "Queued").trim();

  if (!title || !period) {
    return;
  }

  await prisma.reportExport.create({
    data: { title, period, status }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "ReportExport", entityId: title }
  });

  revalidatePath("/reports");
}

export default async function ReportsPage() {
  const reports = await prisma.reportExport.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Reports & exports" description="Schedule monthly reporting exports.">
        <form action={createReport} className="grid gap-3 md:grid-cols-2">
          <input name="title" placeholder="Report title" className="rounded-md border border-slate-200 p-2" required />
          <input name="period" placeholder="Period (e.g. Aug 2024)" className="rounded-md border border-slate-200 p-2" required />
          <input name="status" placeholder="Status" className="rounded-md border border-slate-200 p-2" />
          <Button type="submit" className="md:col-span-2">Create report</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Report queue</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {reports.map((report) => (
            <li key={report.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{report.title}</p>
                <p className="text-slate-500">{report.period} · {report.status}</p>
              </div>
              <Link href={`/reports/${report.id}`} className="text-xs font-semibold text-blue-700">View</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
