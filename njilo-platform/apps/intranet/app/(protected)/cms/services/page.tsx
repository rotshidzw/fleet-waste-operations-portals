import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";
import { revalidatePath } from "next/cache";

async function createService(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || "");
  const category = String(formData.get("category") || "");
  const summary = String(formData.get("summary") || "");
  const body = String(formData.get("body") || "");
  const heroImage = String(formData.get("heroImage") || "");

  await prisma.service.create({
    data: { title, slug, category, summary, body, heroImage }
  });

  await prisma.auditLog.create({
    data: { action: "CREATE", entity: "Service", entityId: slug }
  });

  revalidatePath("/cms/services");
  revalidatePath("/our-services");
}

export default async function ServicesCmsPage() {
  const services = await prisma.service.findMany({ orderBy: { title: "asc" } });

  return (
    <div className="space-y-6">
      <Card title="Add service" description="Manage services displayed on the public site.">
        <form action={createService} className="grid gap-3">
          <input name="title" placeholder="Title" className="rounded-md border border-slate-200 p-2" required />
          <input name="slug" placeholder="Slug" className="rounded-md border border-slate-200 p-2" required />
          <input name="category" placeholder="Category" className="rounded-md border border-slate-200 p-2" required />
          <input name="summary" placeholder="Summary" className="rounded-md border border-slate-200 p-2" required />
          <input name="heroImage" placeholder="Hero image URL" className="rounded-md border border-slate-200 p-2" required />
          <textarea name="body" placeholder="Markdown body" className="rounded-md border border-slate-200 p-2" rows={4} />
          <Button type="submit">Save service</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Services</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {services.map((service) => (
            <li key={service.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{service.title}</p>
              <p className="text-slate-500">{service.category} · {service.slug}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
