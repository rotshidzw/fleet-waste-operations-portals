import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";

async function createPost(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || "");
  const summary = String(formData.get("summary") || "");
  const body = String(formData.get("body") || "");

  await prisma.blogPost.create({
    data: { title, slug, summary, body }
  });
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Add blog post" description="Publish leadership updates.">
        <form action={createPost} className="grid gap-3">
          <input name="title" placeholder="Title" className="rounded-md border border-slate-200 p-2" required />
          <input name="slug" placeholder="Slug" className="rounded-md border border-slate-200 p-2" required />
          <input name="summary" placeholder="Summary" className="rounded-md border border-slate-200 p-2" required />
          <textarea name="body" placeholder="Markdown body" className="rounded-md border border-slate-200 p-2" rows={4} />
          <Button type="submit">Save post</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Blog posts</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {posts.map((post) => (
            <li key={post.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{post.title}</p>
              <p className="text-slate-500">{post.slug}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
