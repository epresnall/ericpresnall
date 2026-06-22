// Generates job-application materials (cover letter + custom-video script +
// screening-question answers) from a job description + Eric's resume profile.
// Uses the Anthropic SDK with structured JSON output. Falls back to a
// deterministic offline draft when no API key is present (MOCK / preview mode).
import Anthropic from "@anthropic-ai/sdk";
import { PROFILE, profileText } from "./profile";
import type { JobInput, Materials, ScreeningAnswer } from "./types";

const MODEL = process.env.COCKPIT_MODEL || "claude-opus-4-8";

// Pull a JSON object out of the model's reply, tolerating ``` fences / stray prose.
function extractJson(text: string): Materials {
  let s = text.trim();
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) s = fence[1].trim();
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start >= 0 && end > start) s = s.slice(start, end + 1);
  return JSON.parse(s) as Materials;
}

function splitQuestions(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split("\n")
    .map((q) => q.replace(/^\s*[-*\d.)]+\s*/, "").trim())
    .filter(Boolean);
}

export function hasKey(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

/** Live generation via Claude. Throws if no key (callers should check hasKey). */
export async function generateLive(job: JobInput): Promise<Materials> {
  const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env
  const questions = splitQuestions(job.screeningQuestions);

  const system = `You are helping ${PROFILE.name} apply for on-camera video roles. Write in his real voice using ONLY his real experience below — never invent clients, numbers, or credentials. Tailor everything to the specific company and role.

VOICE/TONE: ${PROFILE.tone}

CANDIDATE PROFILE:
${profileText()}

OUTPUT RULES:
- coverLetter: 180–280 words, addressed to the hiring team, specific to THIS company/role, one clear value-forward hook drawn from his real wins, ends with a light CTA to view his reel (${PROFILE.links[0].url}). No clichés, no "I am writing to apply".
- videoScript: a 45–75 second custom on-camera audition/intro script HE would record for THIS role — natural spoken language, first person, a strong hook in the first line, references the company/role, shows personality. Mark only light stage directions in [brackets].
- screeningAnswers: answer each provided question concretely in his voice. If no questions are provided, anticipate 3–5 likely screening questions for this role and answer them.

Return ONLY a single JSON object — no prose, no markdown code fences — with this exact shape:
{"coverLetter": "string", "videoScript": "string", "screeningAnswers": [{"question": "string", "answer": "string"}]}`;

  const questionBlock = questions.length
    ? `SCREENING QUESTIONS TO ANSWER:\n${questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}`
    : `No screening questions were provided — anticipate 3–5 likely ones for this role and answer them.`;

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    system,
    messages: [
      {
        role: "user",
        content: `Generate the application materials for this role.

COMPANY: ${job.company}
ROLE: ${job.title}

JOB DESCRIPTION:
${job.description.slice(0, 12000)}

${questionBlock}`,
      },
    ],
  });

  const text = res.content.find((b) => b.type === "text");
  if (!text || text.type !== "text") throw new Error("No content returned from model");
  const parsed = extractJson(text.text);
  return {
    coverLetter: parsed.coverLetter ?? "",
    videoScript: parsed.videoScript ?? "",
    screeningAnswers: Array.isArray(parsed.screeningAnswers) ? parsed.screeningAnswers : [],
  };
}

/** Deterministic offline draft so the dashboard works with no API key (preview). */
export function generateMock(job: JobInput): Materials {
  const company = job.company || "your team";
  const role = job.title || "this on-camera role";
  const win = PROFILE.wins[0];

  const coverLetter = `Hi ${company} team,

${role} caught my eye — it's squarely what I do every day. I'm an on-camera video presenter with 20+ years in front of the lens: Top Rated Plus on Upwork (Top 1%), 500+ five-star projects for brands like Microsoft, Facebook, Ahrefs, and Sony.

What sets me apart is that I'm not just a face on camera — I take a brief end to end: research, scripting, and delivery, with a free script review every time and a 24–48h turnaround. A quick proof point: ${win}

I'd love to bring that to ${company}. You can see my reel here: ${PROFILE.links[0].url}.

— ${PROFILE.name}

[Preview draft — add your Anthropic API key to generate a fully tailored version.]`;

  const videoScript = `[Smile, direct to camera]
Hey ${company} — I'm Eric. The moment I saw you were hiring for ${role}, I had to reach out.

[Beat]
For 20 years I've lived in front of the camera — Broadway stages, Animal Planet, and 500-plus videos for brands like Microsoft and Sony. But here's the thing: I don't just read a script, I help build it. Research, scripting, delivery — end to end.

[Warm, confident]
Give me a brief and a deadline, and in 24 to 48 hours you'll have something that actually converts. Let's make something great together.

[Smile] Talk soon.

[Preview draft — add your Anthropic API key for a role-specific script.]`;

  const provided = splitQuestions(job.screeningQuestions);
  const qs = provided.length
    ? provided
    : [
        "Why are you a fit for this role?",
        "What's your experience with on-camera / teleprompter delivery?",
        "What's your typical turnaround time?",
      ];
  const screeningAnswers: ScreeningAnswer[] = qs.map((q) => ({
    question: q,
    answer: `${PROFILE.bio.split(".")[0]}. For ${role} specifically, I'd bring strategy + scripting + on-camera delivery end to end, with a 24–48h turnaround. [Preview answer — add your API key for a tailored response.]`,
  }));

  return { coverLetter, videoScript, screeningAnswers };
}

export async function generate(job: JobInput): Promise<{ materials: Materials; source: "mock" | "live" }> {
  if (hasKey()) {
    return { materials: await generateLive(job), source: "live" };
  }
  return { materials: generateMock(job), source: "mock" };
}
