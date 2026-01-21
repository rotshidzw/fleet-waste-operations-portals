import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";

async function createVehicle(formData: FormData) {
  "use server";
  const vin = String(formData.get("vin") || "");
  const make = String(formData.get("make") || "");
  const model = String(formData.get("model") || "");
  const year = Number(formData.get("year") || 0);

  await prisma.vehicle.create({
    data: { vin, make, model, year, status: "Active" }
  });
}

export default async function VehiclesPage() {
  const vehicles = await prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Register vehicle" description="Add fleet assets to the register.">
        <form action={createVehicle} className="grid gap-3 md:grid-cols-2">
          <input name="vin" placeholder="VIN" className="rounded-md border border-slate-200 p-2" required />
          <input name="make" placeholder="Make" className="rounded-md border border-slate-200 p-2" required />
          <input name="model" placeholder="Model" className="rounded-md border border-slate-200 p-2" required />
          <input name="year" type="number" placeholder="Year" className="rounded-md border border-slate-200 p-2" required />
          <Button type="submit" className="md:col-span-2">Save vehicle</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Vehicles</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {vehicles.map((vehicle) => (
            <li key={vehicle.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{vehicle.make} {vehicle.model}</p>
              <p className="text-slate-500">{vehicle.vin} · {vehicle.year} · {vehicle.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
