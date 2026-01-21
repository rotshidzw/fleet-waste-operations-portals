import Link from "next/link";
import { Card } from "@njilo/ui";

const modules = [
  { title: "Users & Roles", href: "/admin/users", description: "Manage access and role assignments." },
  { title: "Audit Log", href: "/admin/audit-log", description: "System activity and content changes." }
];

export default function AdminPage() {
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
