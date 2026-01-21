import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";

async function createEquipment(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "");
  const serialNo = String(formData.get("serialNo") || "");

  await prisma.equipment.create({
    data: { name, serialNo, status: "Available" }
  });
}

export default async function EquipmentPage() {
  const equipment = await prisma.equipment.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Register equipment" description="Track waste equipment assets.">
        <form action={createEquipment} className="grid gap-3 md:grid-cols-2">
          <input name="name" placeholder="Equipment name" className="rounded-md border border-slate-200 p-2" required />
          <input name="serialNo" placeholder="Serial number" className="rounded-md border border-slate-200 p-2" />
          <Button type="submit" className="md:col-span-2">Save equipment</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Equipment register</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {equipment.map((item) => (
            <li key={item.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{item.name}</p>
              <p className="text-slate-500">{item.serialNo} · {item.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
