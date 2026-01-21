import { prisma } from "@njilo/db";

export default async function VideosAdminPage() {
  const videos = await prisma.videoItem.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Video Gallery</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {videos.map((video) => (
          <div key={video.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold">{video.title}</p>
            <p className="mt-2 text-xs text-slate-500">Provider: {video.provider}</p>
            <p className="mt-2 text-xs text-slate-500">{video.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
