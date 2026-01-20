import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@njilo/config";

const processSteps = [
  "Diagnostic assessment and scope alignment",
  "Onboarding and implementation planning",
  "Operational rollout with governance reporting",
  "Continuous improvement and KPI reviews"
];

const faqItems = [
  {
    question: "How fast can the service start?",
    answer: "Typical onboarding takes 2-4 weeks depending on fleet size and compliance requirements."
  },
  {
    question: "Do you integrate with existing systems?",
    answer: "Yes, we can align with telematics, fuel management, and finance systems." 
  }
];

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((item) => item.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="container-shell space-y-12 py-12">
      <header className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Service</p>
          <h1 className="mt-3 text-3xl font-semibold">{service.title}</h1>
          <p className="mt-4 text-sm text-slate-600">{service.summary}</p>
          <Link className="primary-button mt-6" href="/contact-us">
            Request a Quote
          </Link>
        </div>
        <div className="h-60 rounded-lg bg-cover bg-center" style={{ backgroundImage: "url(/media/stock/service-hero.jpg)" }} />
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold">What it is</h2>
          <p className="mt-3 text-sm text-slate-600">
            {service.summary} We align the solution to your fleet strategy and compliance requirements with enterprise reporting.
          </p>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">How it works</h2>
          <p className="mt-3 text-sm text-slate-600">
            Our dedicated team manages implementation, vendor coordination, and operational reporting while you focus on core business outcomes.
          </p>
        </div>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold">Key benefits</h2>
        <ul className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
          <li>Predictable costs and transparent governance.</li>
          <li>Reduced downtime through proactive management.</li>
          <li>Compliance support across licensing, insurance, and safety.</li>
          <li>Strategic reporting to support decision-making.</li>
        </ul>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold">Process steps</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-600">
          {processSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold">FAQs</h2>
        <div className="mt-4 space-y-4 text-sm text-slate-600">
          {faqItems.map((item) => (
            <div key={item.question}>
              <p className="font-semibold text-slate-900">{item.question}</p>
              <p className="mt-1">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold">Related services</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {services.filter((item) => item.slug !== service.slug).slice(0, 4).map((item) => (
            <Link key={item.slug} className="text-sm font-semibold text-njilo-blue" href={`/our-services/${item.slug}`}>
              {item.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
