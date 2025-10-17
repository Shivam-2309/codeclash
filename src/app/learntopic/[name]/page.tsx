// app/learntopic/[name]/page.tsx
export default async function LearnTopicResult({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const topic = decodeURIComponent(params.name);
  console.log("TOPIC: ", topic);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          {topic}
        </h1>
        <p className="mt-2 text-gray-600">
          Curated videos and articles will appear below.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-4 shadow-sm">
          <h2 className="font-medium text-gray-900">Sample resource</h2>
          <p className="text-sm text-gray-600">Add your fetched content here.</p>
        </div>
      </div>
    </main>
  );
}
