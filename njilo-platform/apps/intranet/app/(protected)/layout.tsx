import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";
import { Sidebar } from "../../components/Sidebar";
import { Topbar } from "../../components/Topbar";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar role={session.user?.role} />
      <div className="flex-1">
        <Topbar userName={session.user?.name ?? "User"} role={session.user?.role} />
        <main className="px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
