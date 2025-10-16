// app/(auth)/signup/page.tsx
import { signUpAction } from "@/app/actions/auth";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-100 bg-white px-8 py-10 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">Create account</h1>
          <p className="mt-2 text-sm text-gray-500">Start your journey in seconds</p>
        </div>

        <form action={signUpAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="CF Name(Preferred)"
              autoComplete="name"
              required
              className="border-gray-300 var(--app-tint)"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="example@example.com"
              autoComplete="email"
              required
              className="border-gray-300 [var(--app-tint)]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              className="border-gray-300 focus:[var(--app-tint)]"
            />
            <p className="mt-1 text-xs text-gray-500">
              Use at least 8 characters, with a mix of letters and numbers.
            </p>
          </div>

          <Button
            type="submit"
            className="mt-2 rounded-md bg-[var(--app-tint)] py-2 text-white transition hover:bg-[color-mix(in oklab, var(--app-tint) 88%, black)]"
          >
            Sign Up
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Already have an account?</span>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            <a href="/signin" className="text-[var(--app-tint)] text hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
