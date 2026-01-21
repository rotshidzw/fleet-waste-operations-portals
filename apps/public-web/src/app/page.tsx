import Link from "next/link";
import {
  companyProfile,
  services,
  testimonials,
  mediaGallery,
  industries
} from "@njilo/config";
import { PartnerCarousel } from "@/components/PartnerCarousel";

const heroSlides = [
  {
    title: "We make fleet management SIMPLE",
    subtitle: "Enterprise-grade fleet, logistics, and waste operations support with governance-first execution.",
    image: "/media/stock/hero-fleet.jpg"
  },
  {
    title: "Commitment to TRANSFORMATION",
    subtitle: "A Level One BBBEE contributor delivering measurable impact and inclusive growth.",
    image: "/media/stock/hero-transformation.jpg"
  },
  {
    title: "ALL IN ONE FLEET MANAGEMENT SOLUTION",
    subtitle: "Integrated solutions across leasing, maintenance, compliance, and reporting.",
    image: "/media/stock/hero-operations.jpg"
  }
];

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      <section className="bg-slate-950 text-white">
        <div className="container-shell grid gap-8 py-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{companyProfile.tagline}</p>
            <h1 className="mt-4 text-4xl font-semibold md:text-5xl">{heroSlides[0].title}</h1>
            <p className="mt-4 text-base text-slate-200">{heroSlides[0].subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link className="primary-button" href="/contact-us">
                Request a Quote
              </Link>
              <Link className="secondary-button" href="/our-services">
                View Services
              </Link>
            </div>
          </div>
          <div className="h-64 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${heroSlides[0].image})` }} />
        </div>
      </section>

      <section className="container-shell grid gap-6 md:grid-cols-3">
        {heroSlides.map((slide) => (
          <div key={slide.title} className="card">
            <div className="h-32 rounded-md bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
            <h3 className="mt-4 text-lg font-semibold">{slide.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{slide.subtitle}</p>
          </div>
        ))}
      </section>

      <section className="container-shell">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="section-title">Commitment to TRANSFORMATION</h2>
            <p className="mt-4 text-sm text-slate-600">
              Njilo Consulting & Logistics is proud to be a {companyProfile.bbbee} with {companyProfile.procurement}.
              We build partnerships that transform operational capability, drive inclusive procurement, and deliver long-term value.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {industries.map((industry) => (
                <div key={industry} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium">
                  {industry}
                </div>
              ))}
            </div>
          </div>
          <div className="h-72 rounded-lg bg-cover bg-center" style={{ backgroundImage: "url(/media/stock/transformation.jpg)" }} />
        </div>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="container-shell">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="section-title">ALL IN ONE FLEET MANAGEMENT SOLUTION</h2>
              <p className="mt-3 text-sm text-slate-600">
                Our integrated solution combines leasing, maintenance, compliance, and analytics to simplify fleet operations.
              </p>
            </div>
            <Link className="primary-button" href="/fleet-solutions">
              Explore Fleet Solutions
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <div key={service.slug} className="card">
                <h3 className="text-base font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{service.summary}</p>
                <Link className="mt-4 inline-flex text-sm font-semibold text-njilo-blue" href={`/our-services/${service.slug}`}>
                  Learn more
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell">
        <h2 className="section-title">Why choose us?</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-4">
          {[
            { title: "Dedicated", body: "Hands-on fleet experts assigned to your portfolio." },
            { title: "Experienced Staff", body: "Proven specialists across logistics, compliance, and finance." },
            { title: "Industry Systems", body: "Robust enterprise systems with transparent reporting." },
            { title: "Why Partner", body: "Trusted partner committed to long-term operational excellence." }
          ].map((item) => (
            <div key={item.title} className="card">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="container-shell">
          <h2 className="section-title">Our fleet solution & services</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.slug} className="card">
                <h3 className="text-base font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{service.summary}</p>
                <Link className="mt-4 inline-flex text-sm font-semibold text-njilo-blue" href={`/our-services/${service.slug}`}>
                  View service
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell">
        <h2 className="section-title">Partner Network</h2>
        <div className="mt-6">
          <PartnerCarousel />
        </div>
        <p className="mt-3 text-xs text-slate-500">Carousel ready: update logos in intranet CMS to rotate in production.</p>
      </section>

      <section className="bg-slate-950 py-12 text-white">
        <div className="container-shell grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="section-title text-white">Testimonials</h2>
            <div className="mt-6 space-y-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="rounded-lg border border-slate-700 bg-slate-900 p-4">
                  <p className="text-sm">“{testimonial.quote}”</p>
                  <p className="mt-2 text-xs text-slate-400">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="section-title text-white">Operational Gallery</h2>
            <div className="mt-6 grid gap-4">
              {mediaGallery.map((item) => (
                <div key={item.title} className="rounded-lg bg-slate-900 p-4">
                  <div className="h-28 rounded-md bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                  <p className="mt-3 text-sm">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
