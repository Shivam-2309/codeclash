// app/api/resources/route.ts
import { NextResponse } from "next/server";
import { getLearningResources } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();
    if (!topic || typeof topic !== "string") {
      return NextResponse.json({ error: "Missing 'topic' string" }, { status: 400 });
    }
    const resources = await getLearningResources(topic);
    return NextResponse.json({ resources }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}
