import { prisma } from "@njilo/db";

export default async function MediaAdminPage() {
  const items = await prisma.mediaItem.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Media Gallery</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold">{item.title}</p>
            <p className="mt-2 text-xs text-slate-500">{item.type}</p>
            <p className="mt-2 text-xs text-slate-500">{item.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
