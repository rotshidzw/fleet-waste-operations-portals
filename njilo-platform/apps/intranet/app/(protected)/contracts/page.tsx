import Link from "next/link";
import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createContract(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const clientId = String(formData.get("clientId") || "").trim();
  const startDate = String(formData.get("startDate") || "").trim();
  const endDate = String(formData.get("endDate") || "").trim();
  const status = String(formData.get("status") || "ACTIVE").trim();
  const documentRef = String(formData.get("documentRef") || "").trim();

  if (!name || !clientId || !startDate || !endDate) {
    return;
  }

  await prisma.contract.create({
    data: {
      name,
      clientId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: status as "ACTIVE" | "PENDING_RENEWAL" | "EXPIRED",
      documentRef: documentRef || null
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Contract", entityId: name }
  });

  revalidatePath("/contracts");
}

export default async function ContractsPage() {
  const contracts = await prisma.contract.findMany({ include: { client: true }, orderBy: { createdAt: "desc" } });
  const clients = await prisma.client.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="space-y-6">
      <Card title="Contracts & SLAs" description="Track contract periods and renewals.">
        <form action={createContract} className="grid gap-3 md:grid-cols-2">
          <input name="name" placeholder="Contract name" className="rounded-md border border-slate-200 p-2" required />
          <select name="clientId" className="rounded-md border border-slate-200 p-2" required>
            <option value="">Select client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
          <input name="startDate" type="date" className="rounded-md border border-slate-200 p-2" required />
          <input name="endDate" type="date" className="rounded-md border border-slate-200 p-2" required />
          <select name="status" className="rounded-md border border-slate-200 p-2">
            <option value="ACTIVE">Active</option>
            <option value="PENDING_RENEWAL">Pending renewal</option>
            <option value="EXPIRED">Expired</option>
          </select>
          <input name="documentRef" placeholder="Document reference" className="rounded-md border border-slate-200 p-2" />
          <Button type="submit" className="md:col-span-2">Add contract</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Contracts</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {contracts.map((contract) => (
            <li key={contract.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{contract.name}</p>
                <p className="text-slate-500">{contract.client.name} · {contract.status.replace("_", " ")}</p>
                <p className="text-xs text-slate-400">{contract.startDate.toDateString()} → {contract.endDate.toDateString()}</p>
              </div>
              <Link href={`/contracts/${contract.id}`} className="text-xs font-semibold text-blue-700">View</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
