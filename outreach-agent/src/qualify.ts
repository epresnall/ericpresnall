// Agent 2 — Qualifier / Scorer. Uses Claude with structured output.
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { env, SCORING_RUBRIC, EXCLUDE_HINTS } from "./config.js";
import type { Job, Qualification } from "./types.js";

const client = new Anthropic({ apiKey: env.anthropicKey });

const QualSchema = z.object({
  onCamera: z.boolean(),
  workMode: z.enum(["remote", "hybrid", "onsite", "unknown"]),
  usBased: z.boolean(),
  freshness: z.enum(["OLD", "FRESH"]),
  tier: z.enum(["A", "B", "C", "DROP"]),
  score: z.number(),
  reason: z.string(),
});

/**
 * Score one job. `freshness` is seeded from the posting's closed/age signal but
 * the model confirms it. Returns a structured Qualification.
 */
export async function qualifyJob(job: Job): Promise<Qualification> {
  const seededFreshness = inferFreshness(job);

  const res = await client.beta.messages.parse({
    model: env.model,
    max_tokens: 1024,
    output_format: betaZodOutputFormat(QualSchema),
    system: `You qualify job postings for an on-camera video presenter.\n${SCORING_RUBRIC}\n\nLikely-irrelevant signals: ${EXCLUDE_HINTS.join(", ")}.\nFreshness: OLD = posting is closed/expired or older than ~30 days ("did you ever fill this?" angle). FRESH = open and recent. A heuristic suggests this one is ${seededFreshness}; correct it if the description says otherwise.`,
    messages: [
      {
        role: "user",
        content: `TITLE: ${job.title}\nCOMPANY: ${job.company}\nLOCATION: ${job.location ?? "unknown"}\nREMOTE: ${job.remote ?? "unknown"}\nPOSTED: ${job.datePosted ?? "unknown"}\nCLOSED: ${job.closedAt ?? "open"}\n\nDESCRIPTION:\n${truncate(job.description, 6000)}`,
      },
    ],
  });

  const out = res.parsed_output;
  if (!out) {
    return {
      onCamera: false,
      workMode: "unknown",
      usBased: false,
      freshness: seededFreshness,
      tier: "DROP",
      score: 0,
      reason: "Could not parse qualification.",
    };
  }
  return out;
}

function inferFreshness(job: Job): "OLD" | "FRESH" {
  if (job.closedAt) return "OLD";
  if (job.datePosted) {
    const ageDays = (Date.now() - new Date(job.datePosted).getTime()) / 86_400_000;
    if (ageDays > 30) return "OLD";
  }
  return "FRESH";
}

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n) + "…" : s;
}
