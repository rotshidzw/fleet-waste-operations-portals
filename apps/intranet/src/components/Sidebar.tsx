import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/crm/leads", label: "Leads" },
  { href: "/crm/companies", label: "Companies" },
  { href: "/crm/deals", label: "Deals" },
  { href: "/operations/vehicles", label: "Vehicles" },
  { href: "/operations/work-orders", label: "Work Orders" },
  { href: "/operations/traffic-fines", label: "Traffic Fines" },
  { href: "/operations/fuel-logs", label: "Fuel Logs" },
  { href: "/waste/jobs", label: "Waste Jobs" },
  { href: "/hr/vacancies", label: "Vacancies" },
  { href: "/content/partners", label: "Partner Logos" },
  { href: "/content/publications", label: "Publications" },
  { href: "/content/videos", label: "Video Gallery" },
  { href: "/documents", label: "Documents" },
  { href: "/admin/users", label: "User Management" },
  { href: "/admin/audit-log", label: "Audit Log" }
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white px-4 py-6">
      <div className="px-2">
        <p className="text-sm font-semibold text-slate-900">Njilo Intranet</p>
        <p className="text-xs text-slate-500">CRM · Operations · HR</p>
      </div>
      <nav className="mt-6 space-y-1">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="sidebar-link">
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
