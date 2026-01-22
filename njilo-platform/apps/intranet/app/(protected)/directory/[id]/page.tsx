import Link from "next/link";
import { prisma } from "@njilo/db";
import { Card } from "@njilo/ui";

export default async function EmployeeDetailPage({ params }: { params: { id: string } }) {
  const employee = await prisma.employee.findUnique({
    where: { id: params.id },
    include: { department: true, jobTitle: true }
  });

  if (!employee) {
    return (
      <Card title="Employee not found" description="This employee record does not exist." />
    );
  }

  return (
    <div className="space-y-6">
      <Card title={employee.fullName} description={employee.jobTitle.name}>
        <div className="space-y-2 text-sm text-slate-600">
          <p><span className="font-semibold text-slate-900">Department:</span> {employee.department.name}</p>
          <p><span className="font-semibold text-slate-900">Status:</span> {employee.status.replace("_", " ")}</p>
          <p><span className="font-semibold text-slate-900">Email:</span> {employee.email}</p>
          <p><span className="font-semibold text-slate-900">Phone:</span> {employee.phone || "Pending"}</p>
          <p><span className="font-semibold text-slate-900">Extension:</span> {employee.extension || "Pending"}</p>
          <p><span className="font-semibold text-slate-900">Emergency contact:</span> {employee.emergencyContact || "Pending"}</p>
        </div>
      </Card>
      <Link href="/directory" className="text-sm font-semibold text-blue-700">← Back to directory</Link>
    </div>
  );
}
