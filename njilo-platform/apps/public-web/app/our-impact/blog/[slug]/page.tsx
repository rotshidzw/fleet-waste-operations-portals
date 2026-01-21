import { prisma } from "@njilo/db";
import { PageHeader } from "../../../../components/PageHeader";
import { Section } from "@njilo/ui";

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });

  if (!post) {
    return (
      <main>
        <PageHeader title="Post not found" />
      </main>
    );
  }

  return (
    <main>
      <PageHeader title={post.title} subtitle={post.summary} />
      <Section title="Article" subtitle="">
        <div className="prose max-w-none text-slate-700">
          <p>{post.body}</p>
        </div>
      </Section>
    </main>
  );
}
