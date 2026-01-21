import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createApplication(formData: FormData) {
  "use server";
  const vacancyId = String(formData.get("vacancyId") || "");
  const fullName = String(formData.get("fullName") || "");
  const email = String(formData.get("email") || "");
  const resumeUrl = String(formData.get("resumeUrl") || "");

  if (!vacancyId) {
    return;
  }

  await prisma.application.create({
    data: { vacancyId, fullName, email, resumeUrl }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Application", entityId: email }
  });

  revalidatePath("/hr/applications");
}

export default async function ApplicationsPage() {
  const applications = await prisma.application.findMany({ include: { vacancy: true } });
  const vacancies = await prisma.vacancy.findMany({ orderBy: { title: "asc" } });

  return (
    <div className="space-y-6">
      <Card title="Log application" description="Capture applicant submissions.">
        <form action={createApplication} className="grid gap-3 md:grid-cols-2">
          <select name="vacancyId" className="rounded-md border border-slate-200 p-2 md:col-span-2" required>
            <option value="">Select vacancy</option>
            {vacancies.map((vacancy) => (
              <option key={vacancy.id} value={vacancy.id}>{vacancy.title}</option>
            ))}
          </select>
          <input name="fullName" placeholder="Applicant name" className="rounded-md border border-slate-200 p-2" required />
          <input name="email" type="email" placeholder="Email" className="rounded-md border border-slate-200 p-2" required />
          <input name="resumeUrl" placeholder="Resume URL (optional)" className="rounded-md border border-slate-200 p-2 md:col-span-2" />
          <Button type="submit" className="md:col-span-2">Save application</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Applications</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {applications.map((application) => (
            <li key={application.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{application.fullName}</p>
              <p className="text-slate-500">{application.email} · {application.vacancy.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
