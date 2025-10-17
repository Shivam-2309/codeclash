"use client"
import { signUpAction } from "@/app/actions/auth";
import { Input } from "../../components/Input";
import { useState, useTransition } from "react";
import { redirect } from "next/navigation";

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  return (
    <div className="flex h-151 items-center justify-center bg-gradient-to-br from-[var(--app-tint] via-white to-[var(--app-tint)] ">
      <div className="w-full max-w-md rounded-xl border border-gray-100 bg-white px-8 py-6 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Create account</h1>
          <p className="mt-2 text-sm text-gray-500">Start your journey in seconds</p>
        </div>

        <form action={(formData) => 
          startTransition(async () => {
            setError(null);
            const res = await signUpAction(formData);
            if(!res?.ok){
              setError(res.message ?? "Invalid input");
            }
            else{
              redirect("/");
            }
          })} 
          className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
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
          
        <button
          disabled={pending}
          type="submit"
          className={
            "mt-2 w-full rounded-md px-4 py-2 text-white " +
            "bg-[var(--app-tint)] transition " +
            "hover:bg-[color-mix(in oklab, var(--app-tint) 88%, black)] " +
            "disabled:opacity-60 disabled:cursor-not-allowed"
          }
        >
          {pending ? "Signing up..." : "Sign up"}
        </button>

        {error && (
          <p
            aria-live="polite"
            role="alert"
            className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {error}
          </p>
        )}

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
