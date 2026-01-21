import { prisma } from "@njilo/db";
import { PageHeader } from "../../../components/PageHeader";
import { Section, Card } from "@njilo/ui";

export default async function CompanyEventsPage() {
  const events = await prisma.event.findMany({ orderBy: { eventDate: "desc" } });

  return (
    <main>
      <PageHeader title="Company Events" subtitle="Conferences, partner days, and strategic forums." />
      <Section title="Upcoming events" subtitle="Stay aligned with Njilo updates.">
        <div className="grid gap-6 md:grid-cols-2">
          {events.length === 0 && <p className="text-slate-600">No events scheduled yet.</p>}
          {events.map((event) => (
            <Card key={event.id} title={event.title} description={event.summary}>
              <p className="text-xs text-slate-500">{event.eventDate.toDateString()}</p>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
