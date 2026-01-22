import Link from "next/link";
import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createEmployee(formData: FormData) {
  "use server";
  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const extension = String(formData.get("extension") || "").trim();
  const emergencyContact = String(formData.get("emergencyContact") || "").trim();
  const status = String(formData.get("status") || "ACTIVE").trim();
  const departmentId = String(formData.get("departmentId") || "").trim();
  const jobTitleId = String(formData.get("jobTitleId") || "").trim();

  if (!fullName || !email || !departmentId || !jobTitleId) {
    return;
  }

  await prisma.employee.create({
    data: {
      fullName,
      email,
      phone: phone || null,
      extension: extension || null,
      emergencyContact: emergencyContact || null,
      status: status as "ACTIVE" | "ON_LEAVE" | "LEFT",
      departmentId,
      jobTitleId
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Employee", entityId: email }
  });

  revalidatePath("/directory");
}

export default async function DirectoryPage() {
  const employees = await prisma.employee.findMany({
    include: { department: true, jobTitle: true },
    orderBy: { createdAt: "desc" }
  });
  const departments = await prisma.department.findMany({ orderBy: { name: "asc" } });
  const jobTitles = await prisma.jobTitle.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="space-y-6">
      <Card title="Company directory" description="Maintain employee contact details and status.">
        <form action={createEmployee} className="grid gap-3 md:grid-cols-2">
          <input name="fullName" placeholder="Full name" className="rounded-md border border-slate-200 p-2" required />
          <input name="email" type="email" placeholder="Email" className="rounded-md border border-slate-200 p-2" required />
          <input name="phone" placeholder="Phone" className="rounded-md border border-slate-200 p-2" />
          <input name="extension" placeholder="Extension" className="rounded-md border border-slate-200 p-2" />
          <input name="emergencyContact" placeholder="Emergency contact" className="rounded-md border border-slate-200 p-2" />
          <select name="status" className="rounded-md border border-slate-200 p-2">
            <option value="ACTIVE">Active</option>
            <option value="ON_LEAVE">On leave</option>
            <option value="LEFT">Left</option>
          </select>
          <select name="departmentId" className="rounded-md border border-slate-200 p-2" required>
            <option value="">Department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>{department.name}</option>
            ))}
          </select>
          <select name="jobTitleId" className="rounded-md border border-slate-200 p-2 md:col-span-2" required>
            <option value="">Job title</option>
            {jobTitles.map((title) => (
              <option key={title.id} value={title.id}>{title.name}</option>
            ))}
          </select>
          <Button type="submit" className="md:col-span-2">Add employee</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Employees</h2>
          <span className="text-xs text-slate-500">{employees.length} records</span>
        </div>
        <ul className="mt-4 space-y-3 text-sm">
          {employees.map((employee) => (
            <li key={employee.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{employee.fullName}</p>
                <p className="text-slate-500">{employee.jobTitle.name} · {employee.department.name}</p>
                <p className="text-xs text-slate-400">{employee.email} · {employee.phone || "Phone pending"}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs text-slate-500">{employee.status.replace("_", " ")}</span>
                <Link href={`/directory/${employee.id}`} className="text-xs font-semibold text-blue-700">View</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
