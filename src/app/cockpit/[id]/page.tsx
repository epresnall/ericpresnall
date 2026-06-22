"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getJob, upsertJob } from "@/lib/cockpit/storage";
import type { JobRecord } from "@/lib/cockpit/types";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="btn-outline text-sm py-2 px-4"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function Panel({ title, body }: { title: string; body: string }) {
  return (
    <section className="card-glow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="heading text-xl">{title}</h2>
        <CopyButton text={body} />
      </div>
      <p className="whitespace-pre-wrap leading-relaxed text-white/90">{body}</p>
    </section>
  );
}

export default function CockpitDetail() {
  const params = useParams<{ id: string }>();
  const [job, setJob] = useState<JobRecord | null | undefined>(undefined);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setJob(getJob(params.id) ?? null);
  }, [params.id]);

  async function regenerate() {
    if (!job) return;
    setBusy(true);
    try {
      const res = await fetch("/api/cockpit/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: job.title,
          company: job.company,
          description: job.description,
          screeningQuestions: job.screeningQuestions,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        const updated: JobRecord = { ...job, materials: data.materials, source: data.source };
        upsertJob(updated);
        setJob(updated);
      }
    } finally {
      setBusy(false);
    }
  }

  if (job === undefined) {
    return <div className="mx-auto max-w-3xl px-5 py-24 paragraph-muted">Loading…</div>;
  }
  if (job === null) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24">
        <p className="paragraph-muted mb-6">
          This job isn&apos;t saved on this device. (Materials are stored in your browser.)
        </p>
        <Link href="/cockpit" className="btn-primary">
          Back to cockpit
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/cockpit" className="paragraph-muted hover:text-white">
        ← All jobs
      </Link>
      <div className="flex items-start justify-between gap-4 mt-4 mb-2">
        <div>
          <h1 className="heading text-3xl">{job.title}</h1>
          <p className="paragraph-muted">{job.company}</p>
        </div>
        <button onClick={regenerate} disabled={busy} className="btn-outline shrink-0 disabled:opacity-60">
          {busy ? "Regenerating…" : "Regenerate"}
        </button>
      </div>
      {job.source === "mock" && (
        <p className="text-amber-400/90 text-sm mb-6">
          Preview content — add an Anthropic API key in Vercel to generate fully tailored materials.
        </p>
      )}

      <div className="grid gap-6 mt-8">
        <Panel title="Cover letter" body={job.materials.coverLetter} />
        <Panel title="Custom video script" body={job.materials.videoScript} />
        <section className="card-glow p-6">
          <h2 className="heading text-xl mb-4">Screening questions</h2>
          <div className="flex flex-col gap-6">
            {job.materials.screeningAnswers.map((qa, i) => (
              <div key={i}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="font-semibold text-white">{qa.question}</p>
                  <CopyButton text={qa.answer} />
                </div>
                <p className="whitespace-pre-wrap leading-relaxed text-white/90">{qa.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
