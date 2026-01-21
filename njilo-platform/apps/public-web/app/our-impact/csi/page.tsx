import { PageHeader } from "../../../components/PageHeader";
import { Section, Card } from "@njilo/ui";

export default function CsiPage() {
  return (
    <main>
      <PageHeader title="Corporate Social Investment" subtitle="Community partnerships and sustainability programs." />
      <Section title="Priority initiatives" subtitle="Aligned to local economic development goals.">
        <div className="grid gap-6 md:grid-cols-3">
          <Card title="Skills Development" description="Training and certification support for youth programs." />
          <Card title="Environmental Stewardship" description="Waste reduction and recycling partnerships." />
          <Card title="Community Mobility" description="Fleet support for essential services." />
        </div>
      </Section>
    </main>
  );
}
