import { faqs } from "@njilo/config";

export default function FaqPage() {
  return (
    <div className="container-shell space-y-8 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Frequently Asked Questions</h1>
        <p className="mt-3 text-sm text-slate-600">Answers to common fleet management and compliance questions.</p>
      </header>
      <section className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.question} className="card">
            <h2 className="text-base font-semibold">{faq.question}</h2>
            <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
