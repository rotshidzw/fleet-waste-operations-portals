import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition",
        variant === "primary" && "bg-orange-500 text-white hover:bg-orange-400",
        variant === "secondary" && "bg-blue-900 text-white hover:bg-blue-800",
        variant === "ghost" && "border border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-800",
        className
      )}
      {...props}
    />
  );
}
