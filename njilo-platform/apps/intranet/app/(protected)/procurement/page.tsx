import Link from "next/link";
import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createProcurementRequest(formData: FormData) {
  "use server";
  const item = String(formData.get("item") || "").trim();
  const quantity = Number(formData.get("quantity") || 1);
  const requester = String(formData.get("requester") || "").trim();
  const department = String(formData.get("department") || "").trim();
  const status = String(formData.get("status") || "REQUESTED").trim();
  const notes = String(formData.get("notes") || "").trim();

  if (!item || !requester || !department) {
    return;
  }

  await prisma.procurementRequest.create({
    data: {
      item,
      quantity,
      requester,
      department,
      status: status as "REQUESTED" | "APPROVED" | "ORDERED" | "FULFILLED" | "DECLINED",
      notes: notes || null
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "ProcurementRequest", entityId: item }
  });

  revalidatePath("/procurement");
}

export default async function ProcurementPage() {
  const requests = await prisma.procurementRequest.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Procurement requests" description="Route uniforms, PPE, and tools for approval.">
        <form action={createProcurementRequest} className="grid gap-3 md:grid-cols-2">
          <input name="item" placeholder="Item" className="rounded-md border border-slate-200 p-2" required />
          <input name="quantity" type="number" placeholder="Quantity" className="rounded-md border border-slate-200 p-2" required />
          <input name="requester" placeholder="Requester" className="rounded-md border border-slate-200 p-2" required />
          <input name="department" placeholder="Department" className="rounded-md border border-slate-200 p-2" required />
          <select name="status" className="rounded-md border border-slate-200 p-2">
            <option value="REQUESTED">Requested</option>
            <option value="APPROVED">Approved</option>
            <option value="ORDERED">Ordered</option>
            <option value="FULFILLED">Fulfilled</option>
            <option value="DECLINED">Declined</option>
          </select>
          <textarea name="notes" placeholder="Notes" className="rounded-md border border-slate-200 p-2 md:col-span-2" rows={3} />
          <Button type="submit" className="md:col-span-2">Submit request</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Request queue</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {requests.map((request) => (
            <li key={request.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{request.item} · {request.quantity}</p>
                <p className="text-slate-500">{request.department} · {request.status.replace("_", " ")}</p>
                <p className="text-xs text-slate-400">Requester: {request.requester}</p>
              </div>
              <Link href={`/procurement/${request.id}`} className="text-xs font-semibold text-blue-700">View</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
