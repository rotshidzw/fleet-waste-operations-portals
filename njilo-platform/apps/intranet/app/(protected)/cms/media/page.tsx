import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createMedia(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "");
  const imageUrl = String(formData.get("imageUrl") || "");

  await prisma.mediaItem.create({
    data: { title, imageUrl }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "MediaItem", entityId: title }
  });

  revalidatePath("/cms/media");
  revalidatePath("/media/media-gallery");
}

export default async function MediaPage() {
  const items = await prisma.mediaItem.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Add media item" description="Upload gallery imagery.">
        <form action={createMedia} className="grid gap-3">
          <input name="title" placeholder="Title" className="rounded-md border border-slate-200 p-2" required />
          <input name="imageUrl" placeholder="Image URL" className="rounded-md border border-slate-200 p-2" required />
          <Button type="submit">Save media</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Media items</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((item) => (
            <li key={item.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="text-slate-500">{item.imageUrl}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
