import { PageHeader } from "../../../components/PageHeader";
import { Section, Card } from "@njilo/ui";

export default function CareerPursuitPage() {
  return (
    <main>
      <PageHeader title="Working at Njilo" subtitle="A high-performance culture anchored in governance and care." />
      <Section title="Our people promise" subtitle="Growth pathways and leadership development.">
        <div className="grid gap-6 md:grid-cols-3">
          <Card title="Leadership" description="Structured mentorship and executive sponsorship." />
          <Card title="Learning" description="Continuous skills development through internal academies." />
          <Card title="Wellbeing" description="Health, safety, and employee support programs." />
        </div>
      </Section>
    </main>
  );
}
