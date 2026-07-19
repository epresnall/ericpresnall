# Job / Outreach Agent — State & Decisions

> Living document. Updated after a full review of the existing `job-pipeline/`
> and `outreach-agent/` work already on this branch.
> Last updated: 2026-07-19

## 1. The goal (north star) — CONFIRMED from existing docs

Land **3 anchor clients on ongoing retainers (~$5–15K/mo each, ~12 months)** —
NOT one-off gigs. The mechanism: apply to **off-Upwork on-camera roles**
(video presenter / spokesperson / on-camera host / UGC creator), then **convert
replies into monthly retainers** in the conversation. Upwork is a separate,
already-handled system — this one is 100% OFF-Upwork.

Brand in the pipeline docs: **VideoRep**, reel **videorep.co**, booking
**cal.com/videorep/eric-presnall-contact-call**.
⚠️ Note vs the website: site says **"The Spokesman"** / theglobalexperience.co /
ericpresnall.com. → NEED Eric to confirm which brand + reel + booking link is current.

## 2. Who Eric is (source of truth for generation)
On-camera video spokesperson/presenter/host. 20+ yrs, Upwork Top Rated Plus
(Top 1%, 8 categories), 500+ five-star projects, 250+ brands (Microsoft,
Facebook, Ahrefs, Sony). Marketer + strategist + creative director with a full
team — takes a brief end-to-end (research → script → deliver), 24–48h turnaround.
Military veteran, HubSpot certified, B.S. Psychology. LA-based, US-remote.

## 3. What already exists on this branch
### `job-pipeline/` — human-run knowledge base (READY TO USE)
- `START-HERE.md` — 20-min morning routine.
- `README.md` — full engine spec (source → score → build → deliver → warm-intro).
- `DIAGNOSIS.md` — key lesson: **the leak is follow-up + underselling, not sourcing.**
  Answer the 3 questions every client asks (price / is-it-you / location) up front;
  reply to warm leads within the hour; use accurate credentials; always attach video.
- `RESUME-STRATEGY.md`, `resume.md`, 5 tailored `.docx` resumes in `files/`.
- `cover-letter-template.md`, `ai-prompt-screening-answers.md`, `answers-clients-always-ask.md`.
- `playbooks/` — conversation (reply→retainer), warm-intro, retainer-pricing.
- Lead batches: `2026-06-30-batch.md`, `2026-07-09-linkedin-picks.md`, `2026-07-13-live-batch.md`.

### `outreach-agent/` — working v1 code pipeline (TESTED OFFLINE, 26 checks)
Scraper (TheirStack) → Qualifier (Claude A/B/C) → Enrichment (Apollo) →
Outreach (Claude drafts, staged for approval, sends via Smartlead).
- Runs fully offline on fixtures (`npm test`, `npm run mock`).
- `brand.json` pre-filled; approval gate + CAN-SPAM footer + dedup built in.
- **Never went live** because no job-data key/source was ever connected.

## 4. THE blocker (now solvable) — live job source
Every design assumed **TheirStack** (or Apify as backup) for sourcing, but no key
was ever added, so the pipeline had no live data and fell back to manual search.

✅ **NEW (2026-07-19): Apify is confirmed WORKING from this Claude Code env**
(network open, Eric's token verified). Apify can be the live job source now —
no TheirStack subscription required.

## 5. Available tooling in THIS environment (native, no extra SaaS)
- **Apify** — verified working (job scraping + contact/email-finder actors).
- **Gmail** connector — send/draft outreach (alternative to Smartlead).
- **HubSpot** connector — CRM pipeline for opportunities.
- **Notion** connector — lead tracker board.
- **Slack** connector — new-lead notifications.
- **Google Calendar** connector — follow-up / call scheduling.
- Me (Claude) — scoring + copy, right here.

## 6. Open DECISIONS (the real questions left)
1. **Runtime:** (A) run natively in Claude Code — Apify sourcing + Gmail/Notion/
   HubSpot, no monthly SaaS; or (B) the standalone `outreach-agent` app with
   TheirStack + Apollo + Smartlead keys (more autonomous, paid). → OPEN
2. **Outreach automation:** draft-for-approval (matches current Phase-1 gate) vs
   auto-send. → OPEN
3. **Brand/identity:** VideoRep vs The Spokesman; correct reel + booking link. → OPEN
4. **Still-owed inputs (per docs):** evergreen 45–60s intro video; real mailing
   address (CAN-SPAM); confirm booking link. → OPEN

## 7. Decisions log
- 2026-07-19: Apify network access confirmed open; token verified (Eric Presnall,
  Free plan, $5/mo). Reviewed full existing job-pipeline + outreach-agent codebase.
