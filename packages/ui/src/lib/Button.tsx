import { ButtonHTMLAttributes } from "react";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-md bg-njilo-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500 ${className}`}
    />
  );
}
