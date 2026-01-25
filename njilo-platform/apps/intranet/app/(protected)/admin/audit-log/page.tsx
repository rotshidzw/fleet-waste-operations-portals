import { prisma } from "@njilo/db";
import { requireRole } from "@/lib/rbac";

export default async function AuditLogPage() {
  const { isAllowed, role } = await requireRole(["ADMIN"]);

  const logs = await prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 50 });

  return (
    <div className="space-y-6">
      {!isAllowed && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Demo access only: you can view audit entries, but admin actions are disabled for the {role} role.
        </div>
      )}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Audit log</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {logs.map((log) => (
            <li key={log.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{log.action} · {log.entity}</p>
              <p className="text-slate-500">{log.entityId ?? "-"} · {log.createdAt.toDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
