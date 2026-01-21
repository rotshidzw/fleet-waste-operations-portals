import { prisma } from "@njilo/db";

export default async function PartnerLogosPage() {
  const partners = await prisma.partnerLogo.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Partner Logos</h1>
      <div className="grid gap-4 md:grid-cols-4">
        {partners.map((partner) => (
          <div key={partner.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold">{partner.name}</p>
            <p className="mt-1 text-xs text-slate-500">{partner.imageUrl}</p>
            <p className="mt-2 text-xs text-slate-500">Order: {partner.order}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
