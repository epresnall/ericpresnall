// Sending — pushes an approved lead into the matching Smartlead campaign.
//
// NOTE: confirm endpoint/fields against Smartlead's API docs. Smartlead verifies
// the email in its send flow, so we rely on that rather than a separate verifier.
import { env } from "./config.js";
import type { LeadRecord } from "./types.js";

function campaignFor(track: "OLD" | "FRESH"): string {
  return track === "OLD" ? env.smartleadCampaignOld : env.smartleadCampaignFresh;
}

/** Enroll one approved lead. No-op (returns false) if not configured / no email. */
export async function enrollLead(rec: LeadRecord): Promise<boolean> {
  if (!env.smartleadKey) {
    console.warn("  SMARTLEAD_API_KEY not set — skipping enrollment.");
    return false;
  }
  const campaignId = campaignFor(rec.draft!.track);
  if (!campaignId) {
    console.warn(`  No Smartlead campaign id for track ${rec.draft!.track} — skipping.`);
    return false;
  }
  const email = rec.contact?.email;
  if (!email) {
    console.warn("  No email on contact — skipping enrollment.");
    return false;
  }

  const url = `https://server.smartlead.ai/api/v1/campaigns/${campaignId}/leads?api_key=${env.smartleadKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lead_list: [
        {
          email,
          first_name: (rec.contact?.name ?? "").split(" ")[0] ?? "",
          last_name: (rec.contact?.name ?? "").split(" ").slice(1).join(" "),
          company_name: rec.job.company,
          custom_fields: {
            role_title: rec.job.title,
            job_url: rec.job.url ?? "",
            subject: rec.draft?.subject ?? "",
            personalized_body: rec.draft?.body ?? "",
          },
        },
      ],
      settings: { ignore_global_block_list: false, ignore_unsubscribe_list: false },
    }),
  });
  if (!res.ok) {
    console.warn(`  Smartlead ${res.status}: ${(await res.text()).slice(0, 200)}`);
    return false;
  }
  return true;
}
