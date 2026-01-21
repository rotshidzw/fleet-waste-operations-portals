import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createLeaveRequest(formData: FormData) {
  "use server";
  const employee = String(formData.get("employee") || "").trim();
  const manager = String(formData.get("manager") || "").trim();
  const leaveType = String(formData.get("leaveType") || "Annual").trim();
  const startDate = String(formData.get("startDate") || "").trim();
  const endDate = String(formData.get("endDate") || "").trim();
  const reason = String(formData.get("reason") || "").trim();

  if (!employee || !manager || !startDate || !endDate) {
    return;
  }

  await prisma.workflowItem.create({
    data: {
      area: "HR_LEAVE",
      title: `${employee} · ${leaveType}`,
      owner: manager,
      status: "Pending approval",
      details: `Dates: ${startDate} → ${endDate}. Reason: ${reason || "Not provided"}.`,
      dueDate: new Date(endDate)
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "LeaveRequest", entityId: employee }
  });

  revalidatePath("/hr/leave");
}

async function updateLeaveStatus(formData: FormData) {
  "use server";
  const requestId = String(formData.get("requestId") || "").trim();
  const status = String(formData.get("status") || "").trim();

  if (!requestId || !status) {
    return;
  }

  await prisma.workflowItem.update({
    where: { id: requestId },
    data: { status }
  });

  await prisma.auditLog.create({
    data: { action: "UPDATE", entity: "LeaveRequest", entityId: requestId }
  });

  revalidatePath("/hr/leave");
}

async function deleteLeaveRequest(formData: FormData) {
  "use server";
  const requestId = String(formData.get("requestId") || "").trim();

  if (!requestId) {
    return;
  }

  await prisma.workflowItem.delete({ where: { id: requestId } });
  await prisma.auditLog.create({
    data: { action: "DELETE", entity: "LeaveRequest", entityId: requestId }
  });

  revalidatePath("/hr/leave");
}

export default async function LeavePage() {
  const requests = await prisma.workflowItem.findMany({
    where: { area: "HR_LEAVE" },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <Card title="Leave requests" description="Capture leave requests and route for approval.">
        <form action={createLeaveRequest} className="grid gap-3 md:grid-cols-2">
          <input name="employee" placeholder="Employee name" className="rounded-md border border-slate-200 p-2" required />
          <input name="manager" placeholder="Approving manager" className="rounded-md border border-slate-200 p-2" required />
          <select name="leaveType" className="rounded-md border border-slate-200 p-2">
            <option value="Annual">Annual leave</option>
            <option value="Sick">Sick leave</option>
            <option value="Family">Family responsibility</option>
            <option value="Study">Study leave</option>
          </select>
          <input name="startDate" type="date" className="rounded-md border border-slate-200 p-2" required />
          <input name="endDate" type="date" className="rounded-md border border-slate-200 p-2" required />
          <textarea name="reason" placeholder="Reason / handover notes" className="rounded-md border border-slate-200 p-2 md:col-span-2" rows={3} />
          <Button type="submit" className="md:col-span-2">Submit request</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Pending and approved leave</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {requests.map((request) => (
            <li key={request.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{request.title}</p>
                  <p className="text-xs text-slate-500">Owner: {request.owner}</p>
                  <p className="mt-1 text-sm text-slate-600">{request.details}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  {request.status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <form action={updateLeaveStatus}>
                  <input type="hidden" name="requestId" value={request.id} />
                  <input type="hidden" name="status" value="Approved" />
                  <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">Approve</Button>
                </form>
                <form action={updateLeaveStatus}>
                  <input type="hidden" name="requestId" value={request.id} />
                  <input type="hidden" name="status" value="Declined" />
                  <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">Decline</Button>
                </form>
                <form action={deleteLeaveRequest}>
                  <input type="hidden" name="requestId" value={request.id} />
                  <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">Remove</Button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
