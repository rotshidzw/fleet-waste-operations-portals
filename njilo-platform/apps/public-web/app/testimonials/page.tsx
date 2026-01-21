import { prisma } from "@njilo/db";
import { PageHeader } from "../../components/PageHeader";
import { Section, Card } from "@njilo/ui";

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main>
      <PageHeader title="Client Testimonials" subtitle="Measured outcomes across enterprise portfolios." />
      <Section title="What clients say" subtitle="Feedback from public and private sector partners.">
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} title={testimonial.client} description={testimonial.quote}>
              <p className="text-xs text-slate-500">{testimonial.role}</p>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
