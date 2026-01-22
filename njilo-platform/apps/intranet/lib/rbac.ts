import { cookies } from "next/headers";

export type Role = "ADMIN" | "MANAGER" | "OPS" | "HR" | "READ_ONLY";

const cookieName = "njilo_role";

function isRole(value: string | undefined): value is Role {
  return value === "ADMIN" || value === "MANAGER" || value === "OPS" || value === "HR" || value === "READ_ONLY";
}

export function getDemoRole(): Role {
  const value = cookies().get(cookieName)?.value;
  return isRole(value) ? value : "ADMIN";
}

export function setDemoRole(role: Role) {
  cookies().set(cookieName, role, { path: "/", sameSite: "lax" });
}

export function requireRole(allowed: Role[]) {
  const role = getDemoRole();
  return { isAllowed: allowed.includes(role), role };
}
