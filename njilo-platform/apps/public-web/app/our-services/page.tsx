import Link from "next/link";
import Image from "next/image";
import { prisma } from "@njilo/db";
import { PageHeader } from "../../components/PageHeader";
import { ServiceFeatureList } from "../../components/ServiceFeatureList";
import { Card, Section } from "@njilo/ui";

export default async function OurServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { title: "asc" } });
  const categories = Array.from(new Set(services.map((service) => service.category)));

  return (
    <main>
      <PageHeader
        title="Service Directory"
        subtitle="Explore fleet, waste, compliance, and equipment services."
      />
      <Section title="Categories" subtitle="Filter by operational discipline.">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              {category}
            </span>
          ))}
        </div>
      </Section>
      <Section title="All services" subtitle="Click through to detailed delivery models.">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950">
                  {service.heroImage ? (
                    <Image src={service.heroImage} alt={service.title} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-slate-400">Image URL</div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{service.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{service.summary}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                    <span className="rounded-full border border-slate-200 px-2 py-1 dark:border-slate-700">{service.category}</span>
                    <span className="rounded-full border border-slate-200 px-2 py-1 dark:border-slate-700">Enterprise-ready</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Link href={`/services/${service.slug}`} className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                  View service →
                </Link>
                <span className="text-xs text-slate-400">Hover to preview</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Capability coverage" subtitle="A professional stack of services designed for enterprise operators.">
        <ServiceFeatureList />
      </Section>
    </main>
  );
}
