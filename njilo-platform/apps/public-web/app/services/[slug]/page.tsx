import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@njilo/db";
import { PageHeader } from "../../../components/PageHeader";
import { Section, Card, Button } from "@njilo/ui";

async function requestQuote(formData: FormData) {
  "use server";
  const fullName = String(formData.get("fullName") || "");
  const email = String(formData.get("email") || "");
  const phone = String(formData.get("phone") || "");
  const companyName = String(formData.get("companyName") || "");
  const message = String(formData.get("message") || "");

  await prisma.lead.create({
    data: {
      fullName,
      email,
      phone,
      companyName,
      department: "SALES",
      message,
      source: "request-quote"
    }
  });
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await prisma.service.findUnique({ where: { slug: params.slug } });

  if (!service) {
    notFound();
  }

  return (
    <main>
      <PageHeader title={service.title} subtitle={service.summary} />
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="relative h-72 overflow-hidden rounded-2xl">
          <Image src={service.heroImage} alt={service.title} fill className="object-cover" />
        </div>
      </section>

      <Section title="Overview" subtitle="Service delivery outcomes and governance alignment.">
        <div className="prose max-w-none text-slate-700">
          <p>{service.body}</p>
        </div>
      </Section>

      <Section title="Benefits" subtitle="Operational value delivered with every engagement.">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            "Predictable costs and reporting",
            "Compliance-ready documentation",
            "Dedicated account management"
          ].map((benefit) => (
            <Card key={benefit} title={benefit} />
          ))}
        </div>
      </Section>

      <Section title="Process steps" subtitle="From onboarding to quarterly review cycles.">
        <div className="grid gap-6 md:grid-cols-4">
          {["Discovery", "Solution design", "Implementation", "Continuous review"].map((step, index) => (
            <Card key={step} title={`0${index + 1} ${step}`} />
          ))}
        </div>
      </Section>

      <Section title="FAQ" subtitle="Common questions from enterprise stakeholders.">
        <div className="space-y-4">
          {["What onboarding timelines should we expect?", "How is compliance reporting delivered?", "Do you offer regional support?"]
            .map((faq) => (
              <div key={faq} className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="font-semibold text-slate-900">{faq}</p>
                <p className="mt-2 text-sm text-slate-600">We tailor delivery based on your operational footprint and governance requirements.</p>
              </div>
            ))}
        </div>
      </Section>

      <Section title="Request a Quote" subtitle="Tell us about your operational requirements.">
        <form action={requestQuote} className="grid gap-4 md:grid-cols-2">
          <input name="fullName" placeholder="Full name" className="rounded-md border border-slate-200 p-3" required />
          <input name="email" type="email" placeholder="Email address" className="rounded-md border border-slate-200 p-3" required />
          <input name="phone" placeholder="Phone" className="rounded-md border border-slate-200 p-3" />
          <input name="companyName" placeholder="Company" className="rounded-md border border-slate-200 p-3" />
          <textarea name="message" placeholder="Requirements" className="rounded-md border border-slate-200 p-3 md:col-span-2" rows={4} />
          <Button type="submit" className="md:col-span-2">Submit request</Button>
        </form>
      </Section>
    </main>
  );
}
