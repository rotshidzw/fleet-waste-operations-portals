import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createEquipment(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const serialNo = String(formData.get("serialNo") || "").trim();
  const status = String(formData.get("status") || "Available").trim();

  if (!name) {
    return;
  }

  await prisma.equipment.create({
    data: { name, serialNo, status }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Equipment", entityId: serialNo || name }
  });

  revalidatePath("/waste-ops/equipment");
}

async function deleteEquipment(formData: FormData) {
  "use server";
  const equipmentId = String(formData.get("equipmentId") || "").trim();

  if (!equipmentId) {
    return;
  }

  await prisma.equipment.delete({ where: { id: equipmentId } });
  await prisma.auditLog.create({
    data: { action: "DELETE", entity: "Equipment", entityId: equipmentId }
  });

  revalidatePath("/waste-ops/equipment");
}

export default async function EquipmentPage() {
  const equipment = await prisma.equipment.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Register equipment" description="Track waste equipment assets and approval status.">
        <form action={createEquipment} className="grid gap-3 md:grid-cols-2">
          <input name="name" placeholder="Equipment name" className="rounded-md border border-slate-200 p-2" required />
          <input name="serialNo" placeholder="Serial number" className="rounded-md border border-slate-200 p-2" />
          <select name="status" className="rounded-md border border-slate-200 p-2 md:col-span-2">
            <option value="Available">Available</option>
            <option value="Pending approval">Pending approval</option>
            <option value="In service">In service</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          <Button type="submit" className="md:col-span-2">Save equipment</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Equipment register</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {equipment.map((item) => (
            <li key={item.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="text-slate-500">{item.serialNo || "Serial pending"} · {item.status}</p>
              </div>
              <form action={deleteEquipment}>
                <input type="hidden" name="equipmentId" value={item.id} />
                <Button type="submit" variant="ghost" className="px-3 py-1 text-xs">
                  Delete
                </Button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
