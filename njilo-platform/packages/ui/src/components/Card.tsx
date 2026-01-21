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
    <div className={clsx("rounded-xl border border-slate-200 bg-white p-6 shadow-sm", className)}>
      {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
      {description && <p className="mt-2 text-sm text-slate-600">{description}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
