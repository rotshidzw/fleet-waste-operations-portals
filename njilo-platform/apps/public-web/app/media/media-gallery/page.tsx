import Image from "next/image";
import { prisma } from "@njilo/db";
import { PageHeader } from "../../../components/PageHeader";
import { Section } from "@njilo/ui";

export default async function MediaGalleryPage() {
  const items = await prisma.mediaItem.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main>
      <PageHeader title="Media Gallery" subtitle="Visual coverage of fleet and waste operations." />
      <Section title="Gallery" subtitle="Latest approved imagery.">
        <div className="grid gap-6 md:grid-cols-3">
          {items.length === 0 && <p className="text-slate-600">No media assets yet.</p>}
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-xl border border-slate-200">
              <div className="relative h-48">
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4 text-sm text-slate-700">{item.title}</div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
