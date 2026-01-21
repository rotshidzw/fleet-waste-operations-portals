"use client";

import Link from "next/link";
import { navigation } from "@njilo/config";
import { NavDropdown } from "./NavDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { useQuoteModal } from "./QuoteModalProvider";

export function Navbar() {
  const { openModal } = useQuoteModal();

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
      </div>
    </header>
  );
}
