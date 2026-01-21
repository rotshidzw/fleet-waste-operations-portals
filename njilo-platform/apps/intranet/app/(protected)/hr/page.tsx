import Link from "next/link";
import { Card } from "@njilo/ui";

const modules = [
  { title: "Vacancies", href: "/hr/vacancies", description: "Open and closed roles." },
  { title: "Applications", href: "/hr/applications", description: "Applicant pipeline and status." }
];

export default function HrPage() {
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
