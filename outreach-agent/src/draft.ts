// Agent 4 (drafting half) — writes personalized email + LinkedIn copy per track.
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { env, loadBrand, paths, type Brand } from "./config.js";
import { draftOffline } from "./offline.js";
import type { Job, Contact, Draft, CopyTrack } from "./types.js";

const client = new Anthropic({ apiKey: env.anthropicKey });

const DraftSchema = z.object({
  subject: z.string(),
  body: z.string(),
  linkedinNote: z.string(),
  linkedinMessage: z.string(),
});

function template(track: CopyTrack): string {
  const file = track === "OLD" ? "old-track.md" : "fresh-track.md";
  return readFileSync(join(paths.templatesDir, file), "utf8");
}

export async function draftOutreach(
  job: Job,
  contact: Contact,
  track: CopyTrack,
  brand: Brand = loadBrand(),
): Promise<Draft> {
  // Offline / no-key path: deterministic template draft.
  if (env.mock || !env.anthropicKey) return draftOffline(job, contact, track, brand);

  const footer = `\n\n— ${brand.signoff}\n${brand.canSpam.fromName} · ${brand.canSpam.physicalAddress}\n${brand.canSpam.unsubscribeText}`;

  const res = await client.beta.messages.parse({
    model: env.model,
    max_tokens: 2000,
    output_format: betaZodOutputFormat(DraftSchema),
    system: `You write outreach for ${brand.name} — ${brand.headline}.
Voice/tone: ${brand.tone}
Value prop: ${brand.valueProp}
Bio: ${brand.bio}
Wins to draw from: ${brand.wins.join(" | ")}
Reel/portfolio: ${brand.reelUrl} · Tailored page: ${brand.landingUrl} · Booking: ${brand.calendarUrl}

Follow this track template (don't copy it verbatim — write naturally in Eric's voice, with a custom first line referencing THIS company/role):
---
${template(track)}
---
Rules: short (under ~120 words for email), specific to the company, one clear CTA, no fluff, no clichés. Do NOT include the signature/footer — it is appended automatically. LinkedIn note must be under 300 characters.`,
    messages: [
      {
        role: "user",
        content: `Write outreach for this ${track} role.\nCONTACT: ${contact.name ?? "the hiring team"}${contact.title ? `, ${contact.title}` : ""}\nCOMPANY: ${job.company}\nROLE: ${job.title}\nLOCATION: ${job.location ?? "unknown"}\nJOB SUMMARY:\n${truncate(job.description, 3000)}`,
      },
    ],
  });

  const out = res.parsed_output;
  if (!out) {
    return {
      track,
      subject: `${job.title} — ${brand.name}`,
      body: `Draft generation failed; write manually.${footer}`,
      linkedinNote: "",
      linkedinMessage: "",
    };
  }
  return { track, subject: out.subject, body: out.body + footer, linkedinNote: out.linkedinNote, linkedinMessage: out.linkedinMessage };
}

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n) + "…" : s;
}
