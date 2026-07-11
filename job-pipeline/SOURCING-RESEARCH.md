# Sourcing research — how to auto-pull every relevant job (2026)

**The problem this solves:** stop hand-searching. Wire in ONE data source that pulls
video-presenter / spokesperson / on-camera / creator roles from **every board at once**,
deduped, then score → digest. This is the piece that makes the system "done."

## The options (researched)

| Provider | Coverage | Dedup | Price | Best when |
|---|---|---|---|---|
| **★ TheirStack** | **315k+ sources** — LinkedIn, Indeed, Glassdoor **+ 16k ATS (Greenhouse, Lever, Ashby, Workable)** | ✅ built-in | **Free tier**, then **$49/mo**; ~$0.0015–0.04/job | **Best fit.** One API = every board incl. company ATS pages, deduped, updates every minute. |
| **Apify** (you mentioned it) | "All Jobs Scraper" = 39 platforms; or per-board actors (LinkedIn ~$1–1.5/1k, Indeed $0.10/1k, Google Jobs) | ⚠️ you handle it | pay-per-use, no subscription | You want no monthly commitment / a specific board. Reliable (~90% match); LinkedIn can throttle. |
| **SerpApi Google Jobs** | Google-for-Jobs (Indeed, LinkedIn, ZipRecruiter, Workday) | partial | per-search | Simplest single endpoint; good breadth, less ATS depth. |
| Coresignal | LinkedIn-deep + enrichment | ❌ | pricey ($0.2/job small plans) | Overkill for us. Skip. |

## Recommendation — **TheirStack** (primary), Apify (backup)
Why TheirStack wins for you:
- **It hits the boards that matter for real employer jobs** — not just LinkedIn/Indeed, but the **ATS platforms (Greenhouse, Lever, Ashby, Workable)** where companies post "on-camera creator / video presenter" roles. That's the exact off-Upwork territory you're missing.
- **Deduped + fresh** (every minute) — one clean list, no cross-board duplicates.
- **Free tier to start; $49/mo ceiling.** Cheapest multi-source option.
- **We already have the code half-built** — `outreach-agent/src/theirstack.ts` was scaffolded for exactly this. It just never had a key.

Two easy ways to run it (pick one):
1. **Connect the TheirStack MCP** in your Claude connectors (like Gmail/Notion). Then I pull every relevant job **directly, no code** — just like I read your mail now. (TheirStack ships a job-data MCP server.)
2. **API key → the existing pipeline.** You create a free TheirStack key; I wire it into the sourcing script → it queries your titles (video presenter/spokesperson/host/UGC/creator, remote/US, incl. ATS) → scores against your 4 buckets → daily digest to your inbox/repo. Same shape as your Upwork agent.

**Apify as backup / supplement:** if you'd rather pay-per-use with no subscription, the Apify **"All Jobs Scraper" (39 platforms)** or **LinkedIn Jobs Scraper** does the job too; we'd add our own dedup. Keep it in reserve.

## The one thing needed to make this "done"
A **TheirStack account** (free tier) → either connect its **MCP** to Claude, or paste me an **API key**. That single step flips this from hand-searching to auto-ingesting every relevant job, everywhere, deduped and scored.

> Honest note on why it wasn't done: the original plan included TheirStack, but no key/connection was ever added — so the pipeline had no live data and I fell back to manual web search. This closes that gap.

### Sources
TheirStack coverage/pricing: theirstack.com/en/blog/best-job-posting-apis · Apify actors: apify.com (All Jobs Scraper, curious_coder/linkedin-jobs-scraper, misceres/indeed-scraper) · Bright Data & Coresignal comparisons: brightdata.com/blog/web-data/best-job-apis · SerpApi Google Jobs.
