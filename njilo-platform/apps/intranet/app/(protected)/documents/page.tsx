import Link from "next/link";
import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createDocument(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "HR").trim();
  const status = String(formData.get("status") || "DRAFT").trim();
  const version = String(formData.get("version") || "1.0").trim();
  const owner = String(formData.get("owner") || "").trim();
  const expiresAt = String(formData.get("expiresAt") || "").trim();
  const fileRef = String(formData.get("fileRef") || "").trim();

  if (!title || !owner) {
    return;
  }

  await prisma.document.create({
    data: {
      title,
      category: category as "HR" | "CONTRACTS" | "COMPLIANCE" | "FINANCE" | "FLEET" | "SAFETY",
      status: status as "DRAFT" | "APPROVED" | "ARCHIVED",
      version,
      owner,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      fileRef: fileRef || null
    }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Document", entityId: title }
  });

  revalidatePath("/documents");
}

export default async function DocumentsPage() {
  const documents = await prisma.document.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Document hub" description="Track document metadata and compliance expiries.">
        <form action={createDocument} className="grid gap-3 md:grid-cols-2">
          <input name="title" placeholder="Document title" className="rounded-md border border-slate-200 p-2" required />
          <input name="owner" placeholder="Owner" className="rounded-md border border-slate-200 p-2" required />
          <select name="category" className="rounded-md border border-slate-200 p-2">
            <option value="HR">HR</option>
            <option value="CONTRACTS">Contracts</option>
            <option value="COMPLIANCE">Compliance</option>
            <option value="FINANCE">Finance</option>
            <option value="FLEET">Fleet</option>
            <option value="SAFETY">Safety</option>
          </select>
          <select name="status" className="rounded-md border border-slate-200 p-2">
            <option value="DRAFT">Draft</option>
            <option value="APPROVED">Approved</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <input name="version" placeholder="Version" className="rounded-md border border-slate-200 p-2" />
          <input name="expiresAt" type="date" className="rounded-md border border-slate-200 p-2" />
          <input name="fileRef" placeholder="File reference" className="rounded-md border border-slate-200 p-2 md:col-span-2" />
          <Button type="submit" className="md:col-span-2">Save document</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Documents</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {documents.map((doc) => (
            <li key={doc.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">{doc.title}</p>
                <p className="text-slate-500">{doc.category} · v{doc.version}</p>
                <p className="text-xs text-slate-400">Owner: {doc.owner} · Status: {doc.status}</p>
              </div>
              <Link href={`/documents/${doc.id}`} className="text-xs font-semibold text-blue-700">View</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
