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
  // Offline mode: run the full pipeline on built-in fixtures with no network /
  // no API keys. Each stage also auto-falls-back to offline if its key is absent.
  mock: (process.env.MOCK || "false").toLowerCase() === "true",
};

// --- Job-title taxonomy, organized by Eric's GetMany buckets ---
// (Sourced from the GetMany briefing in Notion: the 4 buckets GetMany sorts
// on-camera video jobs into. The flat INCLUDE_TITLES below is what Agent 1
// sends to TheirStack; Agent 2 then confirms true on-camera fit + bucket.)
export const BUCKETS: Record<string, string[]> = {
  // 1 — Sales Funnel: ads, VSLs, conversion-focused, book-a-call CTA
  salesFunnel: [
    "video sales letter",
    "VSL presenter",
    "VSL spokesperson",
    "ad spokesperson",
    "ad presenter",
    "UGC ad creator",
    "direct response presenter",
    "sales video presenter",
    "advertising spokesperson",
    "commercial spokesperson",
    "pitch presenter",
  ],
  // 2 — Content Marketing: YouTube, social, short-form, e-learning, organic
  contentMarketing: [
    "content creator",
    "video content creator",
    "UGC creator",
    "UGC actor",
    "YouTube host",
    "YouTube presenter",
    "short-form video creator",
    "social media video presenter",
    "TikTok creator",
    "video podcast host",
    "educational video presenter",
    "e-learning presenter",
    "course instructor on camera",
  ],
  // 3 — Product & Training: SaaS demos, onboarding, support, training
  productTraining: [
    "product demo presenter",
    "SaaS demo presenter",
    "demo presenter",
    "onboarding video host",
    "training video presenter",
    "tutorial presenter",
    "software walkthrough presenter",
    "explainer video presenter",
  ],
  // 4 — General / Spokesperson: any on-camera not clearly 1–3
  generalSpokesperson: [
    "video spokesperson",
    "spokesperson",
    "brand spokesperson",
    "corporate spokesperson",
    "video presenter",
    "presenter",
    "on-camera host",
    "on camera host",
    "on-camera talent",
    "on camera talent",
    "on-air talent",
    "video host",
    "video brand ambassador",
    "brand ambassador",
    "talking head",
    "video narrator",
    "webinar host",
    "virtual presenter",
    "commercial actor",
    "brand actor",
    "video emcee",
  ],
};

// Flattened + de-duplicated list for the scraper.
export const INCLUDE_TITLES = Array.from(
  new Set(Object.values(BUCKETS).flat()),
);

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
