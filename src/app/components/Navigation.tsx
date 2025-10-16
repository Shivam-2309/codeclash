"use client";

import Link from "next/link";
import { Button } from "./Button"

export default function Navigation() {
  return (
    <header className="bg-white backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[var(--app-tint)] rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Code-Clash
            </span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Button
                type="submit"
                className="mt-2 rounded-md bg-[var(--app-tint)] py-2 text-white transition hover:bg-[color-mix(in oklab, var(--app-tint) 88%, black)]"
              >
              Home
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}