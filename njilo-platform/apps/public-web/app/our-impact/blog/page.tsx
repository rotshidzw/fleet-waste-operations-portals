import Link from "next/link";
import Image from "next/image";
import { prisma } from "@njilo/db";
import { PageHeader } from "../../../components/PageHeader";
import { Section, Card } from "@njilo/ui";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main>
      <PageHeader title="Njilo Insights" subtitle="Leadership perspectives on fleet and waste operations." />
      <Section title="Latest posts" subtitle="Enterprise insights and operational updates.">
        <div className="grid gap-6 md:grid-cols-2">
          {posts.length === 0 && <p className="text-slate-600 dark:text-slate-300">No blog posts yet.</p>}
          {posts.map((post) => (
            <Card key={post.id} title={post.title} description={post.summary}>
              <Link href={`/our-impact/blog/${post.slug}`} className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                Read more →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Why we publish" subtitle="Sharing playbooks, regulatory updates, and operational benchmarks.">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <p>
              Our insights are designed for fleet, waste, and compliance leaders who need practical guidance
              across safety, cost containment, and ESG targets.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Card title="Executive briefs" description="Board-ready summaries and compliance dashboards." />
              <Card title="Operational playbooks" description="Service level templates and SOP guidance." />
            </div>
          </div>
          <div className="relative min-h-[240px] overflow-hidden rounded-2xl">
            <Image
              src="/media/trucks/compliance-check.svg"
              alt="Operational insights"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </Section>
    </main>
  );
}
