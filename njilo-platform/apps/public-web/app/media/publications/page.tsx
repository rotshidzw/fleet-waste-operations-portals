import { prisma } from "@njilo/db";
import { PageHeader } from "../../../components/PageHeader";
import { Section, Card } from "@njilo/ui";

export default async function PublicationsPage() {
  const publications = await prisma.publication.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main>
      <PageHeader title="Publications" subtitle="Thought leadership and compliance resources." />
      <Section title="Latest publications" subtitle="Download the latest reports and insights.">
        <div className="grid gap-6 md:grid-cols-2">
          {publications.length === 0 && <p className="text-slate-600">No publications yet.</p>}
          {publications.map((publication) => (
            <Card key={publication.id} title={publication.title} description={publication.summary}>
              {publication.pdfUrl && (
                <a href={publication.pdfUrl} className="text-sm font-semibold text-blue-700">
                  Download PDF →
                </a>
              )}
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
