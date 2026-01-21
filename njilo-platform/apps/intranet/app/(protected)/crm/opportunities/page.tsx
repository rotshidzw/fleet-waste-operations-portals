import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";

async function createOpportunity(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "");
  const value = Number(formData.get("value") || 0);
  const stage = String(formData.get("stage") || "QUALIFY");

  await prisma.opportunity.create({
    data: { name, value, stage: stage as "QUALIFY" | "DISCOVERY" | "PROPOSAL" | "NEGOTIATION" | "WON" | "LOST" }
  });
}

export default async function OpportunitiesPage() {
  const opportunities = await prisma.opportunity.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="New opportunity" description="Track pipeline value and stage.">
        <form action={createOpportunity} className="grid gap-3 md:grid-cols-2">
          <input name="name" placeholder="Opportunity name" className="rounded-md border border-slate-200 p-2" required />
          <input name="value" type="number" placeholder="Value" className="rounded-md border border-slate-200 p-2" required />
          <select name="stage" className="rounded-md border border-slate-200 p-2 md:col-span-2">
            <option value="QUALIFY">Qualify</option>
            <option value="DISCOVERY">Discovery</option>
            <option value="PROPOSAL">Proposal</option>
            <option value="NEGOTIATION">Negotiation</option>
            <option value="WON">Won</option>
            <option value="LOST">Lost</option>
          </select>
          <Button type="submit" className="md:col-span-2">Save opportunity</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Opportunities</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {opportunities.map((opportunity) => (
            <li key={opportunity.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{opportunity.name}</p>
              <p className="text-slate-500">{opportunity.stage} · R{opportunity.value.toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
