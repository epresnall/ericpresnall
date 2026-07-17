# ▶ Paste this into a NORMAL Claude.ai chat (not Claude Code)

**Why:** the coding environment can't see your Apify connector or reach job sites. A regular
Claude.ai chat can — your Apify + Gmail connectors work there. Make sure both are enabled in
that chat (connector icon), then paste everything below the line.

---

You are my job-sourcing agent. Use my **Apify** connector to pull real jobs and my **Gmail**
connector to draft a digest email. Do it end to end, then tell me what you did.

**WHO I AM (for scoring + cover letters):** Eric Presnall — on-camera video spokesperson,
presenter & host, 20+ years, LA-based, works fully remote worldwide, US business hours. Upwork
Top Rated Plus (Top 1%, 8 categories), 500+ five-star projects, 250+ brands (Microsoft,
Facebook, Ahrefs, Sony). I take a brief end to end — script → teleprompter delivery → edited
video, 24–48h. Reel: https://videorep.co · eric@ericpresnall.com

**STEP 1 — SCRAPE (Apify).** Find and run a LinkedIn Jobs scraper actor and an Indeed scraper
actor via the Apify connector. Search these titles (run several):
on-camera host, on-camera presenter, video spokesperson, brand spokesperson, video presenter,
video host, YouTube host, UGC creator, creator in residence, content creator (on-camera).
Filters: Remote or US. Keep it lean (~a few hundred results total) so it stays cheap.

**STEP 2 — SCORE + FILTER.**
- Drop anything that ISN'T on-camera (no editors/videographers/producers-only).
- **Drop live-selling / livestream-shopping / QVC-style host roles — I don't do those.**
- Drop gender- or language-restricted roles I don't qualify for; drop sub-$20/hr floor gigs.
- Score each 0–100 for on-camera fit. Tag a bucket: Sales Funnel / Content Marketing /
  Product & Training / General Spokesperson. Flag "anchor" roles (ongoing, one recurring face).
- Keep the top ~8, sorted high→low.

**STEP 3 — WRITE, for each kept job:** a cover letter that's ~60% about THEM (their company/
product/audience) and 40% me — warm, direct, first-person, no "Dear Hiring Manager," one proof
point, end with the reel link. Plus 3–4 likely screening answers in my voice.

**STEP 4 — EMAIL (Gmail).** Create a **draft** to eric@theglobalexperience.co:
- Subject: `On-camera jobs: ready to review (today's date)`
- Body: `N good-fit roles.` then, for each: `[score] Role — Company — location — apply link`,
  followed by its cover letter + screening answers. Verify each apply link is a real posting URL
  from the scrape (not invented).

Then reply in chat with the list of roles + scores so I can glance at it. Run this whenever I
say "run my jobs."

---

**Reference:** my full resume, cover-letter template, screening-answer prompt, and reel/
portfolio guide live in my GitHub repo under `job-pipeline/` (files: `resume.md`,
`cover-letter-template.md`, `ai-prompt-screening-answers.md`, `files/*.docx`).
