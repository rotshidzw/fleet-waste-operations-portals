import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createActivity(formData: FormData) {
  "use server";
  const note = String(formData.get("note") || "");

  await prisma.activity.create({
    data: { note }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Activity", entityId: note.slice(0, 24) }
  });

  revalidatePath("/crm/activities");
  revalidatePath("/dashboard");
}

export default async function ActivitiesPage() {
  const activities = await prisma.activity.findMany({ orderBy: { createdAt: "desc" }, take: 20 });

  return (
    <div className="space-y-6">
      <Card title="New activity" description="Log follow-ups and meeting notes.">
        <form action={createActivity} className="grid gap-3">
          <textarea name="note" placeholder="Activity note" className="rounded-md border border-slate-200 p-2" rows={4} />
          <Button type="submit">Save activity</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Recent activities</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {activities.map((activity) => (
            <li key={activity.id} className="border-b border-slate-100 pb-3 text-slate-600">
              {activity.note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
