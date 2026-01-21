import { videoGallery } from "@njilo/config";

export default function VideoGalleryPage() {
  return (
    <div className="container-shell space-y-8 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Video Gallery</h1>
        <p className="mt-3 text-sm text-slate-600">
          Embedded and locally hosted video assets. Managed via the intranet CMS.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        {videoGallery.map((video) => (
          <div key={video.title} className="card">
            <h2 className="text-base font-semibold">{video.title}</h2>
            {video.type === "youtube" ? (
              <iframe
                className="mt-4 h-48 w-full rounded-md"
                src={video.url}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video className="mt-4 h-48 w-full rounded-md" controls>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
