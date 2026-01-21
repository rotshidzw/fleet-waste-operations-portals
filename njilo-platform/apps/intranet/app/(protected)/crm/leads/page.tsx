import { prisma } from "@njilo/db";
import { requireRole } from "@/lib/rbac";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createLead(formData: FormData) {
  "use server";
  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const companyName = String(formData.get("companyName") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const department = String(formData.get("department") || "SALES").trim();
  const source = String(formData.get("source") || "Intranet").trim();

  if (!fullName || !email) {
    return;
  }

  await prisma.lead.create({
    data: {
      fullName,
      email,
      phone: phone || null,
      companyName: companyName || null,
      message: message || null,
      department: department as "SALES" | "OPS" | "HR" | "SUPPORT",
      source
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Lead", entityId: email }
  });

  revalidatePath("/crm/leads");
  revalidatePath("/dashboard");
}

async function deleteLead(formData: FormData) {
  "use server";
  const leadId = String(formData.get("leadId") || "").trim();
  if (!leadId) return;

  await prisma.lead.delete({ where: { id: leadId } });
  await prisma.auditLog.create({
    data: { action: "DELETE", entity: "Lead", entityId: leadId }
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
        <Card title="Create lead" description="Capture new inbound leads with full context.">
          <form action={createLead} className="grid gap-3 md:grid-cols-2">
            <input name="fullName" placeholder="Full name" className="rounded-md border border-slate-200 p-2" required />
            <input name="email" type="email" placeholder="Email" className="rounded-md border border-slate-200 p-2" required />
            <input name="phone" placeholder="Phone" className="rounded-md border border-slate-200 p-2" />
            <input name="companyName" placeholder="Company" className="rounded-md border border-slate-200 p-2" />
            <select name="department" className="rounded-md border border-slate-200 p-2">
              <option value="SALES">Sales</option>
              <option value="OPS">Ops</option>
              <option value="HR">HR</option>
              <option value="SUPPORT">Support</option>
            </select>
            <input name="source" placeholder="Lead source" className="rounded-md border border-slate-200 p-2" />
            <textarea name="message" placeholder="Lead notes or requirements" className="rounded-md border border-slate-200 p-2 md:col-span-2" rows={3} />
            <Button type="submit" className="md:col-span-2">Save lead</Button>
          </form>
        </Card>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Latest leads</h2>
        <div className="mt-4 space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="flex items-start justify-between border-b border-slate-100 pb-3 text-sm">
              <div>
                <p className="font-semibold text-slate-900">{lead.fullName}</p>
                <p className="text-slate-500">{lead.email}</p>
                <p className="text-xs text-slate-400">{lead.phone || "Phone pending"} · {lead.companyName || "Company pending"}</p>
                {lead.message && (
                  <p className="text-xs text-slate-500">{lead.message}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs uppercase text-slate-400">{lead.department}</span>
                <span className="text-xs text-slate-400">{lead.source}</span>
                {role !== "READ_ONLY" && (
                  <form action={deleteLead}>
                    <input type="hidden" name="leadId" value={lead.id} />
                    <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">
                      Delete
                    </Button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
