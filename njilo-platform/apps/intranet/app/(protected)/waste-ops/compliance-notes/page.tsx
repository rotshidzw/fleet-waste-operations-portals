import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createNote(formData: FormData) {
  "use server";
  const note = String(formData.get("note") || "");

  await prisma.complianceNote.create({
    data: { note }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "ComplianceNote", entityId: note.slice(0, 24) }
  });

  revalidatePath("/waste-ops/compliance-notes");
}

export default async function ComplianceNotesPage() {
  const notes = await prisma.complianceNote.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Add compliance note" description="Log compliance observations and actions.">
        <form action={createNote} className="grid gap-3">
          <textarea name="note" placeholder="Compliance note" className="rounded-md border border-slate-200 p-2" rows={4} />
          <Button type="submit">Save note</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Compliance notes</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {notes.map((note) => (
            <li key={note.id} className="border-b border-slate-100 pb-3 text-slate-600">
              {note.note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
