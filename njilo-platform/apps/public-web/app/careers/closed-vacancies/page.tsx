import { prisma } from "@njilo/db";
import { PageHeader } from "../../../components/PageHeader";
import { Section, Card } from "@njilo/ui";

export default async function ClosedVacanciesPage() {
  const vacancies = await prisma.vacancy.findMany({ where: { status: "CLOSED" } });

  return (
    <main>
      <PageHeader title="Closed Vacancies" subtitle="Recently filled positions." />
      <Section title="Closed roles" subtitle="We will reopen roles as business demand returns.">
        <div className="grid gap-6 md:grid-cols-2">
          {vacancies.map((vacancy) => (
            <Card key={vacancy.id} title={vacancy.title} description={vacancy.summary} />
          ))}
        </div>
      </Section>
    </main>
  );
}
