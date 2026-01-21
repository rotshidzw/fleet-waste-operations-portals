export type Role = "ADMIN" | "MANAGER" | "OPS" | "HR" | "READONLY" | "CLIENT";

const roleHierarchy: Record<Role, number> = {
  ADMIN: 5,
  MANAGER: 4,
  OPS: 3,
  HR: 3,
  READONLY: 2,
  CLIENT: 1
};

export function canAccess(required: Role, role?: Role) {
  if (!role) {
    return false;
  }

  return roleHierarchy[role] >= roleHierarchy[required];
}
