import Link from "next/link";
import { Card } from "@njilo/ui";

const modules = [
  { title: "Leads", href: "/crm/leads", description: "Inbound leads from public forms." },
  { title: "Companies", href: "/crm/companies", description: "Enterprise accounts and profiles." },
  { title: "Contacts", href: "/crm/contacts", description: "Key stakeholders and decision makers." },
  { title: "Opportunities", href: "/crm/opportunities", description: "Pipeline stages and deal values." },
  { title: "Activities/Notes", href: "/crm/activities", description: "Meeting notes and follow-ups." }
];

export default function CrmPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {modules.map((item) => (
        <Card key={item.title} title={item.title} description={item.description}>
          <Link href={item.href} className="text-sm font-semibold text-blue-700">
            Open module →
          </Link>
        </Card>
      ))}
    </div>
  );
}
