"use client";

import { useState } from "react";
import { companyProfile } from "@njilo/config";

export default function ContactUsPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus("loading");

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        company: formData.get("company"),
        message: formData.get("message")
      })
    });

    if (response.ok) {
      setStatus("success");
      event.currentTarget.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="container-shell space-y-10 py-12">
      <header>
        <h1 className="text-3xl font-semibold">Contact Us</h1>
        <p className="mt-3 text-sm text-slate-600">
          Speak with {companyProfile.contactPerson} and our enterprise support team for fleet, logistics, and waste operations.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold">Head Office</h2>
          <p className="mt-3 text-sm text-slate-600">{companyProfile.headOffice.address}</p>
          <p className="text-sm text-slate-600">{companyProfile.headOffice.phone}</p>
          <p className="text-sm text-slate-600">{companyProfile.headOffice.email}</p>

          <h2 className="mt-6 text-lg font-semibold">Gauteng Branch</h2>
          <p className="mt-3 text-sm text-slate-600">{companyProfile.gautengBranch.address}</p>
          <p className="text-sm text-slate-600">{companyProfile.gautengBranch.phone}</p>
          <p className="text-sm text-slate-600">{companyProfile.gautengBranch.email}</p>
        </div>

        <form className="card space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold">Request a Quote</h2>
          <div>
            <label className="text-xs font-semibold" htmlFor="name">Full Name</label>
            <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" id="name" name="name" required />
          </div>
          <div>
            <label className="text-xs font-semibold" htmlFor="email">Email</label>
            <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" id="email" name="email" type="email" required />
          </div>
          <div>
            <label className="text-xs font-semibold" htmlFor="phone">Phone</label>
            <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" id="phone" name="phone" />
          </div>
          <div>
            <label className="text-xs font-semibold" htmlFor="company">Company</label>
            <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" id="company" name="company" />
          </div>
          <div>
            <label className="text-xs font-semibold" htmlFor="message">Message</label>
            <textarea className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" id="message" name="message" rows={4} required />
          </div>
          <button className="primary-button" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Submitting..." : "Submit"}
          </button>
          {status === "success" && <p className="text-xs text-green-600">Thank you. We will respond shortly.</p>}
          {status === "error" && <p className="text-xs text-red-600">Something went wrong. Please email us directly.</p>}
        </form>
      </section>
    </div>
  );
}
