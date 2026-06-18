// Central config: env, the job-title taxonomy, scoring rubric, and brand assets.
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// --- Load .env (tiny parser, no dependency) ---
function loadEnv() {
  const path = join(root, ".env");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2];
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (process.env[key] === undefined) process.env[key] = val;
  }
}
loadEnv();

export const env = {
  anthropicKey: process.env.ANTHROPIC_API_KEY ?? "",
  model: process.env.ANTHROPIC_MODEL || "claude-opus-4-8",
  theirstackKey: process.env.THEIRSTACK_API_KEY ?? "",
  windowDays: Number(process.env.WINDOW_DAYS || 90),
  apolloKey: process.env.APOLLO_API_KEY ?? "",
  smartleadKey: process.env.SMARTLEAD_API_KEY ?? "",
  smartleadCampaignOld: process.env.SMARTLEAD_CAMPAIGN_ID_OLD ?? "",
  smartleadCampaignFresh: process.env.SMARTLEAD_CAMPAIGN_ID_FRESH ?? "",
  dailySendCap: Number(process.env.DAILY_SEND_CAP || 15),
  autoSend: (process.env.AUTO_SEND || "false").toLowerCase() === "true",
};

// --- Job-title taxonomy (Agent 1 filter; Agent 2 refines) ---
export const INCLUDE_TITLES = [
  "video presenter",
  "video spokesperson",
  "spokesperson",
  "on-camera host",
  "on camera talent",
  "on-air talent",
  "video host",
  "presenter",
  "brand spokesperson",
  "corporate spokesperson",
  "ugc creator",
  "ugc actor",
  "explainer video presenter",
  "video brand ambassador",
  "demo presenter",
  "pitch presenter",
  "webinar host",
  "video narrator",
];

// Surfaced to the Qualifier so it can drop near-misses (editor/operator roles).
export const EXCLUDE_HINTS = [
  "video editor",
  "video producer (no on-camera)",
  "camera operator",
  "videographer",
  "motion graphics",
  "post-production only",
];

export const US_COUNTRY_CODES = ["US"];

// --- Brand assets (Eric's voice + CAN-SPAM data) ---
export interface Brand {
  name: string;
  headline: string;
  valueProp: string;
  bio: string;
  wins: string[];
  reelUrl: string;
  landingUrl: string;
  calendarUrl: string;
  tone: string;
  signoff: string;
  canSpam: { fromName: string; physicalAddress: string; unsubscribeText: string };
}

export function loadBrand(): Brand {
  const path = join(root, "brand.json");
  if (!existsSync(path)) {
    throw new Error(
      "brand.json not found. Copy brand.example.json to brand.json and fill it in.",
    );
  }
  return JSON.parse(readFileSync(path, "utf8")) as Brand;
}

// --- Scoring rubric (injected into Agent 2) ---
export const SCORING_RUBRIC = `
Score 0-100 for fit as an ON-CAMERA video presenter / spokesperson / host role.
Reward: explicit on-camera delivery, remote or US-hybrid, video host/spokesperson/presenter,
end-to-end content roles (research + scripting + presenting), brand/marketing video.
Penalize / DROP: editor/producer/operator/videographer roles with NO on-camera component,
non-US, fully unpaid, or roles where the person is behind the camera only.
Tiers: A = 80-100 (strong on-camera fit), B = 60-79 (good, worth a personalized touch),
C = 40-59 (marginal, park for human review), DROP = <40 or hard-fail (not on-camera / not US).
`.trim();

export const paths = {
  root,
  templatesDir: join(root, "templates"),
  dataDir: join(root, "data"),
  tracker: join(root, "data", "tracker.json"),
  reviewMd: join(root, "data", "review.md"),
};
