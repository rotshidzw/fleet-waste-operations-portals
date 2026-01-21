import { prisma } from "@njilo/db";

export default async function VacanciesPage() {
  const vacancies = await prisma.vacancy.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Vacancies</h1>
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-3 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>Title</span>
          <span>Location</span>
          <span>Status</span>
        </div>
        {vacancies.map((vacancy) => (
          <div key={vacancy.id} className="grid grid-cols-3 gap-4 border-b border-slate-100 px-4 py-3 text-sm">
            <span>{vacancy.title}</span>
            <span>{vacancy.location}</span>
            <span>{vacancy.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
