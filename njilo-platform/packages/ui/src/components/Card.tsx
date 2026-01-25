import type { ReactNode } from "react";
import clsx from "clsx";

type CardProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function Card({ title, description, children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900",
        className
      )}
    >
      {title && <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>}
      {description && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
