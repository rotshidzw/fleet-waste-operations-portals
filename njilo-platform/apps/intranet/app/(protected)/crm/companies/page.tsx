import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createCompany(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "");
  const industry = String(formData.get("industry") || "");

  await prisma.company.create({
    data: { name, industry }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Company", entityId: name }
  });

  revalidatePath("/crm/companies");
}

export default async function CompaniesPage() {
  const companies = await prisma.company.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Add company" description="Capture enterprise account details.">
        <form action={createCompany} className="grid gap-3 md:grid-cols-2">
          <input name="name" placeholder="Company name" className="rounded-md border border-slate-200 p-2" required />
          <input name="industry" placeholder="Industry" className="rounded-md border border-slate-200 p-2" />
          <Button type="submit" className="md:col-span-2">Save company</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Companies</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {companies.map((company) => (
            <li key={company.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{company.name}</p>
              <p className="text-slate-500">{company.industry}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
