import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import NavigationUser from "@/app/components/NavigationUser";
import Navigation from "./components/Navigation";
import { Slider } from "@/components/ui/slider"
import { CardBody, CardContainer, CardItem  } from "@/components/ui/3d-card"

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue to-indigo-100">
          <header className="relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
              <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
            </div>

            <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                  CodeClash
                  <span className="block text-[var(--app-tint)]">
                    Real‑time Coding Duels
                  </span>
                </h1>

                <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                  Challenge friends on live Codeforces problems with timers,
                  synchronized states, and fair‑play tools in a focused arena.
                </p>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  <FeatureCard
                    title="Codeforces synced"
                    desc="Pick rated problems with tags and difficulty, auto‑synced to both players."
                  />
                  <FeatureCard
                    title="Built-in timer"
                    desc="Fair countdown per duel; pause, resume, and tiebreak rules supported."
                  />
                  <FeatureCard
                    title="Filter problems"
                    desc="Solve problems at your comfort rating with tag and difficulty filters."
                  />
                </div>
                  <div className="mt-10 width-full">
                    <div className="max-w-md mx-auto flex items-center justify-center gap-4">
                      <Link
                        href="/signin"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-medium text-white bg-[var(--app-tint)]"
                      >
                        Sign in to Duel
                      </Link>
                      <Link
                        href="/signup"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-medium text-gray-800 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        Create an Account
                      </Link>
                    </div>
                  </div>
              </div>
            </main>
          </header>
          <section className="border-t border-gray-200 bg-white/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Practice that feels like a match
                  </h2>
                  <p className="mt-4 text-gray-600">
                    Queue with a friend, choose constraints, and track penalties
                    and submissions on a shared scoreboard.
                  </p>
                  <div className="mt-6 flex gap-3">
                    <Link
                      href="/signin"
                      className="inline-flex items-center justify-center px-5 py-2.5 rounded-md text-sm font-medium text-white bg-[var(--app-tint)]"
                    >
                      Start a Duel
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
                    <div className="text-2xl text-gray-50">Timer</div>
                    <Slider defaultValue={[33]} max={100} step={1} />
                    <div className="mt-6 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
                      Current: 158B — Training Schedule (CF Div2) • 1200
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -inset-x-6 -inset-y-6 -z-10 bg-gradient-to-tr from-indigo-200/40 to-blue-200/40 blur-2xl rounded-2xl" />
                </div>
              </div>
            </div>
          </section>

          <footer className="bg-gray-950 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-white grid place-items-center ring-1 ring-white/10 p-1">
                      <img src="/swords_logo.png" alt="" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">CodeClash</h3>
                  </div>
                  <p className="mt-3 text-gray-400">
                    A focused arena for head‑to‑head problem solving with Codeforces integration, timers, and fair‑play tools.
                  </p>
                </div>

                <nav className="grid grid-cols-2 gap-3 md:justify-items-center">
                  <div>
                    <h4 className="text-sm font-medium text-white/90">Product</h4>
                    <ul className="mt-3 space-y-2 text-sm">
                      <li>
                        <Link href="/" className="hover:text-white transition-colors">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link href="/signin" className="hover:text-white transition-colors">
                          Sign in
                        </Link>
                      </li>
                      <li>
                        <Link href="/signup" className="hover:text-white transition-colors">
                          Create account
                        </Link>
                      </li>
                      <li>
                        <Link href="/signup" className="hover:text-white transition-colors">
                          Dashboard
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white/90">Resources</h4>
                    <ul className="mt-3 space-y-2 text-sm">
                      <li>
                        <Link href="/learntopic" className="hover:text-white transition-colors">
                          Learn a topic
                        </Link>
                      </li>
                      <li>
                        <Link href="/docs" className="hover:text-white transition-colors">
                          Docs
                        </Link>
                      </li>
                      <li>
                        <Link href="/support" className="hover:text-white transition-colors">
                          Support
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy" className="hover:text-white transition-colors">
                          Privacy
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>

                <div className="justify-self-center sm:justify-self-end">
                  <div className="rounded-xl border border-white/10 bg-white backdrop-blur-md p-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                    <CardContainer className="inter-var">
                        <CardItem translateZ="90" className="w-full">
                          <img
                            src="/swords_logo.png"
                            alt="CodeClash"
                            className="w-56 h-28 object-contain mx-auto drop-shadow"
                          />
                        </CardItem>
                    </CardContainer>
                  </div>
                </div>
              </div>
              <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-gray-500">
                  © {new Date().getFullYear()} CodeClash. All rights reserved.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <Link href="https://x.com" className="text-gray-400 hover:text-white transition-colors" aria-label="X">
                    X
                  </Link>
                  <Link href="https://github.com" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                    GitHub
                  </Link>
                  <Link href="mailto:support" className="text-gray-400 hover:text-white transition-colors" aria-label="Email">
                    Email
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </>
    );
  }

  // If there is a session: show a minimal authenticated landing or redirect pattern
  // If you want to redirect instead, you can use next/navigation redirect here.
return (
  <div className="min-h-screen bg-white">
    <NavigationUser />
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome back, {session.user?.name ?? "duelist"}!
      </h1>
      <p className="mt-3 text-gray-600">
        Head to your dashboard to start or join a duel.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top-left: Join Collaboration */}
        <button
          type="button"
          className="rounded-lg border border-gray-200 p-6 text-left shadow-sm hover:shadow-lg transition-shadow bg-indigo-200"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            Join Collaboration
          </h2>
          <p className="mt-2 text-gray-600">
            Practice with a friend in a shared session.
          </p>
        </button>

        {/* Top-right: Practice Solo */}
        <Link
          href="/solopractice"
          className="rounded-lg border border-gray-200 p-6 text-left shadow-sm hover:shadow-lg transition-shadow bg-indigo-200"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            Practice on your own
          </h2>
          <p className="mt-2 text-gray-600">
            Solo practice to sharpen your skills.
          </p>
        </Link>

        {/* Bottom: Join a Duel (full width) */}
        <button
          type="button"
          className="md:col-span-2 rounded-lg border border-gray-200 p-6 text-left shadow-sm hover:shadow-lg transition-shadow bg-indigo-200"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            Join a duel
          </h2>
          <p className="mt-2 text-gray-600">
            Enter a head-to-head match and compete now.
          </p>
        </button>
            <Link
              href="/learntopic"
              className="
              md:col-span-2 rounded-lg border border-gray-200 p-6 text-left shadow-sm hover:shadow-lg transition-shadow bg-indigo-200
              "
              aria-label="Learn a topic: enter a topic and see videos and resources"
            >
              <h2 className="text-xl font-semibold text-gray-900">Learn A Topic</h2>
              <p className="mt-2 text-gray-600">
                Enter the name of the topic and get videos and resources to learn it from the Internet.
              </p>
            </Link>
      </div>
    </main>
  </div>
);
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white/80 p-4 text-left shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </div>
  );
}
