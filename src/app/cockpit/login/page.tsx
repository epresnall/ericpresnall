"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/cockpit/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (res.ok) {
      router.push(params.get("from") || "/cockpit");
      router.refresh();
    } else {
      setError("Incorrect password. Try again.");
    }
  }

  return (
    <div className="mx-auto max-w-md px-5 py-24">
      <h1 className="heading text-3xl mb-2">Application Cockpit</h1>
      <p className="paragraph-muted mb-8">Enter your password to continue.</p>
      <form onSubmit={submit} className="card-glow p-6 flex flex-col gap-4">
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-lg bg-[var(--color-dark)] border border-white/10 px-4 py-3 text-white outline-none focus:border-[var(--color-purple)]"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">
          {busy ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}

export default function CockpitLogin() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-5 py-24 paragraph-muted">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
