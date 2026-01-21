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

async function deleteVacancy(formData: FormData) {
  "use server";
  const vacancyId = String(formData.get("vacancyId") || "");
  if (!vacancyId) return;

  await prisma.vacancy.delete({ where: { id: vacancyId } });
  await prisma.auditLog.create({
    data: { action: "DELETE", entity: "Vacancy", entityId: vacancyId }
  });

  revalidatePath("/hr/vacancies");
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
            <li key={vacancy.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{vacancy.title}</p>
                <p className="text-slate-500">{vacancy.location} · {vacancy.status}</p>
              </div>
              <form action={deleteVacancy}>
                <input type="hidden" name="vacancyId" value={vacancy.id} />
                <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">
                  Delete
                </Button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
