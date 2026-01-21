import Link from "next/link";
import { services } from "@njilo/config";

export default function FleetSolutionsPage() {
  return (
    <div className="container-shell space-y-10 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Fleet Solutions</h1>
        <p className="mt-3 text-sm text-slate-600">
          A hub for our enterprise fleet management offering, covering leasing, compliance, telematics, and lifecycle management.
        </p>
      </header>
      <section className="card">
        <h2 className="text-lg font-semibold">Our full offering</h2>
        <p className="mt-3 text-sm text-slate-600">
          We deliver a single-source fleet solution supported by experienced staff, governance reporting, and dedicated systems integration.
        </p>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <div key={service.slug} className="card">
            <h3 className="text-base font-semibold">{service.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{service.summary}</p>
            <Link className="mt-4 inline-flex text-sm font-semibold text-njilo-blue" href={`/our-services/${service.slug}`}>
              Learn more
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
