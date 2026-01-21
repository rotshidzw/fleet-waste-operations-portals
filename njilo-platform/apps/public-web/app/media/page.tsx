import Link from "next/link";
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
              <Link href={item.href} className="text-sm font-semibold text-blue-700">
                View details →
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
