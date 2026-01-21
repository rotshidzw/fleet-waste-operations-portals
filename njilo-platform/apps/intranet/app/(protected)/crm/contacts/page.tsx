import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";

async function createContact(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");
  const companyId = String(formData.get("companyId") || "");

  if (!companyId) {
    return;
  }

  await prisma.contact.create({
    data: { name, email, companyId }
  });
}

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({ include: { company: true } });
  const companies = await prisma.company.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="space-y-6">
      <Card title="Add contact" description="Track key stakeholders and decision makers.">
        <form action={createContact} className="grid gap-3 md:grid-cols-2">
          <input name="name" placeholder="Contact name" className="rounded-md border border-slate-200 p-2" required />
          <input name="email" type="email" placeholder="Email" className="rounded-md border border-slate-200 p-2" required />
          <select name="companyId" className="rounded-md border border-slate-200 p-2 md:col-span-2" required>
            <option value="">Select company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>{company.name}</option>
            ))}
          </select>
          <Button type="submit" className="md:col-span-2">Save contact</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Contacts</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {contacts.map((contact) => (
            <li key={contact.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{contact.name}</p>
              <p className="text-slate-500">{contact.email} · {contact.company.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
