// Agent 1 — Scraper. Pulls a rolling window of jobs from TheirStack.
//
// NOTE: TheirStack's request/response field names should be confirmed against
// their live API docs (https://theirstack.com/en/job-posting-api). The mapping
// below is defensive so minor schema differences don't crash the pipeline.
import { env, INCLUDE_TITLES, US_COUNTRY_CODES } from "./config.js";
import type { Job } from "./types.js";
import { createHash } from "node:crypto";

const API = "https://api.theirstack.com/v1/jobs/search";

interface SearchOpts {
  maxAgeDays?: number;
  limit?: number;
  includeClosed?: boolean;
}

/** Build the TheirStack request body for our niche + window. */
function buildBody(opts: SearchOpts) {
  return {
    page: 0,
    limit: opts.limit ?? 50,
    job_title_or: INCLUDE_TITLES,
    job_country_code_or: US_COUNTRY_CODES,
    posted_at_max_age_days: opts.maxAgeDays ?? env.windowDays,
    // include both open and recently-closed so we can route OLD vs FRESH
    include_total_results: true,
    blur_company_data: false,
    order_by: [{ field: "date_posted", desc: true }],
  };
}

async function call(body: unknown): Promise<any> {
  if (!env.theirstackKey) {
    throw new Error("THEIRSTACK_API_KEY is not set — add it to .env (free tier is fine).");
  }
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.theirstackKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TheirStack ${res.status}: ${text.slice(0, 500)}`);
  }
  return res.json();
}

/** Lightweight count for the very first "how big is this niche?" check. */
export async function countJobs(): Promise<{ total: number | null; sampleTitles: string[] }> {
  const json = await call(buildBody({ limit: 25 }));
  const data: any[] = json.data ?? json.results ?? [];
  const total = json.metadata?.total_results ?? json.total_results ?? null;
  return { total, sampleTitles: data.slice(0, 25).map((j) => j.job_title ?? j.title ?? "?") };
}

/** Full search → normalized Job[]. */
export async function searchJobs(opts: SearchOpts = {}): Promise<Job[]> {
  const json = await call(buildBody(opts));
  const data: any[] = json.data ?? json.results ?? [];
  return data.map(normalize);
}

function normalize(j: any): Job {
  const url: string | undefined = j.url ?? j.job_url ?? j.final_url;
  const externalId = j.id ?? j.job_id ?? url ?? `${j.company}-${j.job_title}`;
  return {
    id: createHash("sha1").update(String(externalId)).digest("hex").slice(0, 16),
    title: j.job_title ?? j.title ?? "Unknown title",
    company: j.company ?? j.company_name ?? j.company_object?.name ?? "Unknown company",
    companyDomain: j.company_domain ?? j.company_object?.domain,
    location: j.location ?? j.short_location ?? j.long_location,
    url,
    description: j.description ?? j.job_description ?? "",
    datePosted: j.date_posted ?? j.posted_at,
    closedAt: j.closed_at ?? j.discovered_at_close ?? null,
    remote: j.remote ?? j.has_remote ?? null,
    source: "theirstack",
  };
}
