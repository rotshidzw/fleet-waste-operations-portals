import Link from "next/link";
import { PageHeader } from "../../components/PageHeader";
import { Section, Card } from "@njilo/ui";

const links = [
  { title: "CSI", href: "/our-impact/csi", description: "Corporate social investment programs." },
  { title: "Blog", href: "/our-impact/blog", description: "Insights from our leadership team." },
  { title: "Our Clients", href: "/our-impact/our-clients", description: "Key enterprise partnerships." },
  { title: "Client Testimonials", href: "/testimonials", description: "What partners say about Njilo." }
];

export default function OurImpactPage() {
  return (
    <main>
      <PageHeader title="Our Impact" subtitle="Commitment to communities, clients, and operational excellence." />
      <Section title="Explore impact" subtitle="Learn about our programs and outcomes.">
        <div className="grid gap-6 md:grid-cols-2">
          {links.map((item) => (
            <Card key={item.title} title={item.title} description={item.description}>
              <Link href={item.href} className="text-sm font-semibold text-blue-700">
                Learn more →
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
