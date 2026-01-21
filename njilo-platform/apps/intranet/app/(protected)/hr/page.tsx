import Link from "next/link";
import { Card } from "@njilo/ui";

const modules = [
  { title: "Vacancies", href: "/hr/vacancies", description: "Open and closed roles." },
  { title: "Applications", href: "/hr/applications", description: "Applicant pipeline and status." },
  { title: "Onboarding", href: "/hr/onboarding", description: "New hire checklists and access readiness.", disabled: true },
  { title: "Performance", href: "/hr/performance", description: "Review cycles and talent calibration.", disabled: true },
  { title: "Leave", href: "/hr/leave", description: "Leave balances and approvals.", disabled: true },
  { title: "Training", href: "/hr/training", description: "Learning plans and certifications.", disabled: true },
  { title: "Policies", href: "/hr/policies", description: "Company policy library and acknowledgements.", disabled: true }
];

export default function HrPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {modules.map((item) => (
        <Card key={item.title} title={item.title} description={item.description}>
          {item.disabled ? (
            <span className="text-xs font-semibold uppercase text-slate-400">Coming soon</span>
          ) : (
            <Link href={item.href} className="text-sm font-semibold text-blue-700">
              Open module →
            </Link>
          )}
        </Card>
      ))}
    </div>
  );
}
