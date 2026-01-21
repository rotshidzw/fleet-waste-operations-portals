import Link from "next/link";

const nav = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "CRM", href: "/crm" },
  { label: "Fleet Ops", href: "/fleet-ops" },
  { label: "Waste Ops", href: "/waste-ops" },
  { label: "HR", href: "/hr" },
  { label: "CMS", href: "/cms" },
  { label: "Admin", href: "/admin" }
];

type SidebarProps = {
  role?: string | null;
};

export function Sidebar({ role }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white px-6 py-8">
      <div className="text-lg font-semibold text-blue-900">Njilo Intranet</div>
      <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">{role ?? "Role"}</p>
      <nav className="mt-8 space-y-2 text-sm text-slate-700">
        {nav.map((item) => (
          <Link key={item.label} href={item.href} className="block rounded-md px-3 py-2 hover:bg-slate-100">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
