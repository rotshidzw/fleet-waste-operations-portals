import { prisma } from "@njilo/db";

export default async function AuditLogPage() {
  const logs = await prisma.auditLog.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Audit Log</h1>
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-3 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>User</span>
          <span>Action</span>
          <span>Date</span>
        </div>
        {logs.map((log) => (
          <div key={log.id} className="grid grid-cols-3 gap-4 border-b border-slate-100 px-4 py-3 text-sm">
            <span>{log.userEmail}</span>
            <span>{log.action}</span>
            <span>{log.createdAt.toDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
