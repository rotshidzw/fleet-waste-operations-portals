import Link from "next/link";
import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createInvoiceRequest(formData: FormData) {
  "use server";
  const client = String(formData.get("client") || "").trim();
  const amount = Number(formData.get("amount") || 0);
  const status = String(formData.get("status") || "SUBMITTED").trim();
  const requester = String(formData.get("requester") || "").trim();
  const details = String(formData.get("details") || "").trim();

  if (!client || !amount || !requester) {
    return;
  }

  await prisma.invoiceRequest.create({
    data: {
      client,
      amount,
      status: status as "SUBMITTED" | "APPROVED" | "SENT" | "PAID" | "REJECTED",
      requester,
      details: details || null
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "InvoiceRequest", entityId: client }
  });

  revalidatePath("/finance/invoices");
}

export default async function InvoiceRequestsPage() {
  const invoices = await prisma.invoiceRequest.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Invoice requests" description="Submit invoice requests for finance approval.">
        <form action={createInvoiceRequest} className="grid gap-3 md:grid-cols-2">
          <input name="client" placeholder="Client" className="rounded-md border border-slate-200 p-2" required />
          <input name="amount" type="number" placeholder="Amount" className="rounded-md border border-slate-200 p-2" required />
          <input name="requester" placeholder="Requester" className="rounded-md border border-slate-200 p-2" required />
          <select name="status" className="rounded-md border border-slate-200 p-2">
            <option value="SUBMITTED">Submitted</option>
            <option value="APPROVED">Approved</option>
            <option value="SENT">Sent</option>
            <option value="PAID">Paid</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <textarea name="details" placeholder="Supporting details" className="rounded-md border border-slate-200 p-2 md:col-span-2" rows={3} />
          <Button type="submit" className="md:col-span-2">Submit invoice</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Invoice queue</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {invoices.map((invoice) => (
            <li key={invoice.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{invoice.client}</p>
                <p className="text-slate-500">R{invoice.amount.toLocaleString()} · {invoice.status.replace("_", " ")}</p>
                <p className="text-xs text-slate-400">Requester: {invoice.requester}</p>
              </div>
              <Link href={`/finance/invoices/${invoice.id}`} className="text-xs font-semibold text-blue-700">View</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
