import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createSecurityReview(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "").trim();
  const owner = String(formData.get("owner") || "").trim();
  const severity = String(formData.get("severity") || "Medium").trim();
  const dueDate = String(formData.get("dueDate") || "").trim();
  const scope = String(formData.get("scope") || "").trim();

  if (!title || !owner) {
    return;
  }

  await prisma.workflowItem.create({
    data: {
      area: "ADMIN_SECURITY",
      title,
      owner,
      status: "Open",
      details: `Severity: ${severity}. Scope: ${scope || "General controls"}.`,
      dueDate: dueDate ? new Date(dueDate) : null
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "SecurityReview", entityId: title }
  });

  revalidatePath("/admin/security-reviews");
}

async function updateSecurityStatus(formData: FormData) {
  "use server";
  const reviewId = String(formData.get("reviewId") || "").trim();
  const status = String(formData.get("status") || "").trim();

  if (!reviewId || !status) {
    return;
  }

  await prisma.workflowItem.update({
    where: { id: reviewId },
    data: { status }
  });

  await prisma.auditLog.create({
    data: { action: "UPDATE", entity: "SecurityReview", entityId: reviewId }
  });

  revalidatePath("/admin/security-reviews");
}

export default async function SecurityReviewsPage() {
  const reviews = await prisma.workflowItem.findMany({
    where: { area: "ADMIN_SECURITY" },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <Card title="Security reviews" description="Track compliance reviews and remediation items.">
        <form action={createSecurityReview} className="grid gap-3 md:grid-cols-2">
          <input name="title" placeholder="Review title" className="rounded-md border border-slate-200 p-2" required />
          <input name="owner" placeholder="Security owner" className="rounded-md border border-slate-200 p-2" required />
          <select name="severity" className="rounded-md border border-slate-200 p-2">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input name="dueDate" type="date" className="rounded-md border border-slate-200 p-2" />
          <input name="scope" placeholder="Scope / systems" className="rounded-md border border-slate-200 p-2 md:col-span-2" />
          <Button type="submit" className="md:col-span-2">Log review</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Security backlog</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {reviews.map((review) => (
            <li key={review.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{review.title}</p>
                  <p className="text-xs text-slate-500">Owner: {review.owner}</p>
                  <p className="mt-1 text-sm text-slate-600">{review.details}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  {review.status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <form action={updateSecurityStatus}>
                  <input type="hidden" name="reviewId" value={review.id} />
                  <input type="hidden" name="status" value="In progress" />
                  <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">Start</Button>
                </form>
                <form action={updateSecurityStatus}>
                  <input type="hidden" name="reviewId" value={review.id} />
                  <input type="hidden" name="status" value="Closed" />
                  <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">Close</Button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
