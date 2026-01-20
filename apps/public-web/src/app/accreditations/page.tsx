export default function AccreditationsPage() {
  const logos = Array.from({ length: 8 }).map((_, index) => `Accreditation ${index + 1}`);

  return (
    <div className="container-shell space-y-8 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Accreditations & Memberships</h1>
        <p className="mt-3 text-sm text-slate-600">
          Our teams comply with industry standards and maintain memberships with relevant professional bodies.
        </p>
      </header>
      <section className="grid gap-4 md:grid-cols-4">
        {logos.map((logo) => (
          <div key={logo} className="flex h-24 items-center justify-center rounded border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-500">
            {logo}
          </div>
        ))}
      </section>
    </div>
  );
}
