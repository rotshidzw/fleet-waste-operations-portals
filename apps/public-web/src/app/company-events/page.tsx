import { events } from "@njilo/config";

export default function CompanyEventsPage() {
  return (
    <div className="container-shell space-y-8 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Company Events</h1>
        <p className="mt-3 text-sm text-slate-600">Updates on our people, culture, and operational milestones.</p>
      </header>
      <section className="space-y-6">
        {events.map((event) => (
          <div key={event.title} className="card">
            <h2 className="text-lg font-semibold">{event.title}</h2>
            <p className="mt-1 text-xs text-slate-500">{event.date}</p>
            <p className="mt-3 text-sm text-slate-600">{event.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
