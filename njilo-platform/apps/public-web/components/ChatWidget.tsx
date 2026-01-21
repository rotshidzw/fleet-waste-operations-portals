"use client";

import { useState } from "react";

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[70]">
      {open && (
        <div className="mb-3 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Njilo Assist</p>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
            Ask us about fleet, waste, or plant services. Demo responses only.
          </p>
          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-950">
            “Hi there! I can help you find the right service mix.”
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-900 text-white shadow-lg transition hover:bg-blue-800"
        aria-label="Toggle chat widget"
      >
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}
