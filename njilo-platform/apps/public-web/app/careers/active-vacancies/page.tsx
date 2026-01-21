import Link from "next/link";
import { prisma } from "@njilo/db";
import { PageHeader } from "../../../components/PageHeader";
import { Section, Card } from "@njilo/ui";

export default async function ActiveVacanciesPage() {
  const vacancies = await prisma.vacancy.findMany({ where: { status: "ACTIVE" } });

  return (
    <main>
      <PageHeader title="Active Vacancies" subtitle="Join our enterprise operations team." />
      <Section title="Open roles" subtitle="Apply through our HR team.">
        <div className="grid gap-6 md:grid-cols-2">
          {vacancies.map((vacancy) => (
            <Card key={vacancy.id} title={vacancy.title} description={vacancy.summary}>
              <Link href={`/careers/vacancies/${vacancy.id}`} className="text-sm font-semibold text-blue-700">
                View vacancy →
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
