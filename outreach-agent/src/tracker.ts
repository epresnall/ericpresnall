// Local JSON tracker — dedup, suppression, and persisted lead records.
// Keyed by job.id; also enforces one-company-once across runs.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { paths } from "./config.js";
import type { LeadRecord } from "./types.js";

interface TrackerFile {
  leads: Record<string, LeadRecord>;
  contactedCompanies: string[]; // suppression: lowercase company names already contacted
}

function load(): TrackerFile {
  if (!existsSync(paths.tracker)) return { leads: {}, contactedCompanies: [] };
  return JSON.parse(readFileSync(paths.tracker, "utf8")) as TrackerFile;
}

function save(t: TrackerFile): void {
  writeFileSync(paths.tracker, JSON.stringify(t, null, 2));
}

export class Tracker {
  private t: TrackerFile;
  constructor() {
    this.t = load();
  }

  /** True if we've already seen this job or already contacted this company. */
  isDuplicate(jobId: string, company: string): boolean {
    if (this.t.leads[jobId]) return true;
    return this.t.contactedCompanies.includes(company.toLowerCase());
  }

  upsert(rec: LeadRecord): void {
    rec.updatedAt = new Date().toISOString();
    this.t.leads[rec.job.id] = rec;
  }

  markContacted(company: string): void {
    const c = company.toLowerCase();
    if (!this.t.contactedCompanies.includes(c)) this.t.contactedCompanies.push(c);
  }

  all(): LeadRecord[] {
    return Object.values(this.t.leads);
  }

  flush(): void {
    save(this.t);
  }
}
