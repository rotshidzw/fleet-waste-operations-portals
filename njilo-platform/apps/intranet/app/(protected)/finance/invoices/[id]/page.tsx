import Link from "next/link";
import { prisma } from "@njilo/db";
import { Card } from "@njilo/ui";

export default async function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const invoice = await prisma.invoiceRequest.findUnique({ where: { id: params.id } });

  if (!invoice) {
    return <Card title="Invoice not found" description="No invoice request found." />;
  }

  return (
    <div className="space-y-6">
      <Card title={invoice.client} description={`R${invoice.amount.toLocaleString()}`}>
        <div className="space-y-2 text-sm text-slate-600">
          <p><span className="font-semibold text-slate-900">Status:</span> {invoice.status.replace("_", " ")}</p>
          <p><span className="font-semibold text-slate-900">Requester:</span> {invoice.requester}</p>
          <p><span className="font-semibold text-slate-900">Details:</span> {invoice.details || "No details"}</p>
        </div>
      </Card>
      <Link href="/finance/invoices" className="text-sm font-semibold text-blue-700">← Back to invoices</Link>
    </div>
  );
}
