import { careerPursuit } from "@njilo/config";

export default function CareerPursuitPage() {
  return (
    <div className="container-shell space-y-8 py-12">
      <header>
        <h1 className="text-3xl font-semibold">{careerPursuit.title}</h1>
        <p className="mt-3 text-sm text-slate-600">{careerPursuit.body}</p>
      </header>
      <section className="card">
        <h2 className="text-lg font-semibold">Why Njilo?</h2>
        <p className="mt-3 text-sm text-slate-600">
          We offer structured learning, mentorship, and operational exposure across fleet management, logistics, and waste operations. Our teams are supported by enterprise systems and clear career pathways.
        </p>
      </section>
    </div>
  );
}
