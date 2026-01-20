import { insights } from "@njilo/config";

export default function NewsroomPage() {
  return (
    <div className="container-shell space-y-8 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Newsroom & Insights</h1>
        <p className="mt-3 text-sm text-slate-600">Thought leadership and operational updates from our team.</p>
      </header>
      <section className="space-y-6">
        {insights.map((insight) => (
          <div key={insight.title} className="card">
            <p className="text-xs text-slate-500">{insight.date}</p>
            <h2 className="mt-2 text-lg font-semibold">{insight.title}</h2>
            <p className="mt-3 text-sm text-slate-600">{insight.summary}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
