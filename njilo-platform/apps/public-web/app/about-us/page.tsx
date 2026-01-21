import { PageHeader } from "../../components/PageHeader";
import { Section, Card } from "@njilo/ui";

export default function AboutUsPage() {
  return (
    <main>
      <PageHeader
        title="About Njilo"
        subtitle="A multi-disciplinary enterprise delivering fleet, waste, and compliance excellence."
      />
      <Section title="Our mandate" subtitle="Driving measurable outcomes across regional operations.">
        <div className="grid gap-6 md:grid-cols-3">
          <Card title="Governance" description="Board-aligned operational controls with audit readiness." />
          <Card title="Performance" description="Continuous KPI monitoring and monthly executive reporting." />
          <Card title="Sustainability" description="Responsible asset management and environmental stewardship." />
        </div>
      </Section>
    </main>
  );
}
