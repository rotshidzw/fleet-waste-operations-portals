import Link from "next/link";
import { prisma } from "@njilo/db";
import { PageHeader } from "../../components/PageHeader";
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
            <Card key={service.id} title={service.title} description={service.summary}>
              <Link href={`/services/${service.slug}`} className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                View service →
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
