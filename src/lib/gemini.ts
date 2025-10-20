import { GoogleGenerativeAI } from "@google/generative-ai";

export type Resource = {
  title: string;
  url?: string;
  type?: "video" | "article" | "doc" | "other";
  summary?: string;
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function cleanResponse(text : string) {
  if (typeof text !== "string") return "";

  let s = text.trim();
  s = s.replace(/^``````$/i, "").trim();

  const firstBrace = s.indexOf("{");
  const firstBracket = s.indexOf("[");
  let start = -1;
  let opener = "";
  let closer = "";

  if (firstBrace === -1 && firstBracket === -1) {
    return s; 
  }

  if (firstBrace === -1 || (firstBracket !== -1 && firstBracket < firstBrace)) {
    start = firstBracket;
    opener = "[";
    closer = "]";
  } else {
    start = firstBrace;
    opener = "{";
    closer = "}";
  }

  let depth = 0;
  let inString = false;
  let escapeNext = false;
  let end = -1;

  for (let i = start; i < s.length; i++) {
    const ch = s[i];

    if (inString) {
      if (escapeNext) {
        escapeNext = false;
      } else if (ch === "\\") {
        escapeNext = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    } else {
      if (ch === '"') {
        inString = true;
        continue;
      }
      if (ch === opener) depth++;
      else if (ch === closer) {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
  }

  if (end === -1) {
    return s;
  }

  return s.slice(start, end + 1).trim();
}


export async function getLearningResources(topic: string): Promise<Resource[]> {
  const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

  const prompt = `
Return a JSON array of exactly 8 learning resources for "${topic}".
The content should come in order that they form beginner till advanced say i get topics like Graphs, then I should start from 
Basic DFS and BFS and then go till advanced topics, like this kind of a learning module, the video should be from a youtube that is not very old if you giving a video 
Give working videos only, which play and are available. there should be exacty half videos and other categories.
Each item must be:
{
  "title": string,
  "url": string,
  "type": "video" | "article" | "other",
  "summary": string
}
Only output valid JSON. Do not add any extra text.
`.trim();

  const resp = await model.generateContent(prompt);
  const text = resp.response.text().trim();
  const text1 = cleanResponse(text);

  try {
    const data = JSON.parse(text1);
    if (Array.isArray(data)) {
      return data;
    }
  } catch {
    // fall through to fallback
  }

  return [
    {
      title: `Intro resources for ${topic}`,
      type: "other",
      summary:
        "Model did not return valid JSON. Please retry or refine the prompt."
    }
  ];
}
