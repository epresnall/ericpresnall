// Orchestrates the 4 agents: scrape → qualify → enrich → draft → stage for review.
import { writeFileSync } from "node:fs";
import { env, loadBrand, paths } from "./config.js";
import { searchJobs } from "./theirstack.js";
import { qualifyJob } from "./qualify.js";
import { enrichContact } from "./enrich.js";
import { draftOutreach } from "./draft.js";
import { Tracker } from "./tracker.js";
import type { LeadRecord } from "./types.js";

export async function runPipeline(): Promise<LeadRecord[]> {
  const brand = loadBrand(); // fail fast if brand.json missing
  const tracker = new Tracker();

  console.log(`Pulling jobs (last ${env.windowDays} days)…`);
  const jobs = await searchJobs();
  console.log(`  ${jobs.length} jobs returned.`);

  const staged: LeadRecord[] = [];
  for (const job of jobs) {
    if (tracker.isDuplicate(job.id, job.company)) continue;

    const now = new Date().toISOString();
    const rec: LeadRecord = { job, status: "sourced", createdAt: now, updatedAt: now };

    // Agent 2 — qualify/score
    rec.qualification = await qualifyJob(job);
    rec.status = "qualified";
    if (rec.qualification.tier === "DROP" || rec.qualification.tier === "C") {
      rec.status = "skipped";
      rec.skippedReason = `tier ${rec.qualification.tier}: ${rec.qualification.reason}`;
      tracker.upsert(rec);
      continue;
    }

    // Agent 3 — enrich
    rec.contact = await enrichContact(job);
    rec.status = "enriched";

    // Agent 4 — draft (routed by freshness)
    rec.draft = await draftOutreach(job, rec.contact, rec.qualification.freshness, brand);
    rec.status = "drafted";

    tracker.upsert(rec);
    staged.push(rec);
    console.log(`  ✓ ${rec.qualification.tier}  ${job.company} — ${job.title}  [${rec.qualification.freshness}]`);
  }

  tracker.flush();
  writeReview(staged);
  return staged;
}

function writeReview(staged: LeadRecord[]): void {
  const lines: string[] = [
    `# Outreach review — ${new Date().toLocaleString()}`,
    ``,
    `${staged.length} drafted leads awaiting your approval. Nothing has been sent.`,
    ``,
  ];
  for (const r of staged) {
    const q = r.qualification!;
    const c = r.contact ?? {};
    const d = r.draft!;
    lines.push(
      `## [${q.tier} · ${q.score}] ${r.job.company} — ${r.job.title}  _(${d.track})_`,
      `- Why: ${q.reason}`,
      `- Work mode: ${q.workMode} · US: ${q.usBased}`,
      `- Contact: ${c.name ?? "?"}${c.title ? `, ${c.title}` : ""} · ${c.email ?? "no email"} (${c.emailStatus ?? "?"})`,
      `- Job: ${r.job.url ?? "n/a"}`,
      ``,
      `**Subject:** ${d.subject}`,
      ``,
      "```",
      d.body,
      "```",
      ``,
      `**LinkedIn note:** ${d.linkedinNote}`,
      `**LinkedIn message:** ${d.linkedinMessage}`,
      ``,
      `---`,
      ``,
    );
  }
  writeFileSync(paths.reviewMd, lines.join("\n"));
  console.log(`\nReview file written: ${paths.reviewMd}`);
}
