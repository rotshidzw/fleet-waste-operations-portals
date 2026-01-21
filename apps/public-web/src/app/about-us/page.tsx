import { companyProfile } from "@njilo/config";

export default function AboutUsPage() {
  return (
    <div className="container-shell space-y-10 py-12">
      <header>
        <h1 className="text-3xl font-semibold">About Us</h1>
        <p className="mt-3 text-sm text-slate-600">
          Founded in {companyProfile.founded}, Njilo Consulting & Logistics (Pty) Ltd is a long-established partner in fleet management, logistics, and waste operations.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold">Vision</h2>
          <p className="mt-2 text-sm text-slate-600">
            To be South Africa’s most trusted fleet and logistics management partner, delivering measurable value with integrity and compliance.
          </p>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">Mission</h2>
          <p className="mt-2 text-sm text-slate-600">
            To simplify fleet management through professional systems, dedicated people, and customer-focused solutions that scale across industries.
          </p>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">Values</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li>Accountability and transparency</li>
            <li>Operational excellence</li>
            <li>Transformation and inclusion</li>
            <li>Safety and compliance</li>
          </ul>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">CSI</h2>
          <p className="mt-2 text-sm text-slate-600">
            We invest in local communities through supplier development, training initiatives, and partnerships that support sustainable growth.
          </p>
        </div>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold">Transformation Commitment</h2>
        <p className="mt-3 text-sm text-slate-600">
          {companyProfile.bbbee} with {companyProfile.procurement}. We are committed to empowering local suppliers, advancing skills development, and partnering for long-term impact.
        </p>
      </section>
    </div>
  );
}
