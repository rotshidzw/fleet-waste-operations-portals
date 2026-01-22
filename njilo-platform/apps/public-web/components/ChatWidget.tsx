"use client";

import { useState } from "react";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([
    "Hi there! I can help you find the right service mix."
  ]);
  const [input, setInput] = useState("");

  return (
    <div className="fixed bottom-6 right-6 z-[70]">
      {open && (
        <div className="mb-3 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Njilo Assist</p>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
            Ask us about fleet, waste, or plant services. Demo responses only.
          </p>
          <div className="mt-3 space-y-2">
            {messages.map((message, index) => (
              <div
                key={`${message}-${index}`}
                className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-950"
              >
                {message}
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => setMessages((prev) => [...prev, "Please share your fleet size and routes."])}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              Ask a question
            </button>
            <a
              href="https://wa.me/27115551000"
              className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              WhatsApp
            </a>
          </div>
          <form
            className="mt-3 flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (!input.trim()) return;
              setMessages((prev) => [...prev, input.trim()]);
              setInput("");
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question..."
              className="flex-1 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            />
            <button
              type="submit"
              className="rounded-md bg-blue-900 px-3 py-1 text-xs text-white"
            >
              Send
            </button>
          </form>
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
