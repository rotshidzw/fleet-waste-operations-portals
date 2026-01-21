"use client";

import Link from "next/link";
import { navigation } from "@njilo/config";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold text-blue-900">
          Njilo Holdings
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
          {navigation.map((item) => (
            <div key={item.label} className="group relative">
              <Link href={item.href} className="transition hover:text-blue-800">
                {item.label}
              </Link>
              {item.children && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pointer-events-none absolute left-0 mt-4 w-72 rounded-xl border border-slate-200 bg-white p-4 opacity-0 shadow-xl transition group-hover:pointer-events-auto group-hover:opacity-100"
                >
                  <div className="grid gap-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="rounded-md px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/contact-us" className="text-sm text-slate-600">
            Contact
          </Link>
          <Link
            href="/contact-us"
            className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
