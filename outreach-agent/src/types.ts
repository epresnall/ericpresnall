// Shared types for the outreach pipeline.

export type CopyTrack = "OLD" | "FRESH";
export type WorkMode = "remote" | "hybrid" | "onsite" | "unknown";
export type Tier = "A" | "B" | "C" | "DROP";

/** A normalized job posting coming out of the Scraper (Agent 1). */
export interface Job {
  id: string; // stable dedup key (source + external id, or hashed url)
  title: string;
  company: string;
  companyDomain?: string;
  location?: string;
  url?: string;
  description: string;
  datePosted?: string; // ISO
  closedAt?: string | null; // ISO if the posting is closed/expired
  remote?: boolean | null;
  source?: string;
}

/** Output of the Qualifier/Scorer (Agent 2). */
export interface Qualification {
  onCamera: boolean;
  workMode: WorkMode;
  usBased: boolean;
  freshness: CopyTrack; // OLD (closed/stale) vs FRESH (open/recent)
  tier: Tier;
  score: number; // 0-100
  reason: string; // one line
}

/** Output of Enrichment (Agent 3). */
export interface Contact {
  name?: string;
  title?: string;
  email?: string;
  linkedinUrl?: string;
  emailStatus?: string; // e.g. verified / guessed / unavailable
  currentlyEmployed?: boolean | null; // important for OLD posts
}

/** Output of the Outreach Router/Drafter (Agent 4). */
export interface Draft {
  track: CopyTrack;
  subject: string;
  body: string; // includes CAN-SPAM footer
  linkedinNote: string; // connection request note
  linkedinMessage: string; // first message after connect
}

/** A full pipeline row, persisted to the tracker. */
export interface LeadRecord {
  job: Job;
  qualification?: Qualification;
  contact?: Contact;
  draft?: Draft;
  status: "sourced" | "qualified" | "enriched" | "drafted" | "approved" | "enrolled" | "skipped";
  skippedReason?: string;
  createdAt: string;
  updatedAt: string;
}
