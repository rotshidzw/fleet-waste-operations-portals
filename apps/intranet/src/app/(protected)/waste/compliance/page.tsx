import { prisma } from "@njilo/db";

export default async function WasteCompliancePage() {
  const notes = await prisma.complianceNote.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Compliance Notes</h1>
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-600">{note.summary}</p>
            <p className="mt-2 text-xs text-slate-500">{note.createdAt.toDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
