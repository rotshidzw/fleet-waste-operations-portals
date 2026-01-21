export default function DownloadsPage() {
  return (
    <div className="container-shell space-y-8 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Downloads</h1>
        <p className="mt-3 text-sm text-slate-600">Capability statements and service brochures.</p>
      </header>
      <section className="card">
        <h2 className="text-lg font-semibold">Capability Statement</h2>
        <p className="mt-2 text-sm text-slate-600">Download our enterprise capability statement.</p>
        <a className="mt-4 inline-flex text-sm font-semibold text-njilo-blue" href="/media/docs/capability-statement.pdf">
          Download PDF
        </a>
      </section>
    </div>
  );
}
