import Link from "next/link";
import { prisma } from "@njilo/db";
import { Card } from "@njilo/ui";

export default async function DocumentDetailPage({ params }: { params: { id: string } }) {
  const document = await prisma.document.findUnique({ where: { id: params.id } });

  if (!document) {
    return <Card title="Document not found" description="No document record found." />;
  }

  return (
    <div className="space-y-6">
      <Card title={document.title} description={`Category: ${document.category}`}>
        <div className="space-y-2 text-sm text-slate-600">
          <p><span className="font-semibold text-slate-900">Owner:</span> {document.owner}</p>
          <p><span className="font-semibold text-slate-900">Status:</span> {document.status}</p>
          <p><span className="font-semibold text-slate-900">Version:</span> {document.version}</p>
          <p><span className="font-semibold text-slate-900">Expiry:</span> {document.expiresAt?.toDateString() || "None"}</p>
          <p><span className="font-semibold text-slate-900">File:</span> {document.fileRef || "Placeholder"}</p>
        </div>
      </Card>
      <Link href="/documents" className="text-sm font-semibold text-blue-700">← Back to documents</Link>
    </div>
  );
}
