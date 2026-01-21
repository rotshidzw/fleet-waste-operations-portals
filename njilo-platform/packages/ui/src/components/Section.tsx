import type { ReactNode } from "react";
import clsx from "clsx";

type SectionProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ title, subtitle, children, className }: SectionProps) {
  return (
    <section className={clsx("py-16", className)}>
      <div className="mx-auto max-w-6xl px-6">
        {title && <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">{title}</h2>}
        {subtitle && <p className="mt-2 text-slate-600 dark:text-slate-300">{subtitle}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
