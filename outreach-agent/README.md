# Outreach Agent

Agentic job-sourcing + personalized outreach for on-camera **video presenter / spokesperson / host** roles (remote, US-first). Sources current **and** recently-closed postings, scores them for fit, finds the hiring contact, drafts outreach in two copy tracks, and stages everything for your approval before anything sends through **Smartlead**.

> **Isolated from the website.** This lives in its own folder with its own `package.json`. It never imports — and cannot affect — the `ericpresnall` Next.js site, which deploys from `main`.

## The pipeline (4 agents)

```
1 Scraper        TheirStack → rolling ~90-day window, US, on-camera titles, open + closed
2 Qualifier      Claude scores A/B/C, confirms on-camera + remote/US, routes OLD vs FRESH
3 Enrichment     Apollo → hiring contact + email (Smartlead verifies before send)
4 Outreach       Claude drafts email + LinkedIn copy per track → staged for approval
```

OLD track = "did you ever fill this?" (stale/closed postings). FRESH track = effectively applying (open postings).

## Setup

```bash
cd outreach-agent
npm install
cp .env.example .env          # fill in API keys
cp brand.example.json brand.json   # fill in Eric's bio, reel, value prop, address
```

What you need in `.env`:

| Key | Where to get it | Notes |
|---|---|---|
| `ANTHROPIC_API_KEY` | console.anthropic.com | the qualify/score/draft brain |
| `THEIRSTACK_API_KEY` | theirstack.com (free tier) | job data; run `count` first before paying |
| `APOLLO_API_KEY` | apollo.io (free tier) | contact + email finding |
| `SMARTLEAD_API_KEY` + 2 campaign IDs | your Smartlead account | create OLD + FRESH campaigns, paste IDs |

## Run it

```bash
npm run count    # FIRST: how many jobs the niche returns (free tier, ~no cost)
npm run pull     # full dry run → data/review.md  (NOTHING is sent)
npm run review   # how many leads await approval
npm run send     # enroll APPROVED leads into Smartlead (gated; see below)
```

## Try it with zero setup (offline mode)

The whole pipeline runs on built-in sample jobs with **no API keys and no internet** —
useful to see exactly what it produces and to verify changes:

```bash
npm test         # runs the pipeline on fixtures + asserts scoring/routing (26 checks)
npm run mock     # full dry run on sample jobs → data/review.md
```

In mock mode every stage uses a deterministic offline fallback (a heuristic scorer +
template drafts). The moment you add real keys, the same code calls TheirStack, Apollo,
Claude, and Smartlead instead. Each stage also auto-falls-back to offline if its own key
is missing, so partial setups still run.

**Approval gate (Phase 1).** `pull` writes drafts to `data/review.md` and `data/tracker.json`. Read them. To approve a lead, set its `status` to `"approved"` in `data/tracker.json`. `send` only enrolls approved leads, only when `AUTO_SEND=true`, and never more than `DAILY_SEND_CAP` per run (protects your warmed inboxes). LinkedIn copy is drafted for you to send **manually**.

## Model & cost

Defaults to `claude-opus-4-8`. This is a low-volume workload (single-digit new leads/day), so cost is small either way. To trim further, set `ANTHROPIC_MODEL` in `.env`:

| Model | Input / Output per 1M tok | Good for |
|---|---|---|
| `claude-opus-4-8` (default) | $5 / $25 | best judgment + copy |
| `claude-sonnet-4-6` | $3 / $15 | strong, cheaper all-rounder |
| `claude-haiku-4-5` | $1 / $5 | cheapest; fine for scoring |

At a few dozen jobs/day, expect cents per run on any of these. TheirStack on a 90-day niche window likely fits its **free tier**; upgrade ($59/mo) only if volume exceeds free credits.

## Tuning accuracy

- **Keywords:** organized by Eric's 4 GetMany buckets (Sales Funnel · Content Marketing ·
  Product & Training · General/Spokesperson) in `BUCKETS` in `src/config.ts`. Edit a bucket
  to add/remove search terms; `INCLUDE_TITLES` is auto-derived from them.
- **Titles / niche breadth:** `INCLUDE_TITLES` and `EXCLUDE_HINTS` in `src/config.ts`.
- **Window:** `WINDOW_DAYS` in `.env` (90 default; raise to 180 if volume is thin).
- **Scoring rubric / tiers:** `SCORING_RUBRIC` in `src/config.ts`.
- **Copy:** `templates/old-track.md` and `templates/fresh-track.md`, plus `brand.json`.

## Compliance & safety

- **CAN-SPAM:** every email gets a footer (physical address + opt-out) from `brand.json`. Fill in a real mailing address.
- **Deliverability:** send from a separate, warmed domain in Smartlead — not your primary. Keep volume low while tuning.
- **LinkedIn:** manual in Phase 1 (automation breaks LinkedIn ToS).
- **Suppression/dedup:** the tracker won't re-contact a company or re-process a job across runs.

## Status

Working v1, tested offline (`npm test` → 26 passing). `brand.json` is pre-filled from
Eric's GetMany briefing — just replace the two `REPLACE-ME` fields (booking link + mailing
address). Keywords cover all 4 GetMany buckets.

To go live: add `THEIRSTACK_API_KEY` (already confirmed ~509 real jobs in the live niche),
then `APOLLO_API_KEY` and your Smartlead key + campaign IDs. Run `npm run count`, then
`npm run pull`. Provider field mappings (TheirStack / Apollo / Smartlead) are defensive but
should be confirmed against each provider's live API docs on the first real run.
