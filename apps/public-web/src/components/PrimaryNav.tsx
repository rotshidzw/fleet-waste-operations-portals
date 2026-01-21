import Link from "next/link";
import { navigation } from "@njilo/config";

export function PrimaryNav() {
  return (
    <header className="bg-njilo-blue text-white">
      <div className="container-shell flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-njilo-green" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold tracking-wide">Njilo Consulting & Logistics</p>
            <p className="text-xs text-slate-200">Enterprise Fleet & Waste Management</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-xs font-semibold uppercase lg:flex" aria-label="Primary">
          {navigation.primary.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button className="cursor-pointer" type="button" aria-haspopup="true">
                  {item.label}
                </button>
                <div className="absolute left-0 top-6 hidden w-56 rounded-md bg-white py-3 text-slate-900 shadow-lg group-hover:block group-focus-within:block">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-4 py-2 text-xs font-medium hover:bg-slate-100"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            )
          )}
        </nav>
        <Link className="primary-button hidden lg:inline-flex" href="/contact-us">
          Request a Quote
        </Link>
      </div>
    </header>
  );
}
