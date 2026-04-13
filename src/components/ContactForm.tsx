"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      const res = await fetch("https://formspree.io/f/eric@ericpresnall.com", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card-glow p-8 text-center">
        <p className="text-lg font-semibold text-[var(--color-purple)]">
          Thank you, we will keep you updated.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Hi, I am</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[var(--color-white)] placeholder-white/30 focus:outline-none focus:border-[var(--color-purple)] transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">from</label>
          <input
            type="text"
            name="company"
            placeholder="Company's name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[var(--color-white)] placeholder-white/30 focus:outline-none focus:border-[var(--color-purple)] transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          You can reach me at
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your e-mail"
          required
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[var(--color-white)] placeholder-white/30 focus:outline-none focus:border-[var(--color-purple)] transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">I have in mind</label>
        <textarea
          name="message"
          placeholder="Describe your need"
          required
          rows={5}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[var(--color-white)] placeholder-white/30 focus:outline-none focus:border-[var(--color-purple)] transition-colors resize-none"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          required
          className="mt-1 accent-[var(--color-purple)]"
        />
        <label htmlFor="privacy" className="text-sm text-[var(--color-white-60)]">
          I have read and agree to{" "}
          <a
            href="/privacy"
            className="text-[var(--color-purple)] hover:underline"
          >
            Privacy Policy
          </a>
        </label>
      </div>

      <button type="submit" className="btn-primary">
        Send
      </button>

      {status === "error" && (
        <p className="text-red-400 text-sm">
          Oops! Something went wrong while submitting the form.
        </p>
      )}
    </form>
  );
}
