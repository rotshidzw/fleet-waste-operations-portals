import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-5">
        <div>
          <h3 className="text-lg font-semibold">Njilo Holdings</h3>
          <p className="mt-3 text-sm text-slate-300">
            Enterprise fleet, waste, and compliance solutions across Southern Africa.
          </p>
          <div className="mt-4 flex items-center gap-3 text-slate-300">
            <a
              href="https://www.linkedin.com"
              aria-label="LinkedIn"
              className="rounded-full border border-slate-700 p-2 transition hover:border-white hover:text-white"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M4.98 3.5a2.5 2.5 0 1 0 .02 5 2.5 2.5 0 0 0-.02-5zM3 8.98h4v12H3v-12zM9.5 8.98h3.84v1.64h.05c.54-1.02 1.86-2.1 3.83-2.1 4.1 0 4.86 2.7 4.86 6.2V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4v-12z" />
              </svg>
            </a>
            <a
              href="https://x.com"
              aria-label="X"
              className="rounded-full border border-slate-700 p-2 transition hover:border-white hover:text-white"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M16.6 3H19l-5.3 6.1L20 21h-4.9l-3.8-6.1L6.9 21H4.5l5.7-6.6L4 3h5l3.4 5.5L16.6 3zm-1.7 16h1.4L8.9 5H7.4l7.5 14z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com"
              aria-label="YouTube"
              className="rounded-full border border-slate-700 p-2 transition hover:border-white hover:text-white"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M23.5 6.2a2.9 2.9 0 0 0-2-2.1C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.5.6a2.9 2.9 0 0 0-2 2.1A30 30 0 0 0 0 12a30 30 0 0 0 .5 5.8 2.9 2.9 0 0 0 2 2.1c1.8.6 9.5.6 9.5.6s7.7 0 9.5-.6a2.9 2.9 0 0 0 2-2.1A30 30 0 0 0 24 12a30 30 0 0 0-.5-5.8zM9.8 15.5V8.5l6.2 3.5-6.2 3.5z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Services</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li><Link href="/our-services">Fleet management</Link></li>
            <li><Link href="/services/vehicle-tracking">Telematics & tracking</Link></li>
            <li><Link href="/services/yellow-plant-equipment">Plant & equipment</Link></li>
            <li><Link href="/our-impact">Waste operations</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Johannesburg</h4>
          <p className="mt-3 text-sm text-slate-300">
            12 Meridian Park, Sandton<br />
            +27 11 555 1000
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Cape Town</h4>
          <p className="mt-3 text-sm text-slate-300">
            88 Marine Drive, Foreshore<br />
            +27 21 555 2200
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/popia-notice">POPIA Notice</Link></li>
            <li><a href="/company-profile.pdf">Company profile</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-400">
        © 2024 Njilo Holdings. All rights reserved.
      </div>
    </footer>
  );
}
