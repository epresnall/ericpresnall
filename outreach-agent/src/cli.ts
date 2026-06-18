// CLI entry. Commands: count | pull | review | send
import { env } from "./config.js";
import { countJobs } from "./theirstack.js";
import { runPipeline } from "./pipeline.js";
import { Tracker } from "./tracker.js";
import { enrollLead } from "./smartlead.js";

const cmd = process.argv[2];

async function main() {
  switch (cmd) {
    case "count": {
      // The "how big is this niche?" check — run this first, on the free tier.
      const { total, sampleTitles } = await countJobs();
      console.log(`\nTheirStack returned ${total ?? "?"} matching jobs in the last ${env.windowDays} days.\n`);
      console.log("Sample titles:");
      sampleTitles.forEach((t) => console.log("  - " + t));
      console.log("\nIf this is thin, widen INCLUDE_TITLES in src/config.ts or raise WINDOW_DAYS.");
      break;
    }
    case "pull": {
      // Full dry run: scrape → qualify → enrich → draft → review file. No sending.
      const staged = await runPipeline();
      console.log(`\nDone. ${staged.length} leads staged for review (nothing sent).`);
      break;
    }
    case "review": {
      const t = new Tracker();
      const drafted = t.all().filter((r) => r.status === "drafted");
      console.log(`${drafted.length} leads awaiting approval. See data/review.md`);
      break;
    }
    case "send": {
      // Enroll approved leads into Smartlead, honoring the daily cap + AUTO_SEND gate.
      if (!env.autoSend) {
        console.log("AUTO_SEND is false (Phase 1). Approve leads, then set AUTO_SEND=true to enroll.");
        console.log("To approve a lead, set its status to \"approved\" in data/tracker.json.");
        break;
      }
      const t = new Tracker();
      const approved = t.all().filter((r) => r.status === "approved").slice(0, env.dailySendCap);
      let sent = 0;
      for (const rec of approved) {
        const ok = await enrollLead(rec);
        if (ok) {
          rec.status = "enrolled";
          t.upsert(rec);
          t.markContacted(rec.job.company);
          sent++;
          console.log(`  ✓ enrolled ${rec.job.company}`);
        }
      }
      t.flush();
      console.log(`\nEnrolled ${sent} leads (cap ${env.dailySendCap}).`);
      break;
    }
    default:
      console.log("Usage: tsx src/cli.ts <count|pull|review|send>");
      console.log("  count  — how many jobs the niche returns (run first, free tier)");
      console.log("  pull   — full dry run → data/review.md (nothing sent)");
      console.log("  review — show how many leads await approval");
      console.log("  send   — enroll approved leads into Smartlead (needs AUTO_SEND=true)");
  }
}

main().catch((e) => {
  console.error("\nError:", e.message);
  process.exit(1);
});
