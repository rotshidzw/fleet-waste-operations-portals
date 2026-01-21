import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";

async function createTicket(formData: FormData) {
  "use server";
  const vehicleId = String(formData.get("vehicleId") || "");
  const issue = String(formData.get("issue") || "");

  if (!vehicleId) {
    return;
  }

  await prisma.maintenanceTicket.create({
    data: { vehicleId, issue, status: "Open" }
  });
}

export default async function MaintenanceTicketsPage() {
  const tickets = await prisma.maintenanceTicket.findMany({ include: { vehicle: true } });
  const vehicles = await prisma.vehicle.findMany({ orderBy: { make: "asc" } });

  return (
    <div className="space-y-6">
      <Card title="Log maintenance ticket" description="Capture maintenance issues and status.">
        <form action={createTicket} className="grid gap-3">
          <select name="vehicleId" className="rounded-md border border-slate-200 p-2" required>
            <option value="">Select vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>{vehicle.make} {vehicle.model}</option>
            ))}
          </select>
          <textarea name="issue" placeholder="Issue description" className="rounded-md border border-slate-200 p-2" rows={3} />
          <Button type="submit">Save ticket</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Tickets</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{ticket.vehicle.make} {ticket.vehicle.model}</p>
              <p className="text-slate-500">{ticket.issue} · {ticket.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
