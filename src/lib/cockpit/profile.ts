// Eric Presnall's consolidated resume / experience — the generation "fuel" for
// every job-application artifact. Sourced from the homepage timeline + skills
// (src/app/page.tsx) and the outreach brand sheet (outreach-agent/brand.json).
// Embedded as a module (not read from disk) so it bundles cleanly in serverless.

export interface Profile {
  name: string;
  headline: string;
  location: string;
  valueProp: string;
  bio: string;
  tone: string;
  links: { label: string; url: string }[];
  wins: string[];
  skills: { area: string; points: string[] }[];
  timeline: { year: string; title: string; location: string; detail: string }[];
  education: string;
}

export const PROFILE: Profile = {
  name: "Eric Presnall",
  headline:
    "On-camera video spokesperson, presenter & host (VideoRep) — Entrepreneur, Entertainer & Educator",
  location: "Los Angeles, CA (works remote, US-first)",
  valueProp:
    "Not just a face on camera — I think like a marketer, strategist, and creative director, with a full team behind me. I take a brief end to end: research, scripting, and on-camera delivery. 24–48h turnaround, and a free script review is always included.",
  bio: "20+ years in video and 6 years on Upwork as Top Rated Plus (Top 1% across 8 categories), with 500+ five-star projects for 250+ global brands including Microsoft, Facebook, Ahrefs, and Sony. Broadway national tours (American Idiot, Mamma Mia), Animal Planet TV host, national commercials (National Guard, KFC, Caltrans). Military veteran, HubSpot certified. B.S. Psychology, Macquarie University.",
  tone: "Warm, confident, calm, and authentic — never salesy or corporate. Conversational, like a trusted expert talking to one person. Direct and value-first. Clarity over cleverness, always.",
  links: [
    { label: "Reel / portfolio (VideoRep)", url: "https://videorep.co" },
    { label: "Personal site", url: "https://www.ericpresnall.com" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/ericpresnall/" },
    { label: "YouTube (business)", url: "https://www.youtube.com/@VideoContentForBusiness" },
    { label: "IMDb", url: "https://www.imdb.com/name/nm2558438/" },
  ],
  wins: [
    "BusinessLoans.com: one UGC ad drove positive ROAS for 6 straight months — their best-performing creative ever.",
    "Financial advisory firm: 3x conversion rate, 2.28x CTR, and CPA cut in half — campaign still running 7+ months later.",
    "86,000+ organic views on a single educational video; 120+ production hours saved per quarter for content clients.",
    "500+ video projects delivered for 250+ brands across 35+ countries.",
  ],
  skills: [
    {
      area: "On-camera performance",
      points: [
        "Authentic business communication on camera, teleprompter delivery, natural unscripted presence (500+ projects)",
        "Broadway national tours, lead musical-theater roles, national commercials, voice acting",
        "Host / brand ambassador experience (Animal Planet, Disney, live events)",
      ],
    },
    {
      area: "Strategy & scripting",
      points: [
        "End-to-end: research → script → on-camera delivery; free script review included",
        "Direct-response / VSL / UGC ad copy that converts; content-marketing and explainer formats",
        "Helps CEOs and leaders develop an authentic on-camera presence",
      ],
    },
    {
      area: "Production & tools",
      points: [
        "Sony A7III systems, Aputure/Godox lighting, Rode/Sennheiser audio; broadcast-quality home studio",
        "Adobe Premiere Pro, After Effects, Final Cut Pro, DaVinci Resolve",
        "Remote workflows: Frame.io, Dropbox, fast 24–48h turnaround",
      ],
    },
  ],
  timeline: [
    { year: "2024", title: "Creator & Host, Travel Time", location: "Global", detail: "Educational travel show for children — entertainment + cultural literacy." },
    { year: "2021", title: "Founder, The Spokesman / VideoRep", location: "Global", detail: "Six-figure video content business; Fortune 500 clients incl. Unilever, Microsoft, Ahrefs." },
    { year: "2020", title: "Business Development, Sydney's largest video production house", location: "Australia", detail: "Led video content sales and client relations." },
    { year: "2017", title: "Start Smart Program Lead, Commonwealth Bank", location: "Australia", detail: "Youth financial-literacy education and presentation." },
    { year: "2016", title: "Independent Filmmaker — Amusia", location: "USA", detail: "Wrote/directed/produced; $40K Kickstarter; Best Short Film, Sacramento Film & Music Festival." },
    { year: "2014", title: "Broadway National Tour — Mamma Mia (Sky, lead)", location: "USA/Canada/Colombia", detail: "Lead role across all 50 US states + international." },
    { year: "2013", title: "Broadway National Tour — American Idiot", location: "USA", detail: "Swing/Tunny across 30 states." },
    { year: "2011", title: "Animal Planet TV Host — Who Let the Dogs Out", location: "USA", detail: "Host & brand ambassador for Natural Balance; Times Square, Grand Ole Opry, Dodgers Stadium." },
    { year: "2009", title: "Disney Performer — High School Musical: La Fête", location: "France", detail: "Lead at Disneyland Paris; international performance experience." },
    { year: "2007", title: "Commercial Actor", location: "USA", detail: "National commercials: Caltrans, Cal Grant, National Guard, KFC." },
  ],
  education: "B.S. Psychology, Macquarie University (consumer psychology & communication theory). HubSpot certified. U.S. military veteran.",
};

/** Render the profile as a compact text block for the generation prompt. */
export function profileText(p: Profile = PROFILE): string {
  const skills = p.skills
    .map((s) => `- ${s.area}: ${s.points.join("; ")}`)
    .join("\n");
  const timeline = p.timeline
    .map((t) => `- ${t.year} — ${t.title} (${t.location}): ${t.detail}`)
    .join("\n");
  const links = p.links.map((l) => `${l.label}: ${l.url}`).join(" · ");
  return [
    `NAME: ${p.name}`,
    `HEADLINE: ${p.headline}`,
    `LOCATION: ${p.location}`,
    `VALUE PROP: ${p.valueProp}`,
    `BIO: ${p.bio}`,
    `VOICE/TONE: ${p.tone}`,
    `LINKS: ${links}`,
    `STANDOUT WINS:\n${p.wins.map((w) => `- ${w}`).join("\n")}`,
    `SKILLS:\n${skills}`,
    `CAREER TIMELINE:\n${timeline}`,
    `EDUCATION/CREDENTIALS: ${p.education}`,
  ].join("\n\n");
}
