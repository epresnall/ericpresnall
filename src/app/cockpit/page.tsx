"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loadJobs, upsertJob, deleteJob, newId } from "@/lib/cockpit/storage";
import type { JobRecord } from "@/lib/cockpit/types";

export default function CockpitHome() {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobRecord[]>([]);
  const [showForm, setShowForm] = useState(false);

  // form state
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [screeningQuestions, setScreening] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setJobs(loadJobs());
  }, []);

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/cockpit/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, company, description, screeningQuestions }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      const record: JobRecord = {
        id: newId(),
        title,
        company,
        description,
        screeningQuestions,
        materials: data.materials,
        source: data.source,
        createdAt: new Date().toISOString(),
      };
      upsertJob(record);
      router.push(`/cockpit/${record.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
      setBusy(false);
    }
  }

  function remove(id: string) {
    deleteJob(id);
    setJobs(loadJobs());
  }

  function loadSample() {
    setTitle("On-Camera Video Spokesperson (Remote)");
    setCompany("BrightLeap Marketing");
    setScreening("Why are you a fit for this role?\nWhat's your turnaround time?\nLink to a recent reel?");
    setDescription(
      "We're hiring a remote on-camera spokesperson/presenter to front our clients' direct-response video ads and explainer content. You'll deliver scripted and semi-scripted segments to camera, collaborate on messaging, and help us produce high-converting UGC-style ads. Must be US-based, comfortable on teleprompter, and able to turn around quickly. Experience scripting your own content is a big plus.",
    );
    setShowForm(true);
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <div className="flex items-center justify-between gap-4 mb-2">
        <h1 className="heading text-3xl">Application Cockpit</h1>
        <button onClick={() => setShowForm((s) => !s)} className="btn-primary">
          {showForm ? "Close" : "+ Add a job"}
        </button>
      </div>
      <p className="paragraph-muted mb-10">
        Paste a job and get a tailored cover letter, a custom-video script, and
        the screening questions answered — all from your real experience.
      </p>

      {showForm && (
        <form onSubmit={generate} className="card-glow p-6 mb-12 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Role title"
              className="flex-1 rounded-lg bg-[var(--color-dark)] border border-white/10 px-4 py-3 text-white outline-none focus:border-[var(--color-purple)]"
            />
            <input
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
              className="flex-1 rounded-lg bg-[var(--color-dark)] border border-white/10 px-4 py-3 text-white outline-none focus:border-[var(--color-purple)]"
            />
          </div>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Paste the full job description here…"
            rows={7}
            className="w-full rounded-lg bg-[var(--color-dark)] border border-white/10 px-4 py-3 text-white outline-none focus:border-[var(--color-purple)]"
          />
          <textarea
            value={screeningQuestions}
            onChange={(e) => setScreening(e.target.value)}
            placeholder="(Optional) Application / screening questions — one per line"
            rows={3}
            className="w-full rounded-lg bg-[var(--color-dark)] border border-white/10 px-4 py-3 text-white outline-none focus:border-[var(--color-purple)]"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex items-center gap-3">
            <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">
              {busy ? "Generating…" : "Generate materials"}
            </button>
            <button type="button" onClick={loadSample} className="btn-outline">
              Load sample
            </button>
          </div>
        </form>
      )}

      {jobs.length === 0 ? (
        <div className="card-glow p-10 text-center paragraph-muted">
          No jobs yet. Click <span className="text-white">+ Add a job</span> to generate your first set of materials.
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((j) => (
            <div key={j.id} className="card-glow p-5 flex items-center justify-between gap-4">
              <Link href={`/cockpit/${j.id}`} className="flex-1 min-w-0">
                <h3 className="heading text-lg truncate">{j.title}</h3>
                <p className="paragraph-muted truncate">
                  {j.company} · {new Date(j.createdAt).toLocaleDateString()}
                  {j.source === "mock" && " · preview"}
                </p>
              </Link>
              <div className="flex items-center gap-3 shrink-0">
                <Link href={`/cockpit/${j.id}`} className="btn-outline">
                  Open
                </Link>
                <button
                  onClick={() => remove(j.id)}
                  className="text-white/40 hover:text-red-400 transition-colors text-sm"
                  aria-label="Delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
