import Link from "next/link";
import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createComplianceRecord(formData: FormData) {
  "use server";
  const type = String(formData.get("type") || "DRIVER_LICENSE").trim();
  const reference = String(formData.get("reference") || "").trim();
  const status = String(formData.get("status") || "Active").trim();
  const expiresAt = String(formData.get("expiresAt") || "").trim();
  const owner = String(formData.get("owner") || "").trim();
  const notes = String(formData.get("notes") || "").trim();

  if (!reference || !owner) {
    return;
  }

  await prisma.complianceRecord.create({
    data: {
      type: type as "DRIVER_LICENSE" | "VEHICLE_LICENSE" | "COF" | "SAFETY_INCIDENT" | "AUDIT",
      reference,
      status,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      owner,
      notes: notes || null
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "ComplianceRecord", entityId: reference }
  });

  revalidatePath("/compliance");
}

export default async function CompliancePage() {
  const records = await prisma.complianceRecord.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Compliance & safety" description="Track licences, COF, incidents, and audits.">
        <form action={createComplianceRecord} className="grid gap-3 md:grid-cols-2">
          <select name="type" className="rounded-md border border-slate-200 p-2">
            <option value="DRIVER_LICENSE">Driver licence</option>
            <option value="VEHICLE_LICENSE">Vehicle licence</option>
            <option value="COF">COF</option>
            <option value="SAFETY_INCIDENT">Safety incident</option>
            <option value="AUDIT">Audit</option>
          </select>
          <input name="reference" placeholder="Reference" className="rounded-md border border-slate-200 p-2" required />
          <input name="owner" placeholder="Owner" className="rounded-md border border-slate-200 p-2" required />
          <input name="status" placeholder="Status" className="rounded-md border border-slate-200 p-2" />
          <input name="expiresAt" type="date" className="rounded-md border border-slate-200 p-2" />
          <textarea name="notes" placeholder="Notes" className="rounded-md border border-slate-200 p-2 md:col-span-2" rows={3} />
          <Button type="submit" className="md:col-span-2">Save record</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Compliance register</h2>
          <Link href="/compliance/fines" className="text-xs font-semibold text-blue-700">Manage traffic fines →</Link>
        </div>
        <ul className="mt-4 space-y-3 text-sm">
          {records.map((record) => (
            <li key={record.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{record.reference}</p>
                <p className="text-slate-500">{record.type.replace("_", " ")} · {record.status}</p>
                <p className="text-xs text-slate-400">Owner: {record.owner}</p>
              </div>
              <Link href={`/compliance/${record.id}`} className="text-xs font-semibold text-blue-700">View</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
