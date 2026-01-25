"use client";

import Link from "next/link";
import { useQuoteModal } from "./QuoteModalProvider";

export function ContactCtaBand() {
  const { openModal } = useQuoteModal();

  return (
    <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-green-700">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-14 text-white lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-orange-200">Ready to scale?</p>
          <h2 className="mt-3 text-3xl font-semibold">Let’s design your operational blueprint.</h2>
          <p className="mt-2 text-sm text-blue-100">
            Speak with our specialists about fleet, waste, plant, and compliance delivery.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={openModal}
            className="rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400"
          >
            Request a Quote
          </button>
          <Link
            href="/contact-us"
            className="rounded-md border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Speak to an advisor
          </Link>
        </div>
      </div>
    </section>
  );
}
