import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createAnnouncement(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "").trim();
  const owner = String(formData.get("owner") || "").trim();
  const audience = String(formData.get("audience") || "Company").trim();
  const status = String(formData.get("status") || "Draft").trim();
  const summary = String(formData.get("summary") || "").trim();

  if (!title || !owner) {
    return;
  }

  await prisma.workflowItem.create({
    data: {
      area: "ADMIN_COMMS",
      title,
      owner,
      status,
      details: `Audience: ${audience}. ${summary || ""}`.trim()
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Announcement", entityId: title }
  });

  revalidatePath("/admin/internal-comms");
}

async function updateAnnouncementStatus(formData: FormData) {
  "use server";
  const announcementId = String(formData.get("announcementId") || "").trim();
  const status = String(formData.get("status") || "").trim();

  if (!announcementId || !status) {
    return;
  }

  await prisma.workflowItem.update({
    where: { id: announcementId },
    data: { status }
  });

  await prisma.auditLog.create({
    data: { action: "UPDATE", entity: "Announcement", entityId: announcementId }
  });

  revalidatePath("/admin/internal-comms");
}

export default async function InternalCommsPage() {
  const announcements = await prisma.workflowItem.findMany({
    where: { area: "ADMIN_COMMS" },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <Card title="Internal communications" description="Draft and schedule company-wide updates.">
        <form action={createAnnouncement} className="grid gap-3 md:grid-cols-2">
          <input name="title" placeholder="Announcement title" className="rounded-md border border-slate-200 p-2" required />
          <input name="owner" placeholder="Comms owner" className="rounded-md border border-slate-200 p-2" required />
          <select name="audience" className="rounded-md border border-slate-200 p-2">
            <option value="Company">Company</option>
            <option value="Operations">Operations</option>
            <option value="Corporate">Corporate</option>
            <option value="Leadership">Leadership</option>
          </select>
          <select name="status" className="rounded-md border border-slate-200 p-2">
            <option value="Draft">Draft</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Sent">Sent</option>
          </select>
          <textarea name="summary" placeholder="Key message" className="rounded-md border border-slate-200 p-2 md:col-span-2" rows={3} />
          <Button type="submit" className="md:col-span-2">Save announcement</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Announcements</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {announcements.map((announcement) => (
            <li key={announcement.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{announcement.title}</p>
                  <p className="text-xs text-slate-500">Owner: {announcement.owner}</p>
                  <p className="mt-1 text-sm text-slate-600">{announcement.details}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  {announcement.status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <form action={updateAnnouncementStatus}>
                  <input type="hidden" name="announcementId" value={announcement.id} />
                  <input type="hidden" name="status" value="Scheduled" />
                  <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">Schedule</Button>
                </form>
                <form action={updateAnnouncementStatus}>
                  <input type="hidden" name="announcementId" value={announcement.id} />
                  <input type="hidden" name="status" value="Sent" />
                  <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">Mark sent</Button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
