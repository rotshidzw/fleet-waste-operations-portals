import { prisma } from "@njilo/db";

export default async function PublicationsAdminPage() {
  const publications = await prisma.publication.findMany({ orderBy: { date: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Publications</h1>
      <div className="space-y-4">
        {publications.map((publication) => (
          <div key={publication.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-xs text-slate-500">{publication.date.toDateString()}</p>
            <p className="text-sm font-semibold">{publication.title}</p>
            <p className="mt-2 text-sm text-slate-600">{publication.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
