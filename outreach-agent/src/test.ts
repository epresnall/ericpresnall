// Offline end-to-end test. Forces MOCK mode, runs the real pipeline against the
// built-in fixtures, and asserts the qualifier + router behave correctly.
// Run: npm test
process.env.MOCK = "true";

import { qualifyJob } from "./qualify.js";
import { enrichContact } from "./enrich.js";
import { draftOutreach } from "./draft.js";
import { loadBrand } from "./config.js";
import { SAMPLE_JOBS } from "./fixtures.js";
import type { Job } from "./types.js";

let passed = 0;
let failed = 0;
function check(name: string, cond: boolean, detail = "") {
  if (cond) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.log(`  ✗ ${name} ${detail}`);
  }
}
const byId = (id: string) => SAMPLE_JOBS.find((j) => j.id === id) as Job;

async function main() {
  console.log("Running offline pipeline tests (MOCK mode)…\n");

  const brand = loadBrand();
  check("brand.json loads", !!brand.name && !!brand.valueProp);

  // --- Qualifier ---
  console.log("\nQualifier:");
  const q: Record<string, Awaited<ReturnType<typeof qualifyJob>>> = {};
  for (const job of SAMPLE_JOBS) q[job.id] = await qualifyJob(job);

  // Non-fits must be dropped
  for (const id of ["fx-video-editor", "fx-camera-operator", "fx-motion-designer"]) {
    check(`${id} → DROP (not on-camera)`, q[id].tier === "DROP", `got ${q[id].tier}`);
    check(`${id} onCamera=false`, q[id].onCamera === false);
  }

  // Non-US dropped
  check("fx-presenter-uk → not US", q["fx-presenter-uk"].usBased === false, `got usBased=${q["fx-presenter-uk"].usBased}`);
  check("fx-presenter-uk → DROP", q["fx-presenter-uk"].tier === "DROP", `got ${q["fx-presenter-uk"].tier}`);

  // Real on-camera roles must pass (A/B/C, not DROP)
  for (const id of ["fx-spokesperson-saas", "fx-youtube-host-old", "fx-ugc-ads", "fx-corp-spokesperson-hybrid", "fx-webinar-host-closed", "fx-product-demo", "fx-brand-ambassador"]) {
    check(`${id} → on-camera kept`, q[id].tier !== "DROP" && q[id].onCamera, `got ${q[id].tier}/${q[id].onCamera}`);
  }

  // Freshness routing
  check("closed posting → OLD", q["fx-webinar-host-closed"].freshness === "OLD");
  check("67-day-old posting → OLD", q["fx-youtube-host-old"].freshness === "OLD");
  check("recent posting → FRESH", q["fx-spokesperson-saas"].freshness === "FRESH");

  // Hybrid detected
  check("hybrid detected", q["fx-corp-spokesperson-hybrid"].workMode === "hybrid", `got ${q["fx-corp-spokesperson-hybrid"].workMode}`);

  // --- Enrichment ---
  console.log("\nEnrichment:");
  const contact = await enrichContact(byId("fx-spokesperson-saas"));
  check("contact has email", !!contact.email && contact.email.includes("@"), contact.email ?? "");

  // --- Drafting + routing ---
  console.log("\nDrafting:");
  const oldDraft = await draftOutreach(byId("fx-webinar-host-closed"), contact, "OLD", brand);
  const freshDraft = await draftOutreach(byId("fx-spokesperson-saas"), contact, "FRESH", brand);

  check("OLD draft uses 'did you ever fill' angle", /fill/i.test(oldDraft.subject + oldDraft.body));
  check("FRESH draft references the company", freshDraft.body.includes("Brightloop"));
  check("both drafts carry CAN-SPAM footer", oldDraft.body.includes("unsubscribe") && freshDraft.body.includes("unsubscribe"));
  check("LinkedIn note within 300 chars", oldDraft.linkedinNote.length <= 300 && freshDraft.linkedinNote.length <= 300);
  check("drafts include reel link", freshDraft.body.includes(brand.reelUrl));

  console.log(`\n${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error("Test run crashed:", e);
  process.exit(1);
});
