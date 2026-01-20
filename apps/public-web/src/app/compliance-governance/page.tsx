import { companyProfile } from "@njilo/config";

export default function ComplianceGovernancePage() {
  return (
    <div className="container-shell space-y-10 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Compliance & Governance</h1>
        <p className="mt-3 text-sm text-slate-600">
          Governance controls that meet public sector requirements and enterprise audit standards.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold">BBBEE</h2>
          <p className="mt-2 text-sm text-slate-600">
            {companyProfile.bbbee} with {companyProfile.procurement}. We support supplier development, skills upliftment, and inclusive procurement.
          </p>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">Safety & Compliance</h2>
          <p className="mt-2 text-sm text-slate-600">
            Our operational teams follow safety standards, licensing requirements, and preventative maintenance schedules to keep fleets compliant.
          </p>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">POPIA Notice</h2>
          <p className="mt-2 text-sm text-slate-600">
            We handle personal data with strict confidentiality and apply POPIA-compliant privacy controls across our systems.
          </p>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">Procurement Capability</h2>
          <p className="mt-2 text-sm text-slate-600">
            Structured procurement processes, vendor governance, and reporting aligned with enterprise procurement frameworks.
          </p>
        </div>
      </section>
    </div>
  );
}
