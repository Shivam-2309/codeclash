import Link from "next/link";
import { Button } from "@/app/components/Button";
import ResourcesClient from "./ResourceClient";

export default async function LearnTopicResult({
  params,
}: {
  params: { name: string };
}) {
  const topic = decodeURIComponent(params.name);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <header className="mb-8">
        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-5 ring-1 ring-inset ring-blue-100">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
            {topic}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Curated videos and articles will appear below.
          </p>
        </div>
      </header>
      <div className="mb-8">
      </div>

      <section aria-labelledby="resources-heading" className="space-y-4">
        <h2 id="resources-heading" className="sr-only">
          Resources
        </h2>

        <div className="rounded-xl border border-gray-200/80 bg-white shadow-sm shadow-gray-100">
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="text-sm font-medium text-gray-800">Recommended for you</p>
          </div>
          <div className="p-4">
            <ResourcesClient topic={topic} />
          </div>
        </div>
      </section>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 my-3">
          <Link href="/solopractice" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">Time to Practice</Button>
          </Link>
        </div>
      <div className="h-6" />
    </main>
  );
}
