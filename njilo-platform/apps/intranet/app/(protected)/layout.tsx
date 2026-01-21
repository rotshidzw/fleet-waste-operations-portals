import { Sidebar } from "../../components/Sidebar";
import { Topbar } from "../../components/Topbar";
import { getDemoRole } from "@/lib/rbac";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const role = getDemoRole();

  return (
    <div className="flex min-h-screen bg-slate-100" data-role={role}>
      <Sidebar role={role} />
      <div className="flex-1">
        <Topbar userName="Demo User" role={role} />
        <main className="px-8 py-8">
          {role === "READ_ONLY" && (
            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
              Read-only mode is enabled. Create, edit, and delete actions are disabled across the demo.
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
