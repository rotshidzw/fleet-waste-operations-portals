import Link from "next/link";

export default function VacancyDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container-shell space-y-8 py-12">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Vacancy</p>
        <h1 className="mt-3 text-3xl font-semibold">Vacancy Details</h1>
        <p className="mt-3 text-sm text-slate-600">
          Vacancy reference: {params.id}. Full details are managed within the intranet HR module.
        </p>
      </header>
      <section className="card">
        <h2 className="text-lg font-semibold">How to apply</h2>
        <p className="mt-2 text-sm text-slate-600">
          Submit your CV and supporting documents to careers@njiloconsulting.co.za. Our HR team will confirm receipt and next steps.
        </p>
        <Link className="mt-4 inline-flex text-sm font-semibold text-njilo-blue" href="/active-vacancies">
          Back to Active Vacancies
        </Link>
      </section>
    </div>
  );
}
