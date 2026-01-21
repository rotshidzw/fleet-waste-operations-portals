import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function Topbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <p className="text-sm font-semibold">Welcome back</p>
        <p className="text-xs text-slate-500">Enterprise Operations Console</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold">{session?.user?.name ?? "User"}</p>
        <p className="text-xs text-slate-500">Role: {session?.user?.role ?? ""}</p>
      </div>
    </div>
  );
}
