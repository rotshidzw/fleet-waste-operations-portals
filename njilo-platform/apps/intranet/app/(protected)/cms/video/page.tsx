import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";

async function createVideo(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "");
  const videoUrl = String(formData.get("videoUrl") || "");

  await prisma.videoItem.create({
    data: { title, videoUrl }
  });
}

export default async function VideoPage() {
  const items = await prisma.videoItem.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Add video" description="Add YouTube/Vimeo or local mp4 links.">
        <form action={createVideo} className="grid gap-3">
          <input name="title" placeholder="Title" className="rounded-md border border-slate-200 p-2" required />
          <input name="videoUrl" placeholder="Video URL" className="rounded-md border border-slate-200 p-2" required />
          <Button type="submit">Save video</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Video items</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((item) => (
            <li key={item.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="text-slate-500">{item.videoUrl}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
