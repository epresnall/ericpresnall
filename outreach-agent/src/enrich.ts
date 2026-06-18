// Agent 3 — Enrichment. Finds the hiring contact + email via Apollo.
//
// NOTE: Apollo endpoint/field names should be confirmed against their API docs.
// Free tier has limited credits; Smartlead verifies the email before sending,
// so we don't run a separate verifier here.
import { env } from "./config.js";
import type { Job, Contact } from "./types.js";

const PEOPLE_SEARCH = "https://api.apollo.io/v1/mixed_people/search";

// Decision-maker priority for an on-camera/video role.
const TITLE_PRIORITY = [
  "head of content",
  "content marketing manager",
  "brand manager",
  "video producer",
  "marketing manager",
  "recruiter",
  "talent acquisition",
  "hiring manager",
];

export async function enrichContact(job: Job): Promise<Contact> {
  if (!env.apolloKey) {
    return { emailStatus: "skipped:no-apollo-key" };
  }
  if (!job.companyDomain && !job.company) {
    return { emailStatus: "skipped:no-company" };
  }

  try {
    const res = await fetch(PEOPLE_SEARCH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "X-Api-Key": env.apolloKey,
      },
      body: JSON.stringify({
        q_organization_domains: job.companyDomain ? [job.companyDomain] : undefined,
        organization_names: job.companyDomain ? undefined : [job.company],
        person_titles: TITLE_PRIORITY,
        page: 1,
        per_page: 5,
      }),
    });
    if (!res.ok) {
      return { emailStatus: `apollo:${res.status}` };
    }
    const json: any = await res.json();
    const people: any[] = json.people ?? json.contacts ?? [];
    const best = pickBest(people);
    if (!best) return { emailStatus: "no-contact-found" };

    return {
      name: best.name ?? [best.first_name, best.last_name].filter(Boolean).join(" "),
      title: best.title,
      email: best.email,
      linkedinUrl: best.linkedin_url,
      emailStatus: best.email ? "found" : "no-email",
      // Apollo returns current employment; treat a present title at this org as employed.
      currentlyEmployed: best.organization?.name ? true : null,
    };
  } catch (e) {
    return { emailStatus: `error:${(e as Error).message.slice(0, 80)}` };
  }
}

function pickBest(people: any[]): any | undefined {
  for (const wanted of TITLE_PRIORITY) {
    const hit = people.find((p) => (p.title ?? "").toLowerCase().includes(wanted));
    if (hit) return hit;
  }
  return people[0];
}
