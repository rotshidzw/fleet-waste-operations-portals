import { industries } from "@njilo/config";

export default function IndustriesPage() {
  return (
    <div className="container-shell space-y-8 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Industries We Serve</h1>
        <p className="mt-3 text-sm text-slate-600">
          Enterprise fleet and logistics solutions tailored to the regulatory and operational needs of diverse sectors.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-3">
        {industries.map((industry) => (
          <div key={industry} className="card">
            <h2 className="text-lg font-semibold">{industry}</h2>
            <p className="mt-2 text-sm text-slate-600">
              Dedicated fleet solutions aligned to {industry.toLowerCase()} compliance, safety, and reporting requirements.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
