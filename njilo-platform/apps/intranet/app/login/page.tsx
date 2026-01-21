"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard"
    });

    if (result?.error) {
      setError("Invalid credentials.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold text-blue-900">Njilo Intranet</h1>
        <p className="mt-2 text-sm text-slate-500">Sign in with your enterprise credentials.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input name="email" type="email" placeholder="Email" className="w-full rounded-md border border-slate-200 p-3" required />
          <input name="password" type="password" placeholder="Password" className="w-full rounded-md border border-slate-200 p-3" required />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="w-full rounded-md bg-blue-900 px-4 py-3 text-sm font-semibold text-white">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-xs text-slate-500">Demo login: admin@njilo.local / Welcome123!</p>
      </div>
    </div>
  );
}
