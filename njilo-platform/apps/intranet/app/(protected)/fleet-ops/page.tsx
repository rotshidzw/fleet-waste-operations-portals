import Link from "next/link";
import { Card } from "@njilo/ui";

const modules = [
  { title: "Vehicles", href: "/fleet-ops/vehicles", description: "Fleet asset register." },
  { title: "Drivers", href: "/fleet-ops/drivers", description: "Licensed drivers and status." },
  { title: "Maintenance Tickets", href: "/fleet-ops/maintenance-tickets", description: "Open maintenance issues." },
  { title: "Fuel Logs", href: "/fleet-ops/fuel-logs", description: "Fuel usage records." },
  { title: "Traffic Fines", href: "/fleet-ops/traffic-fines", description: "Compliance and fine tracking." },
  { title: "Tracking Providers", href: "/fleet-ops/tracking-providers", description: "Telematics integrations." }
];

export default function FleetOpsPage() {
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
