import Link from "next/link";
import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createClient(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const contractStart = String(formData.get("contractStart") || "").trim();
  const contractEnd = String(formData.get("contractEnd") || "").trim();
  const serviceScope = String(formData.get("serviceScope") || "").trim();
  const status = String(formData.get("status") || "ACTIVE").trim();

  if (!name) {
    return;
  }

  await prisma.client.create({
    data: {
      name,
      contractStart: contractStart ? new Date(contractStart) : null,
      contractEnd: contractEnd ? new Date(contractEnd) : null,
      serviceScope: serviceScope || null,
      status: status as "ACTIVE" | "PENDING_RENEWAL" | "EXPIRED"
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Client", entityId: name }
  });

  revalidatePath("/clients");
}

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Client register" description="Track clients, contracts, and service scope.">
        <form action={createClient} className="grid gap-3 md:grid-cols-2">
          <input name="name" placeholder="Client name" className="rounded-md border border-slate-200 p-2" required />
          <select name="status" className="rounded-md border border-slate-200 p-2">
            <option value="ACTIVE">Active</option>
            <option value="PENDING_RENEWAL">Pending renewal</option>
            <option value="EXPIRED">Expired</option>
          </select>
          <input name="contractStart" type="date" className="rounded-md border border-slate-200 p-2" />
          <input name="contractEnd" type="date" className="rounded-md border border-slate-200 p-2" />
          <textarea name="serviceScope" placeholder="Service scope" className="rounded-md border border-slate-200 p-2 md:col-span-2" rows={3} />
          <Button type="submit" className="md:col-span-2">Add client</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Clients</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {clients.map((client) => (
            <li key={client.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{client.name}</p>
                <p className="text-slate-500">Status: {client.status.replace("_", " ")}</p>
                <p className="text-xs text-slate-400">Contract: {client.contractStart?.toDateString() || "TBD"} → {client.contractEnd?.toDateString() || "TBD"}</p>
              </div>
              <Link href={`/clients/${client.id}`} className="text-xs font-semibold text-blue-700">View</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
