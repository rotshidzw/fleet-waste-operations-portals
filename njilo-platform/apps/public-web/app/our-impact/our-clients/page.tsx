import { prisma } from "@njilo/db";
import { PageHeader } from "../../../components/PageHeader";
import { Section, Card } from "@njilo/ui";

export default async function OurClientsPage() {
  const partners = await prisma.partner.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <main>
      <PageHeader title="Our Clients" subtitle="Long-term partnerships built on trust and delivery." />
      <Section title="Strategic partners" subtitle="Select enterprise relationships.">
        <div className="grid gap-6 md:grid-cols-3">
          {partners.map((partner) => (
            <Card key={partner.id} title={partner.name} description="Strategic partner" />
          ))}
        </div>
      </Section>
    </main>
  );
}
