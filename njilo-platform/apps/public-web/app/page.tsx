import Link from "next/link";
import { HeroSlider } from "../components/HeroSlider";
import { StatsCounters } from "../components/StatsCounters";
import { PartnerCarousel } from "../components/PartnerCarousel";
import { Card, Section } from "@njilo/ui";

const services = [
  { title: "Fleet Management", description: "Operational control with compliance-ready reporting.", href: "/our-services" },
  { title: "Waste Operations", description: "Scheduled pickups and regulatory assurance.", href: "/our-impact" },
  { title: "Insurance & Risk", description: "Coverage and risk mitigation built for fleets.", href: "/services/insurance" }
];

const whyChoose = [
  { title: "Governance-first", description: "Policies, auditing, and KPI oversight baked into every module." },
  { title: "Always-on Support", description: "Dedicated account teams and 24/7 escalation paths." },
  { title: "Integrated Analytics", description: "A unified data layer across fleet, waste, and compliance." }
];

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <HeroSlider />
      </section>

      <Section title="Operational Scale" subtitle="Measured outcomes across fleet and waste services.">
        <StatsCounters />
      </Section>

      <Section title="Why choose us?" subtitle="Enterprise-ready operations built for resilience.">
        <div className="grid gap-6 md:grid-cols-3">
          {whyChoose.map((item) => (
            <Card key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </Section>

      <Section title="Services highlight" subtitle="End-to-end coverage for fleet and compliance.">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((item) => (
            <Card key={item.title} title={item.title} description={item.description}>
              <Link href={item.href} className="text-sm font-semibold text-blue-700">
                Learn more →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Trusted by partners" subtitle="Long-term relationships across public and private sectors.">
        <PartnerCarousel />
      </Section>
    </main>
  );
}
