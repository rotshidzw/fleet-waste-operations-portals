import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createVacancy(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "");
  const location = String(formData.get("location") || "");
  const status = String(formData.get("status") || "ACTIVE");
  const summary = String(formData.get("summary") || "");

  await prisma.vacancy.create({
    data: { title, location, status: status as "ACTIVE" | "CLOSED", summary }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Vacancy", entityId: title }
  });

  revalidatePath("/hr/vacancies");
  revalidatePath("/careers/active-vacancies");
}

export default async function VacanciesPage() {
  const vacancies = await prisma.vacancy.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Create vacancy" description="Post new open roles.">
        <form action={createVacancy} className="grid gap-3">
          <input name="title" placeholder="Title" className="rounded-md border border-slate-200 p-2" required />
          <input name="location" placeholder="Location" className="rounded-md border border-slate-200 p-2" required />
          <select name="status" className="rounded-md border border-slate-200 p-2">
            <option value="ACTIVE">Active</option>
            <option value="CLOSED">Closed</option>
          </select>
          <textarea name="summary" placeholder="Summary" className="rounded-md border border-slate-200 p-2" rows={3} />
          <Button type="submit">Save vacancy</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Vacancies</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {vacancies.map((vacancy) => (
            <li key={vacancy.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{vacancy.title}</p>
              <p className="text-slate-500">{vacancy.location} · {vacancy.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
