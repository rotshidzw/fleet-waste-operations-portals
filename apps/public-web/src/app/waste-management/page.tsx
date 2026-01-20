import Link from "next/link";

export default function WasteManagementPage() {
  return (
    <div className="container-shell space-y-10 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Waste Management</h1>
        <p className="mt-3 text-sm text-slate-600">
          Structured waste collection and equipment management tailored to municipal and industrial requirements.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold">Service Direction</h2>
          <p className="mt-3 text-sm text-slate-600">
            Our waste management offering is aligned to compliance, equipment tracking, and reporting. We provide pickup scheduling, asset registers, and operational transparency.
          </p>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">Upcoming Enhancements</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>Expanded recycling reporting</li>
            <li>Automated pickup notifications</li>
            <li>Equipment lifecycle dashboards</li>
          </ul>
        </div>
      </section>
      <Link className="primary-button" href="/contact-us">
        Request a Consultation
      </Link>
    </div>
  );
}
