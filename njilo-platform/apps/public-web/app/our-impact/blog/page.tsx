import Link from "next/link";
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
          {posts.length === 0 && <p className="text-slate-600">No blog posts yet.</p>}
          {posts.map((post) => (
            <Card key={post.id} title={post.title} description={post.summary}>
              <Link href={`/our-impact/blog/${post.slug}`} className="text-sm font-semibold text-blue-700">
                Read more →
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
