import bcrypt from "bcryptjs";
import { prisma } from "@njilo/db";
import { requireRole } from "../../../lib/rbac";
import { Button, Card } from "@njilo/ui";

async function createUser(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");
  const roleId = String(formData.get("roleId") || "");
  const password = String(formData.get("password") || "");

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, email, password: hashed, roleId }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "User", entityId: email }
  });
}

export default async function UsersPage() {
  const { isAllowed } = await requireRole(["ADMIN"]);

  if (!isAllowed) {
    return <div className="rounded-lg border border-slate-200 bg-white p-6">Access denied.</div>;
  }

  const users = await prisma.user.findMany({ include: { role: true } });
  const roles = await prisma.role.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="space-y-6">
      <Card title="Create user" description="Provision new intranet users.">
        <form action={createUser} className="grid gap-3 md:grid-cols-2">
          <input name="name" placeholder="Name" className="rounded-md border border-slate-200 p-2" required />
          <input name="email" type="email" placeholder="Email" className="rounded-md border border-slate-200 p-2" required />
          <select name="roleId" className="rounded-md border border-slate-200 p-2" required>
            <option value="">Select role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
          <input name="password" type="password" placeholder="Temporary password" className="rounded-md border border-slate-200 p-2" required />
          <Button type="submit" className="md:col-span-2">Save user</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Users</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {users.map((user) => (
            <li key={user.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{user.name}</p>
              <p className="text-slate-500">{user.email} · {user.role.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
