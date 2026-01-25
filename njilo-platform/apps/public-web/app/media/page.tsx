import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "../../components/PageHeader";
import { Section, Card } from "@njilo/ui";

const mediaLinks = [
  { title: "Media Gallery", href: "/media/media-gallery", description: "Corporate photography and field operations." },
  { title: "Video Gallery", href: "/media/video-gallery", description: "Short documentaries and operational highlights." },
  { title: "Publications", href: "/media/publications", description: "Thought leadership and compliance reports." },
  { title: "Company Events", href: "/media/company-events", description: "Highlights from conferences and partner events." }
];

export default function MediaPage() {
  return (
    <main>
      <PageHeader title="Media" subtitle="Corporate stories, publications, and company events." />
      <Section title="Explore media" subtitle="Access the latest Njilo coverage.">
        <div className="grid gap-6 md:grid-cols-2">
          {mediaLinks.map((item) => (
            <Card key={item.title} title={item.title} description={item.description}>
              <Link href={item.href} className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                View details →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Media highlights" subtitle="Fleet and plant operations captured across regions.">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative min-h-[240px] overflow-hidden rounded-2xl">
            <Image
              src="/media/trucks/fleet-terminal.svg"
              alt="Fleet media"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <p>
              Capture operational moments, community impact, and technology upgrades in one curated archive.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Card title="Operations media" description="Field teams, fleet yards, and waste facilities." />
              <Card title="Leadership updates" description="Executive briefings and partner events." />
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
