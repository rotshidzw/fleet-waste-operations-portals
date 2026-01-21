import { prisma } from "@njilo/db";
import { PageHeader } from "../../../../components/PageHeader";
import { Section, Button } from "@njilo/ui";

export default async function VacancyDetailPage({ params }: { params: { id: string } }) {
  const vacancy = await prisma.vacancy.findUnique({ where: { id: params.id } });

  if (!vacancy) {
    return (
      <main>
        <PageHeader title="Vacancy not found" />
      </main>
    );
  }

  return (
    <main>
      <PageHeader title={vacancy.title} subtitle={`${vacancy.location} · ${vacancy.status}`} />
      <Section title="Role overview" subtitle="Key responsibilities and requirements.">
        <p className="text-slate-700">{vacancy.summary}</p>
      </Section>
      <Section title="Apply" subtitle="Send your CV and covering letter to careers@njilo.local.">
        <Button>Apply via email</Button>
      </Section>
    </main>
  );
}
