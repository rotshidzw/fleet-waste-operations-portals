import { prisma } from "@njilo/db";

export default async function DocumentsPage() {
  const documents = await prisma.document.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Documents</h1>
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-4 gap-4 border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>Title</span>
          <span>Folder</span>
          <span>Role</span>
          <span>URL</span>
        </div>
        {documents.map((doc) => (
          <div key={doc.id} className="grid grid-cols-4 gap-4 border-b border-slate-100 px-4 py-3 text-sm">
            <span>{doc.title}</span>
            <span>{doc.folder}</span>
            <span>{doc.role}</span>
            <span className="text-slate-500">{doc.url}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
