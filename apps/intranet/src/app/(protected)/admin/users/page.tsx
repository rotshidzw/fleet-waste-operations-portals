import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccess } from "@/lib/rbac";
import { prisma } from "@njilo/db";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role as "ADMIN" | undefined;

  if (!canAccess("ADMIN", role)) {
    return <p className="text-sm text-red-600">Access denied.</p>;
  }

  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">User Management</h1>
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-3 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
        </div>
        {users.map((user) => (
          <div key={user.id} className="grid grid-cols-3 gap-4 border-b border-slate-100 px-4 py-3 text-sm">
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
