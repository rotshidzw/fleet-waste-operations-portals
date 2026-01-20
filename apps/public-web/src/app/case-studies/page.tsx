import { caseStudies } from "@njilo/config";

export default function CaseStudiesPage() {
  return (
    <div className="container-shell space-y-8 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Case Studies</h1>
        <p className="mt-3 text-sm text-slate-600">Enterprise success stories across fleet, logistics, and waste operations.</p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        {caseStudies.map((caseStudy) => (
          <div key={caseStudy.title} className="card">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{caseStudy.industry}</p>
            <h2 className="mt-2 text-lg font-semibold">{caseStudy.title}</h2>
            <p className="mt-3 text-sm text-slate-600">{caseStudy.summary}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
