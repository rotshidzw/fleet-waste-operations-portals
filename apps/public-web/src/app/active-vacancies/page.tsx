import Link from "next/link";

export default function ActiveVacanciesPage() {
  return (
    <div className="container-shell space-y-8 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Active Vacancies</h1>
        <p className="mt-3 text-sm text-slate-600">Currently no openings are available. Please check back soon.</p>
      </header>
      <section className="card">
        <h2 className="text-lg font-semibold">Stay connected</h2>
        <p className="mt-3 text-sm text-slate-600">
          Email your CV and interest area to careers@njiloconsulting.co.za for future consideration.
        </p>
        <Link className="mt-4 inline-flex text-sm font-semibold text-njilo-blue" href="/career-pursuit">
          View Career Pursuit
        </Link>
      </section>
    </div>
  );
}
