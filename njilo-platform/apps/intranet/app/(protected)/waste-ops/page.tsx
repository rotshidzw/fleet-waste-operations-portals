import Link from "next/link";
import { Card } from "@njilo/ui";

const modules = [
  { title: "Jobs / Pickups", href: "/waste-ops/jobs", description: "Scheduled pickups and job status." },
  { title: "Equipment Register", href: "/waste-ops/equipment", description: "Waste equipment tracking." },
  { title: "Compliance Notes", href: "/waste-ops/compliance-notes", description: "Compliance observations and actions." }
];

export default function WasteOpsPage() {
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
