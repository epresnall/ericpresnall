# Off-Upwork Inbound Job Engine — Build Spec

The permanent home for Eric's **off-Upwork** on-camera job sourcing. This mirrors the
existing Upwork/GetMany agent, but hunts the territory Upwork can't see: companies posting
on-camera roles on LinkedIn, Indeed, Glassdoor, Built In, casting sites, and company pages.

**Goal (the north star):** land **3 anchor clients on ongoing retainers, ~$5–15K/mo each,
~12 months.** Everything here is ranked and worded to serve that — not to chase one-off gigs.

---

## 1. What the engine does (daily)

```
1 SOURCE     Pull current on-camera roles from the feeds below (+ Eric's LinkedIn alerts already in Gmail)
2 SCORE      Two axes: (a) on-camera FIT 0–100, (b) ANCHOR potential High/Med/Low
3 FILTER     Drop behind-camera (editor/operator/videographer), non-US, non-remote, and pure low-ticket gigs
4 BUILD      Per good-fit job: analysis · likely screening Qs + answers · cover letter (Eric's voice) · 30–45s video script · "the play"
5 DELIVER    Email digest to eric@theglobalexperience.co, ranked by anchor potential (same format as the Upwork digest)
6 WARM-INTRO Separately surface recently-closed on-camera roles as warm-intro targets
```

---

## 2. Sourcing — search terms

Run these across Indeed / Glassdoor / LinkedIn / Built In / Dynamite Jobs / WeWorkRemotely /
Casting Networks, filtered to **remote, US-first**:

- **Bucket 1 (Sales Funnel):** VSL presenter, ad spokesperson, direct-response presenter, UGC ad creator, commercial spokesperson, pitch presenter
- **Bucket 2 (Content Marketing):** on-camera content creator, UGC creator, video host, short-form creator, YouTube host, brand ambassador (on-camera), e-learning presenter
- **Bucket 3 (Product & Training):** product demo presenter, SaaS demo presenter, explainer video presenter, onboarding/tutorial presenter
- **Bucket 4 (General / Spokesperson):** video spokesperson, brand/corporate spokesperson, on-camera host, on-air talent, video presenter, virtual presenter

Also read Eric's inbound LinkedIn job alerts (labelled in Gmail) for "video spokesperson,"
"on-camera," "video lead" — that raw feed already arrives daily.

---

## 3. Scoring

### Axis A — On-camera FIT (0–100)
- **Reward:** explicit on-camera delivery; remote or US-hybrid; presenter/spokesperson/host/UGC; end-to-end (script + deliver); brand/marketing video.
- **Penalize / DROP:** editor, producer (no on-camera), camera operator, videographer, motion graphics, post-only; non-US; fully unpaid.
- Tiers: A 80–100 · B 60–79 · C 40–59 · DROP <40.

### Axis B — ANCHOR potential (the money axis)
- **HIGH:** real company + **ongoing** need (recurring content, "face of brand," ambassador, retainer language, part-time ongoing) + budget signal (funded, established, ad spend). → pursue hard.
- **MED:** brand with budget but the posting is a one-off → door-opener; take it, convert the brand up.
- **LOW:** true one-off / low-ticket ($30/hr UGC, $450/mo volume) → skip unless a slow week.

> **Rank the digest by ANCHOR potential, not pay-per-gig.** The $5–15K/mo is never printed on a
> posting — it's *made in the conversation* by converting an ongoing-need company from a per-video
> hire into a VideoRep content partner.

---

## 4. Eric's profile (generation source of truth)

- **Who:** Eric Presnall — on-camera video spokesperson/presenter/host. Brand: **VideoRep**. LA.
- **Cred:** 20+ yrs video, 6 yrs Upwork **Top Rated Plus (Top 1%, 8 categories)**, 500+ five-star projects, 250+ global brands (Microsoft, Facebook, Ahrefs, Sony). Military veteran, HubSpot certified. B.S. Psychology.
- **Differentiator:** not just a face — marketer + strategist + creative director, full team behind him. Takes a brief end-to-end (research → script → deliver). 24–48h turnaround. Free script review. Full refund if the first video's a miss.
- **Reel:** https://videorep.co
- **Approved proof points (use only these; anonymize in video):**
  - BusinessLoans.com: 1 UGC ad → positive ROAS 6 straight months (best creative ever)
  - Financial advisory: 3x conversion, 2.28x CTR, CPA cut in half, running 7+ months
  - 86,000+ views on one educational video · 120+ prod hours saved/quarter
- **Voice rules:** warm, confident, calm, authentic — never salesy/corporate. Conversational, third-grade clarity, one sentence per line, value-first (Hormozi-influenced). Clarity over cleverness. Never mention pricing in video.

---

## 5. Materials templates

### Cover letter (per bucket opener, then tailor)
Start with the company/role — **never** "I" or "Dear." End pointing to the reel with 👉. Keep it tight.
- **B1 Sales Funnel:** "[Name/Company] — human-led, direct-response video that converts is exactly what I do…"
- **B2 Content:** "[Company] — I help brands build audiences with human-led content that compounds…"
- **B3 Product/Training:** "[Company] — human-led demos/onboarding cut churn and support time…"
- **B4 General:** "[Company] — a professional on-camera spokesperson who represents your brand across any video…"
Always weave in: one real proof point + 24–48h turnaround + free sample offer + 👉 https://videorep.co
**Anchor line (always include for HIGH):** "Happy to start with [the role] and grow into whatever ongoing content you need — I bring a full team with me."

### Screening answers
Answer the posting's actual questions. If none given, pre-answer the likely ones (reel link, rate/availability, why-this-brand, sample video). Concrete, in-voice, real proof only.

### Custom video script (30–45s — doubles as the sample many roles require)
First-person, strong first line, references the company/role, natural spoken language, one sentence per line, light [stage directions]. This is Eric's edge — always include one.

---

## 6. Email digest format (match the Upwork agent)

- **From/To:** eric@theglobalexperience.co (self-digest)
- **Subject:** `On-camera jobs: ranked by anchor potential (YYYY-MM-DD)`
- **Body:** "N good-fit on-camera jobs." → **Tier 1 (go hard)** then **Tier 2 (door-openers)** then **Tier 3 (skip)**; each Tier 1/2 job shows `[fit] Role — Company`, a clickable link, the cover letter, the video script, "the play," and the likely questions. Footer: warm-intro targets + the golden rule.
- **Golden rule (put in every digest):** *never quote hourly — quote a monthly relationship.*

---

## 7. Closing playbooks (turn replies into retainers)
See `playbooks/conversation.md` (reply → retainer) and `playbooks/warm-intro.md`
(recently-closed roles = proven demand + budget). The whole point of applying is to open the
ongoing-relationship conversation.

---

## 8. Open inputs Eric still owes
- **Booking link** (Cal.com/Calendly) — CTA in every cover letter + message; currently a placeholder.
- **Evergreen intro video** (45–60s, reusable) + custom samples for Tier-1 anchors (scripts provided per job).

## 9. Where to run it
Ideal: alongside the existing Upwork/GetMany agent (same daily-email automation → localhost:8765
dashboard). This spec is written so a developer/VA can plug it into that stack and have it email
Eric every morning, identical experience to the Upwork digest.
