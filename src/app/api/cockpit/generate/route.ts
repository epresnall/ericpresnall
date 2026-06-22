import { NextResponse } from "next/server";
import { generate } from "@/lib/cockpit/generate";
import type { JobInput } from "@/lib/cockpit/types";

// Generation can take many seconds; run on Node (not Edge) and allow time.
export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as JobInput | null;
  if (!body || !body.title || !body.company || !body.description) {
    return NextResponse.json(
      { error: "title, company, and description are required" },
      { status: 400 },
    );
  }
  try {
    const { materials, source } = await generate({
      title: body.title,
      company: body.company,
      description: body.description,
      screeningQuestions: body.screeningQuestions,
    });
    return NextResponse.json({ materials, source });
  } catch (err) {
    const message = err instanceof Error ? err.message : "generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
