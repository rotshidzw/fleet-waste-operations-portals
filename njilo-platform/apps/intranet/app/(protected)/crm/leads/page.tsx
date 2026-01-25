import { prisma } from "@njilo/db";
import { requireRole } from "@/lib/rbac";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createLead(formData: FormData) {
  "use server";
  const fullName = String(formData.get("fullName") || "");
  const email = String(formData.get("email") || "");
  const department = String(formData.get("department") || "SALES");

  await prisma.lead.create({
    data: {
      fullName,
      email,
      department: department as "SALES" | "OPS" | "HR" | "SUPPORT",
      source: "intranet"
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Lead", entityId: email }
  });

  revalidatePath("/crm/leads");
  revalidatePath("/dashboard");
}

export default async function LeadsPage() {
  const { role, isAllowed } = await requireRole(["ADMIN", "MANAGER", "OPS", "HR", "READ_ONLY"]);
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 20 });

  return (
    <div className="space-y-6">
      {!isAllowed && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Demo access only: you can view records, but edits are disabled for this role.
        </div>
      )}
      {role === "READ_ONLY" && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
          Read-only mode: create and edit actions are disabled.
        </div>
      )}
      {role !== "READ_ONLY" && isAllowed && (
        <Card title="Create lead" description="Capture new inbound leads.">
          <form action={createLead} className="grid gap-3 md:grid-cols-2">
            <input name="fullName" placeholder="Full name" className="rounded-md border border-slate-200 p-2" required />
            <input name="email" type="email" placeholder="Email" className="rounded-md border border-slate-200 p-2" required />
            <select name="department" className="rounded-md border border-slate-200 p-2 md:col-span-2">
              <option value="SALES">Sales</option>
              <option value="OPS">Ops</option>
              <option value="HR">HR</option>
              <option value="SUPPORT">Support</option>
            </select>
            <Button type="submit" className="md:col-span-2">Save lead</Button>
          </form>
        </Card>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Latest leads</h2>
        <div className="mt-4 space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm">
              <div>
                <p className="font-semibold text-slate-900">{lead.fullName}</p>
                <p className="text-slate-500">{lead.email}</p>
              </div>
              <span className="text-xs uppercase text-slate-400">{lead.department}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
