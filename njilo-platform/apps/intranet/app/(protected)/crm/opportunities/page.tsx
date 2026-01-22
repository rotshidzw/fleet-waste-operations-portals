import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createOpportunity(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "");
  const value = Number(formData.get("value") || 0);
  const stage = String(formData.get("stage") || "QUALIFY");

  await prisma.opportunity.create({
    data: { name, value, stage: stage as "QUALIFY" | "DISCOVERY" | "PROPOSAL" | "NEGOTIATION" | "WON" | "LOST" }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Opportunity", entityId: name }
  });

  revalidatePath("/crm/opportunities");
  revalidatePath("/dashboard");
}

async function deleteOpportunity(formData: FormData) {
  "use server";
  const opportunityId = String(formData.get("opportunityId") || "");
  if (!opportunityId) return;

  await prisma.opportunity.delete({ where: { id: opportunityId } });
  await prisma.auditLog.create({
    data: { action: "DELETE", entity: "Opportunity", entityId: opportunityId }
  });

  revalidatePath("/crm/opportunities");
  revalidatePath("/dashboard");
}

export default async function OpportunitiesPage() {
  const opportunities = await prisma.opportunity.findMany({ orderBy: { createdAt: "desc" } });
  const pipeline = opportunities.reduce<Record<string, typeof opportunities>>((acc, opportunity) => {
    const key = opportunity.stage;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(opportunity);
    return acc;
  }, {});

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
        <h2 className="text-lg font-semibold text-slate-900">Pipeline view</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-6">
          {["QUALIFY", "DISCOVERY", "PROPOSAL", "NEGOTIATION", "WON", "LOST"].map((stage) => (
            <div key={stage} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase text-slate-500">{stage}</p>
              <div className="mt-3 space-y-2">
                {(pipeline[stage] ?? []).map((opportunity) => (
                  <div key={opportunity.id} className="rounded-md border border-slate-200 bg-white p-2 text-xs">
                    <p className="font-semibold text-slate-900">{opportunity.name}</p>
                    <p className="text-slate-500">R{opportunity.value.toLocaleString()}</p>
                    <form action={deleteOpportunity} className="mt-2">
                      <input type="hidden" name="opportunityId" value={opportunity.id} />
                      <Button type="submit" variant="ghost" className="px-2 py-1 text-xs">
                        Delete
                      </Button>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
