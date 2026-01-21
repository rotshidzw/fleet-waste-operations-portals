import Image from "next/image";
import Link from "next/link";
import { HeroSlider } from "../components/HeroSlider";
import { StatsCounters } from "../components/StatsCounters";
import { PartnerCarousel } from "../components/PartnerCarousel";
import { TestimonialsSlider } from "../components/TestimonialsSlider";
import { ServiceComparison } from "../components/ServiceComparison";
import { Reveal } from "../components/Reveal";
import { ContactCtaBand } from "../components/ContactCtaBand";
import { NewsletterSignup } from "../components/NewsletterSignup";
import { IndustriesTabs } from "../components/IndustriesTabs";
import { Card, Section } from "@njilo/ui";

const services = [
  { title: "Fleet Management", description: "Operational control with compliance-ready reporting.", href: "/our-services" },
  { title: "Waste Operations", description: "Scheduled pickups and regulatory assurance.", href: "/our-impact" },
  { title: "Plant & Equipment", description: "Yellow plant leasing with maintenance visibility.", href: "/services/yellow-plant-equipment" }
];

const highlights = [
  {
    title: "Telematics & Tracking",
    description: "Live asset visibility, route performance, and risk alerts.",
    icon: "/media/stock/service-tracking.svg"
  },
  {
    title: "Compliance & Audits",
    description: "Regulatory playbooks, safety checks, and reporting.",
    icon: "/media/stock/service-compliance.svg"
  },
  {
    title: "Managed Fleet Care",
    description: "Service schedules, driver training, and uptime SLAs.",
    icon: "/media/stock/service-maintenance.svg"
  },
  {
    title: "Waste Diversion",
    description: "Recycling, landfill diversion, and ESG reporting.",
    icon: "/media/stock/service-equipment.svg"
  }
];

const processSteps = [
  {
    title: "Discover",
    description: "Site audit, fleet assessment, and compliance baseline."
  },
  {
    title: "Design",
    description: "Right-sized service mix with SLAs, KPIs, and reporting cadence."
  },
  {
    title: "Deploy",
    description: "Onboarding, training, and technology activation."
  },
  {
    title: "Optimise",
    description: "Continuous improvement using performance dashboards."
  }
];

const caseStudy = {
  title: "Metro Logistics – National Fleet Optimisation",
  description:
    "Reduced fuel variance by 22% and improved compliance turnaround times by 35% across 14 depots.",
  metrics: ["2,100 assets managed", "98% audit pass rate", "R18m annual cost savings"]
};

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <HeroSlider />
      </section>

      <Section title="Operational Scale" subtitle="Measured outcomes across fleet and waste services.">
        <StatsCounters />
      </Section>

      <Section title="What we do" subtitle="End-to-end services for fleet, waste, and plant operations.">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              {services.map((item) => (
                <Card key={item.title} title={item.title} description={item.description}>
                  <Link href={item.href} className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                    Learn more →
                  </Link>
                </Card>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="relative min-h-[280px] overflow-hidden rounded-2xl">
              <Image
                src="/media/trucks/fleet-terminal.svg"
                alt="Fleet operations"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section title="Operational galleries" subtitle="A glimpse into fleet, waste, and plant delivery.">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { src: "/media/hero/hero-fleet.svg", label: "Fleet coverage" },
            { src: "/media/hero/hero-waste.svg", label: "Waste operations" },
            { src: "/media/hero/hero-plant.svg", label: "Plant & equipment" }
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <div className="relative h-40 overflow-hidden rounded-xl">
                <Image src={item.src} alt={item.label} fill className="object-cover" />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">{item.label}</p>
              <p className="text-xs text-slate-500 dark:text-slate-300">Swap in custom photography anytime.</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Services highlights" subtitle="Capability-focused services designed for compliance and resilience.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <Reveal key={item.title}>
              <Card title={item.title} description={item.description} className="h-full">
                <Image src={item.icon} alt="" width={40} height={40} />
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="Industries served" subtitle="Trusted by enterprise and public sector operators.">
        <IndustriesTabs />
      </Section>

      <Section title="How we work" subtitle="A proven delivery model that scales across regions.">
        <div className="grid gap-6 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.1}>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">Step {index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="Compliance & safety" subtitle="Risk-managed operations aligned to governance frameworks.">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                We align with ISO 39001, POPIA, and environmental reporting guidelines to keep your operations audit-ready.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <Card title="Audit readiness" description="Weekly compliance checks and rapid remediation." />
                <Card title="Safety analytics" description="Driver behavior monitoring and incident reviews." />
                <Card title="ESG reporting" description="Carbon tracking, waste diversion, and supplier governance." />
                <Card title="Emergency response" description="24/7 escalation and national support coverage." />
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="relative min-h-[320px] overflow-hidden rounded-2xl">
              <Image
                src="/media/trucks/compliance-check.svg"
                alt="Compliance and safety"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section title="Case study" subtitle="Operational wins from enterprise clients.">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{caseStudy.title}</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{caseStudy.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                {caseStudy.metrics.map((metric) => (
                  <li key={metric}>• {metric}</li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href="/our-impact" className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                  Read the full case study →
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="relative min-h-[280px] overflow-hidden rounded-2xl">
              <Image
                src="/media/trucks/operations-yard.svg"
                alt="Operations yard"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section title="Trusted by partners" subtitle="Long-term relationships across public and private sectors.">
        <PartnerCarousel />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <p className="font-semibold text-slate-900 dark:text-white">Integrated reporting</p>
            <p className="mt-2">Unified dashboards and real-time KPI tracking across regions.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <p className="font-semibold text-slate-900 dark:text-white">Service reliability</p>
            <p className="mt-2">Multi-tier SLA coverage and 24/7 escalation support.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <p className="font-semibold text-slate-900 dark:text-white">Partnership enablement</p>
            <p className="mt-2">Co-branded reporting and executive sponsorship programs.</p>
          </div>
        </div>
      </Section>

      <Section title="Testimonials" subtitle="What our clients say about Njilo.">
        <TestimonialsSlider />
      </Section>

      <Section title="Compare services" subtitle="Make the right mix for your operational goals.">
        <ServiceComparison />
      </Section>

      <Section title="Stay informed" subtitle="Monthly insights on fleet, waste, and compliance performance.">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Newsletter signup</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Get quarterly updates, compliance playbooks, and industry benchmarks.
              </p>
              <NewsletterSignup />
            </div>
          </Reveal>
          <Reveal>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Company profile</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Download a snapshot of our services, compliance credentials, and national footprint.
              </p>
              <a
                href="/company-profile.pdf"
                className="mt-4 inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-700 dark:border-slate-700 dark:text-slate-200"
              >
                Download company profile
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      <ContactCtaBand />
    </main>
  );
}
