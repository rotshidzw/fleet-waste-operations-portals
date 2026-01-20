import { testimonials } from "@njilo/config";

export default function TestimonialsPage() {
  return (
    <div className="container-shell space-y-8 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Testimonials</h1>
        <p className="mt-3 text-sm text-slate-600">Feedback from trusted public and private sector partners.</p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="card">
            <p className="text-sm text-slate-600">“{testimonial.quote}”</p>
            <p className="mt-3 text-xs font-semibold text-slate-900">{testimonial.name}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
