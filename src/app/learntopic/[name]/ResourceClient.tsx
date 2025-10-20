// app/learntopic/[name]/ResourcesClient.tsx
"use client";

import { useEffect, useState } from "react";
import type { Resource } from "@/lib/gemini";

function toYouTubeEmbed(url: string): string | null {
  const reg =
    /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?.*&v=)([^#&?]{11}).*/;
  const m = url.match(reg);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

export default function ResourcesClient({ topic }: { topic: string }) {
  const [data, setData] = useState<Resource[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setErr(null);

    fetch("/api/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const json = await r.json();
        if (active) setData(json.resources);
      })
      .catch((e) => active && setErr(e.message))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [topic]);

  if (loading) return <p className="text-gray-600">Loading resources…</p>;
  if (err) return <p className="text-red-600">Error: {err}</p>;
  if (!data?.length) return <p className="text-gray-600">No resources yet.</p>;

  return (
    <ul className="space-y-3">
      {data.map((r, i) => {
        const isVideo = r.type === "video" ? true : false;
        const embed = isVideo ? toYouTubeEmbed(r.url!) : null;
        {isVideo ? console.log("video: ", embed) : console.log("Not a Video")}

        return (
          <li key={i} className="rounded-lg border p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-medium text-gray-900">{r.title}</h3>
                {r.summary && (
                  <p className="text-sm text-gray-600 mt-1">{r.summary}</p>
                )}
                {r.type && (
                  <span className="inline-block mt-2 text-xs rounded bg-gray-100 px-2 py-0.5 text-gray-700">
                    {r.type}
                  </span>
                )}
              </div>

              {!isVideo && r.url && (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Open
                </a>
              )}

              {isVideo && embed && (
                <iframe
                  className="h-48 w-80 rounded-lg"
                  src={embed}
                  title={r.title || "YouTube video"}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}

              {isVideo && !embed && (
                <span className="text-sm text-red-600">
                  Unsupported video URL
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
