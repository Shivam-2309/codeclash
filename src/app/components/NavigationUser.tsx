"use client";

import Link from "next/link";
import { Button } from "./Button";
import { signOutAction } from "../actions/auth";

export default function NavigationUser() {
  return (
    <header className="bg-white backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center">
          {/* Left: Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <img src="/swords_logo.png" alt="LOGO" className="max-h-full" />
            </div>
            <span className="text-xl font-bold text-gray-900">Code-Clash</span>
          </Link>

          {/* Spacer to push actions to right */}
          <div className="flex-1" />

          {/* Right: Actions */}
          <nav className="flex items-center gap-4">
            <Link href="/">
              <Button
                type="button"
                className="rounded-md bg-[var(--app-tint)] px-4 py-2 text-white transition hover:bg-[color-mix(in oklab,var(--app-tint) 88%,black)]"
              >
                Home
              </Button>
            </Link>

            <form action={signOutAction}>
              <Button
                type="submit"
                className="rounded-md bg-[var(--app-tint)] px-4 py-2 text-white transition hover:bg-[color-mix(in oklab,var(--app-tint) 88%,black)]"
              >
                Logout
              </Button>
            </form>
          </nav>
        </div>
      </div>
    </header>
  );
}
