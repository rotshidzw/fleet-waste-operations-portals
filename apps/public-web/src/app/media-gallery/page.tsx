import { mediaGallery } from "@njilo/config";

export default function MediaGalleryPage() {
  return (
    <div className="container-shell space-y-8 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Media Gallery</h1>
        <p className="mt-3 text-sm text-slate-600">Visual highlights from our fleet, logistics, and waste operations.</p>
      </header>
      <section className="grid gap-6 md:grid-cols-3">
        {mediaGallery.map((item) => (
          <div key={item.title} className="card">
            <div className="h-40 rounded-md bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
            <p className="mt-3 text-sm font-semibold">{item.title}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
