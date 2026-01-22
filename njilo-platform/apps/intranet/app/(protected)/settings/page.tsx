import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function upsertSetting(formData: FormData) {
  "use server";
  const key = String(formData.get("key") || "").trim();
  const value = String(formData.get("value") || "").trim();

  if (!key) {
    return;
  }

  await prisma.systemSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value }
  });

  await prisma.auditLog.create({
    data: { action: "UPDATE", entity: "SystemSetting", entityId: key }
  });

  revalidatePath("/settings");
}

export default async function SettingsPage() {
  const settings = await prisma.systemSetting.findMany({ orderBy: { key: "asc" } });

  return (
    <div className="space-y-6">
      <Card title="System settings" description="Maintain business defaults and KPI thresholds.">
        <form action={upsertSetting} className="grid gap-3 md:grid-cols-2">
          <input name="key" placeholder="Setting key" className="rounded-md border border-slate-200 p-2" required />
          <input name="value" placeholder="Value" className="rounded-md border border-slate-200 p-2" required />
          <Button type="submit" className="md:col-span-2">Save setting</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Current settings</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {settings.map((setting) => (
            <li key={setting.id} className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{setting.key}</p>
                <p className="text-slate-500">{setting.value}</p>
              </div>
              <span className="text-xs text-slate-400">Updated {setting.updatedAt.toDateString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
