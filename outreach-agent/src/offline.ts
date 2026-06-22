// Offline fallbacks used in MOCK mode (or when a stage's API key is absent), so
// the whole pipeline can run + be tested with no network and no API calls.
// These are deliberately simple heuristics — the live Claude path is the real
// brain; this just keeps the module runnable and self-testable.
import type { Brand } from "./config.js";
import type { Job, Qualification, Contact, Draft, WorkMode, CopyTrack } from "./types.js";

const ON_CAMERA = [
  "spokesperson", "presenter", "host", "on-camera", "on camera", "on-air",
  "talent", "ugc", "actor", "ambassador", "talking head", "narrator",
  "anchor", "emcee", "face of", "to camera",
];
const NOT_ON_CAMERA = [
  "editor", "videographer", "camera operator", "operator", "motion graphics",
  "animator", "animation", "post-production", "post production", "colorist",
  "sound design", "voiceover only", "voice over only",
];

function hay(job: Job): string {
  return `${job.title} ${job.description}`.toLowerCase();
}

export function scoreOffline(job: Job): Qualification {
  const text = hay(job);
  const onCameraHits = ON_CAMERA.filter((w) => text.includes(w)).length;
  const negHits = NOT_ON_CAMERA.filter((w) => text.includes(w)).length;
  const titleHasOnCamera = ON_CAMERA.some((w) => job.title.toLowerCase().includes(w));

  const onCamera = onCameraHits > 0 && (onCameraHits > negHits || titleHasOnCamera);

  // Work mode (hybrid wins over a stray "on-site days" mention)
  let workMode: WorkMode = "unknown";
  if (/hybrid/.test(text)) workMode = "hybrid";
  else if (job.remote === true || /\bremote\b/.test(text)) workMode = "remote";
  else if (/on-site|on site|onsite/.test(text)) workMode = "onsite";

  // US based: explicit non-US country → false; otherwise assume US (the live
  // scraper already filters to US, and a US state/city counts as US here).
  const nonUs = /(united kingdom|london|\buk\b|\bengland\b|canada|australia|india|\beurope\b|germany|france|philippines)/.test(text);
  const usBased = !nonUs;

  // Freshness
  const freshness: CopyTrack = inferFreshness(job);

  // Tier + score
  let score = 0;
  let reason = "";
  if (!onCamera) {
    score = 15;
    reason = "Not an on-camera role (behind-camera/editing).";
    return { onCamera, workMode, usBased, freshness, tier: "DROP", score, reason };
  }
  if (!usBased) {
    score = 25;
    reason = "On-camera but outside the US.";
    return { onCamera, workMode, usBased, freshness, tier: "DROP", score, reason };
  }

  score = 55 + Math.min(onCameraHits, 4) * 8; // 55..87
  if (workMode === "remote") score += 8;
  if (workMode === "onsite") score -= 20;
  score = Math.max(0, Math.min(100, score));

  let tier: Qualification["tier"];
  if (score >= 80) tier = "A";
  else if (score >= 60) tier = "B";
  else if (score >= 40) tier = "C";
  else tier = "DROP";

  reason =
    `On-camera ${workMode} role` +
    (workMode === "hybrid" ? " (hybrid — sway candidate)" : "") +
    `; ${onCameraHits} on-camera signal(s).`;

  return { onCamera, workMode, usBased, freshness, tier, score, reason };
}

export function inferFreshness(job: Job): CopyTrack {
  if (job.closedAt) return "OLD";
  if (job.datePosted) {
    const ageDays = (Date.now() - new Date(job.datePosted).getTime()) / 86_400_000;
    if (ageDays > 30) return "OLD";
  }
  return "FRESH";
}

export function mockContact(job: Job): Contact {
  const domain = job.companyDomain ?? `${job.company.toLowerCase().replace(/[^a-z0-9]+/g, "")}.com`;
  return {
    name: "Hiring Manager",
    title: "Content / Marketing Lead",
    email: `hiring@${domain}`,
    linkedinUrl: undefined,
    emailStatus: "mock",
    currentlyEmployed: true,
  };
}

export function draftOffline(job: Job, contact: Contact, track: CopyTrack, brand: Brand): Draft {
  const who = (contact.name ?? "there").split(" ")[0];
  const footer = `\n\n— ${brand.signoff}\n${brand.canSpam.fromName} · ${brand.canSpam.physicalAddress}\n${brand.canSpam.unsubscribeText}`;

  if (track === "OLD") {
    const subject = `Did you ever fill the ${job.title} role?`;
    const body =
      `${who} — I saw ${job.company} was hiring for a ${job.title} a while back. Did you ever fill it?\n\n` +
      `If it's still open (or comes up again), I'd love to throw my hat in. I'm an on-camera presenter who handles the whole thing end to end — research, scripting, and delivery. ${brand.valueProp}\n\n` +
      `Reel: ${brand.reelUrl}. Worth a quick chat? ${brand.calendarUrl}` +
      footer;
    return {
      track,
      subject,
      body,
      linkedinNote: `Hi ${who} — saw ${job.company} was hiring an on-camera ${shortRole(job)} a while back. Did you fill it? I'd love to raise my hand if not.`.slice(0, 290),
      linkedinMessage: `Thanks for connecting, ${who}! I noticed the ${job.title} role at ${job.company} from a while back. If you're ever after an on-camera presenter who does research → script → delivery, here's my reel: ${brand.reelUrl}`,
    };
  }

  const subject = `On-camera presenter for ${job.company} — ${shortRole(job)}`;
  const body =
    `${who} — saw the ${job.title} opening at ${job.company} and it's squarely what I do.\n\n` +
    `I'm an on-camera presenter who takes a brief end to end — research, scripting, and delivery. ${brand.valueProp}\n\n` +
    `Reel: ${brand.reelUrl}. Happy to formally apply or grab 15 minutes: ${brand.calendarUrl}` +
    footer;
  return {
    track,
    subject,
    body,
    linkedinNote: `Hi ${who} — I saw the ${job.title} role at ${job.company}. On-camera presenter here (research → script → delivery). Would love to be considered.`.slice(0, 290),
    linkedinMessage: `Thanks for connecting, ${who}! Re: the ${job.title} role — I present on camera and handle scripting/research too. Reel: ${brand.reelUrl}. Open to a quick chat?`,
  };
}

function shortRole(job: Job): string {
  const t = job.title.toLowerCase();
  if (t.includes("spokesperson")) return "spokesperson";
  if (t.includes("host")) return "host";
  if (t.includes("ugc")) return "UGC creator";
  if (t.includes("ambassador")) return "brand ambassador";
  return "presenter";
}
