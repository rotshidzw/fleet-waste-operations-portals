import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createNote(formData: FormData) {
  "use server";
  const summary = String(formData.get("summary") || "").trim();
  const category = String(formData.get("category") || "General").trim();
  const severity = String(formData.get("severity") || "Medium").trim();
  const owner = String(formData.get("owner") || "").trim();
  const status = String(formData.get("status") || "Open").trim();
  const action = String(formData.get("action") || "").trim();
  const dueDate = String(formData.get("dueDate") || "").trim();

  if (!summary || !owner) {
    return;
  }

  const note = [
    `Summary: ${summary}`,
    `Category: ${category}`,
    `Severity: ${severity}`,
    `Owner: ${owner}`,
    `Status: ${status}`,
    `Next step: ${action || "Pending remediation"}`,
    `Due: ${dueDate || "Not scheduled"}`
  ].join("\n");

  await prisma.complianceNote.create({
    data: { note }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "ComplianceNote", entityId: summary.slice(0, 24) }
  });

  revalidatePath("/waste-ops/compliance-notes");
}

async function deleteNote(formData: FormData) {
  "use server";
  const noteId = String(formData.get("noteId") || "").trim();

  if (!noteId) {
    return;
  }

  await prisma.complianceNote.delete({ where: { id: noteId } });
  await prisma.auditLog.create({
    data: { action: "DELETE", entity: "ComplianceNote", entityId: noteId }
  });

  revalidatePath("/waste-ops/compliance-notes");
}

async function updateNoteStatus(formData: FormData) {
  "use server";
  const noteId = String(formData.get("noteId") || "").trim();
  const status = String(formData.get("status") || "").trim();

  if (!noteId || !status) {
    return;
  }

  const existing = await prisma.complianceNote.findUnique({ where: { id: noteId } });
  if (!existing) {
    return;
  }

  const updatedNote = existing.note.replace(/Status: .*/i, `Status: ${status}`);

  await prisma.complianceNote.update({
    where: { id: noteId },
    data: { note: updatedNote }
  });

  await prisma.auditLog.create({
    data: { action: "UPDATE", entity: "ComplianceNote", entityId: noteId }
  });

  revalidatePath("/waste-ops/compliance-notes");
}

export default async function ComplianceNotesPage() {
  const notes = await prisma.complianceNote.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Compliance register" description="Log audits, actions, and remediation steps.">
        <form action={createNote} className="grid gap-3 md:grid-cols-2">
          <input name="summary" placeholder="Summary" className="rounded-md border border-slate-200 p-2" required />
          <input name="owner" placeholder="Compliance owner" className="rounded-md border border-slate-200 p-2" required />
          <select name="category" className="rounded-md border border-slate-200 p-2">
            <option value="General">General</option>
            <option value="Safety">Safety</option>
            <option value="Environmental">Environmental</option>
            <option value="Quality">Quality</option>
          </select>
          <select name="severity" className="rounded-md border border-slate-200 p-2">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select name="status" className="rounded-md border border-slate-200 p-2">
            <option value="Open">Open</option>
            <option value="In progress">In progress</option>
            <option value="Closed">Closed</option>
          </select>
          <input name="dueDate" type="date" className="rounded-md border border-slate-200 p-2" />
          <textarea name="action" placeholder="Remediation plan" className="rounded-md border border-slate-200 p-2 md:col-span-2" rows={3} />
          <Button type="submit" className="md:col-span-2">Save note</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Compliance notes</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {notes.map((note) => (
            <li key={note.id} className="flex flex-col gap-3 border-b border-slate-100 pb-3 text-slate-600">
              <span className="whitespace-pre-line">{note.note}</span>
              <div className="flex flex-wrap gap-2">
                <form action={updateNoteStatus}>
                  <input type="hidden" name="noteId" value={note.id} />
                  <input type="hidden" name="status" value="In progress" />
                  <Button type="submit" variant="ghost" className="px-2 py-1 text-xs">
                    Mark in progress
                  </Button>
                </form>
                <form action={updateNoteStatus}>
                  <input type="hidden" name="noteId" value={note.id} />
                  <input type="hidden" name="status" value="Closed" />
                  <Button type="submit" variant="ghost" className="px-2 py-1 text-xs">
                    Close
                  </Button>
                </form>
                <form action={deleteNote}>
                  <input type="hidden" name="noteId" value={note.id} />
                  <Button type="submit" variant="ghost" className="px-2 py-1 text-xs">
                    Delete
                  </Button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
