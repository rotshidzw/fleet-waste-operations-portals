import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";

async function createPublication(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "");
  const summary = String(formData.get("summary") || "");
  const body = String(formData.get("body") || "");
  const pdfUrl = String(formData.get("pdfUrl") || "");

  await prisma.publication.create({
    data: { title, summary, body, pdfUrl }
  });
}

export default async function PublicationsPage() {
  const publications = await prisma.publication.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Add publication" description="Upload reports or thought leadership pieces.">
        <form action={createPublication} className="grid gap-3">
          <input name="title" placeholder="Title" className="rounded-md border border-slate-200 p-2" required />
          <input name="summary" placeholder="Summary" className="rounded-md border border-slate-200 p-2" required />
          <textarea name="body" placeholder="Markdown body" className="rounded-md border border-slate-200 p-2" rows={4} />
          <input name="pdfUrl" placeholder="PDF URL (optional)" className="rounded-md border border-slate-200 p-2" />
          <Button type="submit">Save publication</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Publications</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {publications.map((publication) => (
            <li key={publication.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{publication.title}</p>
              <p className="text-slate-500">{publication.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
