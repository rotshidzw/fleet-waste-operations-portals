import { prisma } from "@njilo/db";

export default async function TestimonialsAdminPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Testimonials</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold">{testimonial.name}</p>
            <p className="mt-2 text-sm text-slate-600">“{testimonial.quote}”</p>
          </div>
        ))}
      </div>
    </div>
  );
}
