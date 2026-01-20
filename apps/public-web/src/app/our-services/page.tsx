import Link from "next/link";
import { services } from "@njilo/config";

export default function ServicesPage() {
  return (
    <div className="container-shell space-y-10 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Our Services</h1>
        <p className="mt-3 text-sm text-slate-600">
          Njilo Consulting & Logistics provides a complete fleet management and logistics service suite, tailored to public and private sector requirements.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <div key={service.slug} className="card">
            <h2 className="text-lg font-semibold">{service.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{service.summary}</p>
            <Link className="mt-4 inline-flex text-sm font-semibold text-njilo-blue" href={`/our-services/${service.slug}`}>
              View service detail
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
