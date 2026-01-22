import Image from "next/image";
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
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <p>
              Njilo Holdings delivers integrated fleet, waste, and plant operations with a focus on compliance,
              transparency, and measurable service levels. Our teams operate across metro and remote regions to
              keep essential services running with audit-ready reporting.
            </p>
            <p>
              We align with governance frameworks and build partnerships that scale, combining operational
              execution with data visibility for leadership teams.
            </p>
          </div>
          <div className="relative min-h-[240px] overflow-hidden rounded-2xl">
            <Image
              src="/media/trucks/operations-yard.svg"
              alt="Njilo operations"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </Section>
      <Section title="What we stand for" subtitle="Leadership principles that guide every engagement.">
        <div className="grid gap-6 md:grid-cols-3">
          <Card title="Governance" description="Board-aligned operational controls with audit readiness." />
          <Card title="Performance" description="Continuous KPI monitoring and monthly executive reporting." />
          <Card title="Sustainability" description="Responsible asset management and environmental stewardship." />
        </div>
      </Section>
      <Section title="Our footprint" subtitle="Coordinated delivery across fleet, waste, and plant assets.">
        <div className="grid gap-6 md:grid-cols-3">
          <Card title="12+ Regions" description="Regional hubs covering major metro and mining corridors." />
          <Card title="24/7 Coverage" description="National support escalation and rapid response teams." />
          <Card title="ISO Ready" description="Safety, quality, and compliance frameworks embedded." />
        </div>
      </Section>
    </main>
  );
}
