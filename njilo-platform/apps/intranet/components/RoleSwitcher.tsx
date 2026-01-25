"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Role } from "@/lib/rbac";

const roles: Role[] = ["ADMIN", "MANAGER", "OPS", "HR", "READ_ONLY"];

export function RoleSwitcher() {
  const [role, setRole] = useState<Role>("ADMIN");
  const router = useRouter();

  useEffect(() => {
    const match = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("njilo_role="));

    if (match) {
      const value = match.split("=")[1] as Role;
      setRole(value);
    }
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextRole = event.target.value as Role;
    setRole(nextRole);
    document.cookie = `njilo_role=${nextRole}; path=/; samesite=lax`;
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Demo role</span>
      <select
        value={role}
        onChange={handleChange}
        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
      >
        {roles.map((roleOption) => (
          <option key={roleOption} value={roleOption}>
            {roleOption}
          </option>
        ))}
      </select>
    </div>
  );
}
