"use client";
import { signInAction } from "@/app/actions/auth";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { redirect } from "next/navigation";
import { useState, useTransition } from "react";

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  return (
    <div className="flex h-151 items-center justify-center bg-gradient-to-br from-[var(--app-tint] via-white to-[var(--app-tint)] ">
      <div className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign in to your account
        </h1>
        <form action={(formData) => 
                  startTransition(async () => {
                    setError(null);
                    const res = await signInAction(formData);
                    if(!res?.ok){
                      // console.log("res: ", res);
                      setError(res.message ?? "Invalid input");
                    }
                    else{
                      redirect("/");
                    }
                  })}  
          className="flex flex-col gap-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="border-gray-300 focus:border-blue-500"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="border-gray-300 focus:border-blue-500"
          />
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
            {pending ? "Signing In..." : "Sign In"}
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
        <p className="text-center text-gray-500 text-sm mt-5">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[var(--app-tint)]">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
