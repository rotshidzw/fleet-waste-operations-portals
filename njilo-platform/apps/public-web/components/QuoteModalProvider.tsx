"use client";

import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type QuoteModalContextValue = {
  openModal: () => void;
  closeModal: () => void;
};

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          department: payload.department ?? "SALES",
          source: "public-quote"
        })
      });

      if (!response.ok) {
        throw new Error("Failed");
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
    }
  }

  return (
    <QuoteModalContext.Provider value={{ openModal: () => setOpen(true), closeModal: () => setOpen(false) }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/70 px-4"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Request a Quote</h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Tell us about your fleet, waste, or equipment needs.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setOpen(false);
                    setStatus("idle");
                  }}
                  className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:border-blue-500 hover:text-blue-700 dark:border-slate-700 dark:text-slate-300"
                >
                  Close
                </button>
              </div>
              <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    name="fullName"
                    placeholder="Full name"
                    className="rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    required
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Work email"
                    className="rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    required
                  />
                </div>
                <input
                  name="companyName"
                  placeholder="Company"
                  className="rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
                <textarea
                  name="message"
                  placeholder="Tell us about routes, asset counts, and timelines."
                  className="min-h-[110px] rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
                <div className="grid gap-3 md:grid-cols-2">
                  <select
                    name="department"
                    className="rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  >
                    <option value="SALES">Sales</option>
                    <option value="OPS">Operations</option>
                    <option value="HR">HR</option>
                    <option value="SUPPORT">Support</option>
                  </select>
                  <input
                    name="phone"
                    placeholder="Phone"
                    className="rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? "Sending..." : "Submit request"}
                </button>
                {status === "success" && (
                  <p className="text-sm text-green-600">Thanks! We will reach out within 24 hours.</p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error("useQuoteModal must be used within QuoteModalProvider");
  }
  return context;
}
