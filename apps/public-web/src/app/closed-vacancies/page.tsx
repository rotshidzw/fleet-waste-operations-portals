import { closedVacancies } from "@njilo/config";

export default function ClosedVacanciesPage() {
  return (
    <div className="container-shell space-y-8 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Closed Vacancies</h1>
        <p className="mt-3 text-sm text-slate-600">A record of recently closed positions.</p>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        {closedVacancies.map((vacancy) => (
          <div key={vacancy.title} className="card">
            <h2 className="text-lg font-semibold">{vacancy.title}</h2>
            <p className="mt-2 text-sm text-slate-600">Location: {vacancy.location}</p>
            <p className="text-xs text-slate-500">Closed: {vacancy.closedDate}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
