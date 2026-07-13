# Overnight improvement loop — log

Self-limiting background loop (~15-min bursts, target ~24 bursts / ~6 hours).
Each burst: one bounded improvement to the job pipeline, committed to the repo.
When this log reaches ~24 entries, the loop stops itself. User can stop anytime with "stop".

| # | what improved |
|---|---|
| 0 | Seed — set up spec, first batch (11 roles incl. Care.com 12-mo anchor), playbooks, START-HERE. |
| 1 | Sourcing sweep: added recurring Live-Shopping Host (TikTok Shop/Whatnot luxury resale) as anchor-shaped Tier 2; dropped video-editor roles (behind camera) — confirmed dedupe discipline. |
| 2 | Built playbooks/retainer-pricing.md — three retainer tiers ($5K/$10K/$15K), how to present/anchor/justify/close, "never hourly" rules. Closes the gap between "interested" and a signed monthly deal. |
| 3 | RESEARCH: analyzed Eric's real Upwork/GetMany sends + stats. Found the leak = follow-up, not sourcing (warm replies like "Ben" stall on price/location/is-it-you). Built DIAGNOSIS.md, answers-clients-always-ask.md, accurate resume.md, and 2026-07-09-linkedin-picks.md (NYRA host + Twine). |
| 4 | SCOPE FIX: locked system to OFF-UPWORK only (LinkedIn/Greenhouse/Ashby/Lever/Wellfound/Seek/company pages) — Upwork is the separate GetMany agent. Reframed DIAGNOSIS as transferable lessons. Added cover-letter rule "make it ABOUT THEM (60% them/40% Eric)". Found + baked in real booking link (cal.com/videorep/eric-presnall-contact-call). |
| 5 | DEEP RESEARCH on auto-sourcing (Apify/aggregators). Recommendation: TheirStack (315k sources incl. Greenhouse/Lever/Ashby ATS, deduped, free tier→$49/mo) as primary; Apify All-Jobs-Scraper as backup. Wrote SOURCING-RESEARCH.md. The one missing input = a TheirStack key/MCP → flips manual search into auto-ingest of every relevant job. |
| 6 | DEEP RESEARCH → full application kit (multi-source: Backstage/SAG-AFTRA/NewsLab/Teal/Jobscan/Enhancv + LinkedIn/Greenhouse market data). Built the "whole lot": rebuilt `resume.md` ATS-safe + on-camera-specific; `cover-letter-template.md` (about-them, 4-beat, 2 examples); `ai-prompt-screening-answers.md` (voice-locked prompt); `portfolio-reel-guide.md` (reel/portfolio); `RESUME-STRATEGY.md` (master playbook: tailor-per-job = 6x interviews, which titles/boards to search, 15-min per-job workflow). Verdict on tailoring: keep one master, tweak 3 things per role (~15 min). |
| 7 | Generated real uploadable resume FILES in `files/`: ATS-safe master `.docx` + 4 bucket-tailored variants (Sales-Funnel/Content/Product/Live-Shopping) + paste-in `.txt` + files/README. |
| 8 | LIVE SOURCING (3 parallel agents across LinkedIn/Wellfound, Greenhouse/Ashby/Lever, company pages). Found root cause of the 404s: **this session's egress policy 403-blocks all job-site WebFetch**, so links can't be verified from here. Built `2026-07-13-live-batch.md`: 12 ranked leads, full paste-ready packs for top 3 (Grüns LA $105-125K FIT95 · Care.com remote 12-mo FIT92 (all 3 agents corroborated) · LumiMeds remote FIT82), each mapped to a resume variant + reel clip. Fix for verification = add TheirStack/Apify MCP (bypasses egress proxy) OR loosen policy OR Eric click-verifies top 3. |
