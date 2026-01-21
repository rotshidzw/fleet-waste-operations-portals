"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type NavChild = {
  label: string;
  href: string;
};

type NavDropdownProps = {
  label: string;
  href: string;
  childrenItems?: NavChild[];
};

export function NavDropdown({ label, href, childrenItems }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      setOpen(false);
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen((prev) => !prev);
    }
  }

  return (
    <div
      ref={ref}
      className="group relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(event) => {
        if (ref.current && !ref.current.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <div className="flex items-center gap-1">
        <Link
          href={href}
          className="text-sm font-medium text-slate-700 transition hover:text-blue-800 dark:text-slate-200 dark:hover:text-white"
        >
          {label}
        </Link>
        {childrenItems && (
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            onKeyDown={handleKeyDown}
            className="rounded-full px-1 text-xs text-slate-500 transition hover:text-blue-800 dark:text-slate-300"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label={`Toggle ${label} menu`}
          >
            ▾
          </button>
        )}
      </div>

      {childrenItems && (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              // Fix: remove pointer-events trapping and elevate z-index so dropdown stays clickable.
              className="absolute left-0 z-50 mt-3 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-900"
              role="menu"
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setOpen(false);
                }
              }}
            >
              <div className="grid gap-2">
                {childrenItems.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className="rounded-md px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-blue-800 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
