"use client";

import { useRouter } from "next/navigation";
import { Button } from "@njilo/ui";
import { RoleSwitcher } from "./RoleSwitcher";

type TopbarProps = {
  userName: string;
  role?: string | null;
};

export function Topbar({ userName, role }: TopbarProps) {
  const router = useRouter();

  function handleLogout() {
    document.cookie = "njilo_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/");
    router.refresh();
  }

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Welcome back, {userName}</h1>
        <p className="text-xs text-slate-500">Role: {role ?? "User"}</p>
      </div>
      <div className="flex items-center gap-3">
        <RoleSwitcher />
        <Button type="button" variant="ghost" className="px-3 py-2 text-xs" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </header>
  );
}
