import { prisma } from "@njilo/db";
import { Button, Card } from "@njilo/ui";

async function createTestimonial(formData: FormData) {
  "use server";
  const client = String(formData.get("client") || "");
  const quote = String(formData.get("quote") || "");
  const role = String(formData.get("role") || "");

  await prisma.testimonial.create({
    data: { client, quote, role }
  });
}

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Card title="Add testimonial" description="Add client quotes for public site.">
        <form action={createTestimonial} className="grid gap-3">
          <input name="client" placeholder="Client name" className="rounded-md border border-slate-200 p-2" required />
          <input name="role" placeholder="Role" className="rounded-md border border-slate-200 p-2" />
          <textarea name="quote" placeholder="Quote" className="rounded-md border border-slate-200 p-2" rows={3} />
          <Button type="submit">Save testimonial</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Testimonials</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id} className="border-b border-slate-100 pb-3">
              <p className="font-semibold text-slate-900">{testimonial.client}</p>
              <p className="text-slate-500">{testimonial.quote}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
