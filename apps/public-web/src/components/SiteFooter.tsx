import Link from "next/link";
import { companyProfile } from "@njilo/config";

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container-shell grid gap-8 py-12 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{companyProfile.name}</h3>
          <p className="mt-3 text-sm">
            {companyProfile.bbbee} · {companyProfile.procurement}
          </p>
          <p className="mt-2 text-sm">Founded {companyProfile.founded}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Contact</h4>
          <p className="mt-3 text-sm">{companyProfile.headOffice.address}</p>
          <p className="text-sm">{companyProfile.headOffice.phone}</p>
          <p className="text-sm">{companyProfile.headOffice.email}</p>
          <p className="mt-4 text-sm">{companyProfile.gautengBranch.address}</p>
          <p className="text-sm">{companyProfile.gautengBranch.phone}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Quick Links</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/popia-notice">POPIA Notice</Link>
            <Link href="/downloads">Downloads</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Njilo Consulting & Logistics (Pty) Ltd. All rights reserved.
      </div>
    </footer>
  );
}
