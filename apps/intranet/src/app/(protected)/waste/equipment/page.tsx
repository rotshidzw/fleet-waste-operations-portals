import { prisma } from "@njilo/db";

export default async function WasteEquipmentPage() {
  const equipment = await prisma.equipment.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Equipment Register</h1>
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-3 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>Name</span>
          <span>Type</span>
          <span>Status</span>
        </div>
        {equipment.map((item) => (
          <div key={item.id} className="grid grid-cols-3 gap-4 border-b border-slate-100 px-4 py-3 text-sm">
            <span>{item.name}</span>
            <span>{item.type}</span>
            <span>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
