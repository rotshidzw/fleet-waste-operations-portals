import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createReview(formData: FormData) {
  "use server";
  const employee = String(formData.get("employee") || "").trim();
  const manager = String(formData.get("manager") || "").trim();
  const period = String(formData.get("period") || "").trim();
  const rating = String(formData.get("rating") || "Meets expectations").trim();
  const summary = String(formData.get("summary") || "").trim();

  if (!employee || !manager || !period) {
    return;
  }

  await prisma.workflowItem.create({
    data: {
      area: "HR_PERFORMANCE",
      title: `${employee} · ${period}`,
      owner: manager,
      status: "Draft",
      details: `Rating: ${rating}. Summary: ${summary || "Pending manager notes"}.`
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "PerformanceReview", entityId: employee }
  });

  revalidatePath("/hr/performance");
}

async function updateReviewStatus(formData: FormData) {
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
    data: { action: "UPDATE", entity: "PerformanceReview", entityId: reviewId }
  });

  revalidatePath("/hr/performance");
}

export default async function PerformancePage() {
  const reviews = await prisma.workflowItem.findMany({
    where: { area: "HR_PERFORMANCE" },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <Card title="Performance reviews" description="Track review cycles and calibration notes.">
        <form action={createReview} className="grid gap-3 md:grid-cols-2">
          <input name="employee" placeholder="Employee name" className="rounded-md border border-slate-200 p-2" required />
          <input name="manager" placeholder="Review lead" className="rounded-md border border-slate-200 p-2" required />
          <input name="period" placeholder="Review period (e.g. Q2 2024)" className="rounded-md border border-slate-200 p-2" required />
          <select name="rating" className="rounded-md border border-slate-200 p-2">
            <option value="Exceeds expectations">Exceeds expectations</option>
            <option value="Meets expectations">Meets expectations</option>
            <option value="Needs development">Needs development</option>
          </select>
          <textarea name="summary" placeholder="Highlights and development plan" className="rounded-md border border-slate-200 p-2 md:col-span-2" rows={3} />
          <Button type="submit" className="md:col-span-2">Save review</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Review pipeline</h2>
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
                <form action={updateReviewStatus}>
                  <input type="hidden" name="reviewId" value={review.id} />
                  <input type="hidden" name="status" value="Submitted" />
                  <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">Submit</Button>
                </form>
                <form action={updateReviewStatus}>
                  <input type="hidden" name="reviewId" value={review.id} />
                  <input type="hidden" name="status" value="Finalized" />
                  <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">Finalize</Button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
