import { prisma } from "@njilo/db";

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Contacts</h1>
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-3 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>Name</span>
          <span>Email</span>
          <span>Company</span>
        </div>
        {contacts.map((contact) => (
          <div key={contact.id} className="grid grid-cols-3 gap-4 border-b border-slate-100 px-4 py-3 text-sm">
            <span>{contact.name}</span>
            <span>{contact.email}</span>
            <span>{contact.companyId ?? "-"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
