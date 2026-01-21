"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@njilo/config";
import { NavDropdown } from "./NavDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { useQuoteModal } from "./QuoteModalProvider";

export function Navbar() {
  const { openModal } = useQuoteModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold text-blue-900 dark:text-white">
          Njilo Holdings
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
          {navigation.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <NavDropdown label={item.label} href={item.href} childrenItems={item.children} />
              ) : (
                <Link
                  href={item.href}
                  className="text-sm font-medium text-slate-700 transition hover:text-blue-800 dark:text-slate-200 dark:hover:text-white"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <a href="https://www.linkedin.com" className="hover:text-blue-700" aria-label="LinkedIn">in</a>
            <a href="https://x.com" className="hover:text-blue-700" aria-label="X">X</a>
            <a href="https://www.youtube.com" className="hover:text-blue-700" aria-label="YouTube">YT</a>
          </div>
          <Link href="/contact-us" className="text-sm text-slate-600 transition hover:text-blue-700 dark:text-slate-300">
            Contact
          </Link>
          <button
            onClick={openModal}
            className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
          >
            Request a Quote
          </button>
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-200"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
            {navigation.map((item) => (
              <div key={item.label} className="space-y-2">
                {item.children ? (
                  <details className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                    <summary className="cursor-pointer font-semibold">{item.label}</summary>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {item.children.map((child) => (
                        <Link key={child.label} href={child.href} className="text-sm text-slate-600 dark:text-slate-300">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link href={item.href} className="block font-semibold">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <button
              onClick={openModal}
              className="mt-2 w-full rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white"
            >
              Request a Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
