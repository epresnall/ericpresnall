// Client-side persistence for saved jobs. Single-user tool → localStorage keeps
// "hop in and it's already done" working across visits with zero backend/DB.
"use client";

import type { JobRecord } from "./types";

const KEY = "cockpit_jobs_v1";

export function loadJobs(): JobRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const jobs = JSON.parse(raw) as JobRecord[];
    return Array.isArray(jobs) ? jobs : [];
  } catch {
    return [];
  }
}

function saveAll(jobs: JobRecord[]): void {
  window.localStorage.setItem(KEY, JSON.stringify(jobs));
}

export function getJob(id: string): JobRecord | undefined {
  return loadJobs().find((j) => j.id === id);
}

export function upsertJob(job: JobRecord): void {
  const jobs = loadJobs();
  const i = jobs.findIndex((j) => j.id === job.id);
  if (i >= 0) jobs[i] = job;
  else jobs.unshift(job);
  saveAll(jobs);
}

export function deleteJob(id: string): void {
  saveAll(loadJobs().filter((j) => j.id !== id));
}

export function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
