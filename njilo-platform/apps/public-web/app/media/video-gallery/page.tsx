import { prisma } from "@njilo/db";
import { PageHeader } from "../../../components/PageHeader";
import { Section } from "@njilo/ui";
import { VideoCard } from "../../../components/VideoCard";

export default async function VideoGalleryPage() {
  const videos = await prisma.videoItem.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main>
      <PageHeader title="Video Gallery" subtitle="Operational highlights and partner stories." />
      <Section title="Video library" subtitle="Approved internal and external videos.">
        <div className="grid gap-6 md:grid-cols-2">
          {videos.length === 0 && <p className="text-slate-600 dark:text-slate-300">No video assets yet.</p>}
          {videos.map((video) => (
            <VideoCard key={video.id} title={video.title} url={video.videoUrl} />
          ))}
        </div>
      </Section>
    </main>
  );
}
