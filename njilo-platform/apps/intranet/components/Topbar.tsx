"use client";

import { signOut } from "next-auth/react";

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
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="rounded-md border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:border-blue-700 hover:text-blue-700"
      >
        Sign out
      </button>
    </header>
  );
}
