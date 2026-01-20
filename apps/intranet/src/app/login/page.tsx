"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await signIn("credentials", {
      redirect: true,
      callbackUrl: "/dashboard",
      email: formData.get("email"),
      password: formData.get("password")
    });

    if (response?.error) {
      setError("Invalid credentials.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <form className="w-full max-w-md space-y-4 rounded-lg bg-white p-8" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-2xl font-semibold">Njilo Intranet</h1>
          <p className="text-sm text-slate-600">Sign in to access internal modules.</p>
        </div>
        <div>
          <label className="text-xs font-semibold" htmlFor="email">Email</label>
          <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" id="email" name="email" type="email" required />
        </div>
        <div>
          <label className="text-xs font-semibold" htmlFor="password">Password</label>
          <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" id="password" name="password" type="password" required />
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button className="w-full rounded bg-njilo-blue px-4 py-2 text-sm font-semibold text-white" type="submit">
          Sign In
        </button>
        <p className="text-xs text-slate-500">Demo account: admin@njiloconsulting.co.za / admin123</p>
      </form>
    </div>
  );
}
