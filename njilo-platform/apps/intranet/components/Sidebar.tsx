import Link from "next/link";

const nav = [
  { label: "Dashboard", href: "/dashboard", roles: ["ADMIN", "MANAGER", "OPS", "HR", "READ_ONLY"] },
  { label: "CRM", href: "/crm", roles: ["ADMIN", "MANAGER", "OPS", "READ_ONLY"] },
  { label: "Fleet Ops", href: "/fleet-ops", roles: ["ADMIN", "MANAGER", "OPS", "READ_ONLY"] },
  { label: "Waste Ops", href: "/waste-ops", roles: ["ADMIN", "MANAGER", "OPS", "READ_ONLY"] },
  { label: "HR", href: "/hr", roles: ["ADMIN", "HR", "READ_ONLY"] },
  { label: "CMS", href: "/cms", roles: ["ADMIN", "MANAGER"] },
  { label: "Admin", href: "/admin", roles: ["ADMIN"] }
];

type SidebarProps = {
  role?: string | null;
};

export function Sidebar({ role }: SidebarProps) {
  const visibleNav = nav.filter((item) => !role || item.roles.includes(role));

  return (
    <aside className="min-h-screen w-64 border-r border-slate-200 bg-white px-6 py-8">
      <div className="text-lg font-semibold text-blue-900">Njilo Intranet</div>
      <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">{role ?? "Role"}</p>
      <nav className="mt-8 space-y-2 text-sm text-slate-700">
        {visibleNav.map((item) => (
          <Link key={item.label} href={item.href} className="block rounded-md px-3 py-2 hover:bg-slate-100">
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Quick views</p>
        <nav className="mt-4 space-y-2 text-sm text-slate-600">
          <Link href="/crm/companies" className="block rounded-md px-3 py-2 hover:bg-slate-100">Accounts</Link>
          <Link href="/crm/opportunities" className="block rounded-md px-3 py-2 hover:bg-slate-100">Pipeline</Link>
          <Link href="/fleet-ops/vehicles" className="block rounded-md px-3 py-2 hover:bg-slate-100">Fleet register</Link>
          <Link href="/waste-ops/jobs" className="block rounded-md px-3 py-2 hover:bg-slate-100">Waste jobs</Link>
          <Link href="/hr/vacancies" className="block rounded-md px-3 py-2 hover:bg-slate-100">Candidate vault</Link>
          <Link href="/admin/audit-log" className="block rounded-md px-3 py-2 hover:bg-slate-100">Audit log</Link>
        </nav>
      </div>
    </aside>
  );
}
