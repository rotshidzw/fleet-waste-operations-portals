import { prisma } from "@njilo/db";

export default async function WorkOrdersPage() {
  const workOrders = await prisma.workOrder.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Maintenance Requests / Work Orders</h1>
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-3 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>Title</span>
          <span>Status</span>
          <span>Vehicle</span>
        </div>
        {workOrders.map((order) => (
          <div key={order.id} className="grid grid-cols-3 gap-4 border-b border-slate-100 px-4 py-3 text-sm">
            <span>{order.title}</span>
            <span>{order.status}</span>
            <span>{order.vehicleId ?? "-"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
