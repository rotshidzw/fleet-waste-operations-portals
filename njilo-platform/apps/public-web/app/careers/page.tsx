import Link from "next/link";
import { PageHeader } from "../../components/PageHeader";
import { Section, Card } from "@njilo/ui";

const links = [
  { title: "Working at Njilo", href: "/careers/career-pursuit", description: "Our culture, growth, and employee experience." },
  { title: "Active Vacancies", href: "/careers/active-vacancies", description: "Roles currently open." },
  { title: "Closed Vacancies", href: "/careers/closed-vacancies", description: "Recently filled positions." }
];

export default function CareersPage() {
  return (
    <main>
      <PageHeader title="Careers" subtitle="Shape enterprise operations with Njilo Holdings." />
      <Section title="Career pathways" subtitle="Explore opportunities across business units.">
        <div className="grid gap-6 md:grid-cols-3">
          {links.map((item) => (
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
