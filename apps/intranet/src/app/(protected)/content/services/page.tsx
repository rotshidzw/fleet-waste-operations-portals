import { prisma } from "@njilo/db";

export default async function ServicesAdminPage() {
  const blocks = await prisma.serviceBlock.findMany({ orderBy: { slug: "asc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Services Content Blocks</h1>
      <div className="space-y-4">
        {blocks.map((block) => (
          <div key={block.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold">{block.slug}</p>
            <p className="mt-2 text-xs text-slate-500">Hero: {block.heroImage}</p>
            <pre className="mt-3 whitespace-pre-wrap text-xs text-slate-600">{block.content}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
