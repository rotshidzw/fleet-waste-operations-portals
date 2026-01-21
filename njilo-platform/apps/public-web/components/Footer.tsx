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
