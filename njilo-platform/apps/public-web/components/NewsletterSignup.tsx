"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.get("email") })
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
    <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        placeholder="Work email"
        className="flex-1 rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        required
      />
      <button
        type="submit"
        className="rounded-md bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending..." : "Subscribe"}
      </button>
      {status === "success" && (
        <span className="text-sm text-green-600">Subscribed!</span>
      )}
      {status === "error" && (
        <span className="text-sm text-red-600">Try again.</span>
      )}
    </form>
  );
}
