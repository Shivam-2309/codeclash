"use client";

import Link from "next/link";
import { Button } from "./Button"

export default function Navigation() {
  return (
    <header className="bg-white backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-13 bg-white rounded-lg flex items-center justify-center">
              <img src="/swords_logo.png" alt="LOGO" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Code-Clash
            </span>
          </Link>

          <Link href="/" className="flex items-center space-x-6">
            <Button
                type="submit"
                className="mt-2 rounded-md bg-[var(--app-tint)] py-2 text-white transition hover:bg-[color-mix(in oklab, var(--app-tint) 88%, black)]"
              >
              Home
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}