import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createPartner(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "");
  const logoUrl = String(formData.get("logoUrl") || "");
  const sortOrder = Number(formData.get("sortOrder") || 0);

  await prisma.partner.create({
    data: { name, logoUrl, sortOrder }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Partner", entityId: name }
  });

  revalidatePath("/cms/partners");
  revalidatePath("/");
}

export default async function PartnersPage() {
  const partners = await prisma.partner.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="space-y-6">
      <Card title="Add partner" description="Manage partner logos and display order.">
        <form action={createPartner} className="grid gap-3 md:grid-cols-2">
          <input name="name" placeholder="Partner name" className="rounded-md border border-slate-200 p-2" required />
          <input name="logoUrl" placeholder="Logo URL" className="rounded-md border border-slate-200 p-2" required />
          <input name="sortOrder" type="number" placeholder="Sort order" className="rounded-md border border-slate-200 p-2" />
          <Button type="submit" className="md:col-span-2">Save partner</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Partners</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {partners.map((partner) => (
            <li key={partner.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{partner.name}</p>
              <p className="text-slate-500">{partner.logoUrl} · Order {partner.sortOrder}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
