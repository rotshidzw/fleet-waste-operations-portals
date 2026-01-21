import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function requireRole(allowed: string[]) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role ?? "";
  return { session, isAllowed: allowed.includes(role), role };
}
