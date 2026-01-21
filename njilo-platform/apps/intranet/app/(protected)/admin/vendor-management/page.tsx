import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createVendorRequest(formData: FormData) {
  "use server";
  const vendor = String(formData.get("vendor") || "").trim();
  const service = String(formData.get("service") || "").trim();
  const owner = String(formData.get("owner") || "").trim();
  const status = String(formData.get("status") || "Due diligence").trim();

  if (!vendor || !service || !owner) {
    return;
  }

  await prisma.workflowItem.create({
    data: {
      area: "ADMIN_VENDOR",
      title: vendor,
      owner,
      status,
      details: `Service: ${service}.`
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Vendor", entityId: vendor }
  });

  revalidatePath("/admin/vendor-management");
}

async function updateVendorStatus(formData: FormData) {
  "use server";
  const recordId = String(formData.get("recordId") || "").trim();
  const status = String(formData.get("status") || "").trim();

  if (!recordId || !status) {
    return;
  }

  await prisma.workflowItem.update({
    where: { id: recordId },
    data: { status }
  });

  await prisma.auditLog.create({
    data: { action: "UPDATE", entity: "Vendor", entityId: recordId }
  });

  revalidatePath("/admin/vendor-management");
}

export default async function VendorManagementPage() {
  const vendors = await prisma.workflowItem.findMany({
    where: { area: "ADMIN_VENDOR" },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <Card title="Vendor management" description="Track vendor onboarding and contract status.">
        <form action={createVendorRequest} className="grid gap-3 md:grid-cols-2">
          <input name="vendor" placeholder="Vendor name" className="rounded-md border border-slate-200 p-2" required />
          <input name="service" placeholder="Service category" className="rounded-md border border-slate-200 p-2" required />
          <input name="owner" placeholder="Vendor owner" className="rounded-md border border-slate-200 p-2" required />
          <select name="status" className="rounded-md border border-slate-200 p-2">
            <option value="Due diligence">Due diligence</option>
            <option value="Contracting">Contracting</option>
            <option value="Active">Active</option>
            <option value="On hold">On hold</option>
          </select>
          <Button type="submit" className="md:col-span-2">Add vendor</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Vendor register</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {vendors.map((vendor) => (
            <li key={vendor.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{vendor.title}</p>
                  <p className="text-xs text-slate-500">Owner: {vendor.owner}</p>
                  <p className="mt-1 text-sm text-slate-600">{vendor.details}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  {vendor.status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <form action={updateVendorStatus}>
                  <input type="hidden" name="recordId" value={vendor.id} />
                  <input type="hidden" name="status" value="Active" />
                  <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">Approve</Button>
                </form>
                <form action={updateVendorStatus}>
                  <input type="hidden" name="recordId" value={vendor.id} />
                  <input type="hidden" name="status" value="On hold" />
                  <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">Pause</Button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
