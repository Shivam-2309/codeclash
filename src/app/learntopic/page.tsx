import { redirect } from "next/navigation";

async function learnTopicAction(formData: FormData) {
  "use server";
  const topic = ((formData.get("topic") as string) || "").trim();

  if (!topic || topic.length < 2) {
    redirect("/learntopic?error=Please%20enter%20a%20valid%20topic");
  }

  const encoded = encodeURIComponent(topic);
  redirect(`/learntopic/${encoded}`);
}

export default function LearnTopicPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const error = searchParams?.error ?? "";

  return (
    <main className="min-h-[70vh] py-12">
      <section className="mx-auto w-full max-w-2xl px-4">
        <div className="rounded-2xl border border-indigo-100 bg-white/80 p-8 shadow-sm backdrop-blur">
          <header className="mb-6">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
              Learn a Topic
            </h1>
            <p className="mt-2 text-gray-600">
              Enter a topic and jump straight to curated resources and videos.
            </p>
          </header>

          <form action={learnTopicAction} className="space-y-5">
            <div>
              <label
                htmlFor="topic"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Topic
              </label>
              <input
                id="topic"
                name="topic"
                type="text"
                placeholder="e.g., Graph Algorithms"
                required
                className="
                  block w-full rounded-md border border-gray-300
                  bg-white px-3 py-2 text-gray-900 shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--app-tint)]
                "
              />
              <p className="mt-1 text-xs text-gray-500">
                Tip: Try topics like “Dynamic Programming” or “System Design”.
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg px-4 py-2 text-white
                    bg-[var(--app-tint)]
                    shadow-sm transition
                    hover:bg-[color-mix(in_oklab,var(--btn-bg,oklch(55%_0.16_260))_92%,white)]
                    active:bg-[color-mix(in_oklab,var(--btn-bg,oklch(55%_0.16_260))_92%,black)]
                    active:scale-[0.98]
                    focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2
                    focus-visible:ring-[color-mix(in_oklab,var(--btn-bg,oklch(55%_0.16_260))_35%,white)]
                    disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Submit
            </button>

            {error && (
              <p
                role="alert"
                aria-live="polite"
                className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
              >
                {error}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
