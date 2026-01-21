"use client";

import { RoleSwitcher } from "./RoleSwitcher";

type TopbarProps = {
  userName: string;
  role?: string | null;
};

export function Topbar({ userName, role }: TopbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Welcome back, {userName}</h1>
        <p className="text-xs text-slate-500">Role: {role ?? "User"}</p>
      </div>
      <RoleSwitcher />
    </header>
  );
}
