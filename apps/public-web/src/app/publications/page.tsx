import { publications } from "@njilo/config";

export default function PublicationsPage() {
  return (
    <div className="container-shell space-y-8 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Publications</h1>
        <p className="mt-3 text-sm text-slate-600">Insights, announcements, and operational updates.</p>
      </header>
      <section className="space-y-6">
        {publications.map((publication) => (
          <div key={publication.title} className="card">
            <h2 className="text-lg font-semibold">{publication.title}</h2>
            <p className="mt-1 text-xs text-slate-500">{publication.date}</p>
            <p className="mt-3 text-sm text-slate-600">{publication.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
