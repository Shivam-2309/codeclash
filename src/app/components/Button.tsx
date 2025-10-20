// components/Button.tsx
"use client";

import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const baseClasses = [
  "inline-flex items-center justify-center whitespace-nowrap",
  "rounded-md px-3.5 py-2.5 text-sm font-medium",
  "transition-colors duration-150",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  "disabled:opacity-60 disabled:cursor-not-allowed"
].join(" ");

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: [
    // Use CSS var for brand tint if provided; fall back to a nice blue scale
    "bg-[var(--app-tint,#3b82f6)] text-white",
    "hover:bg-[var(--app-tint-hover,#2563eb)]",
    "active:bg-[var(--app-tint-active,#1d4ed8)]",
    "focus-visible:ring-[var(--app-tint,#3b82f6)]"
  ].join(" "),
  secondary: [
    "bg-gray-200 text-gray-900",
    "hover:bg-gray-300",
    "active:bg-gray-400",
    "focus-visible:ring-gray-400"
  ].join(" "),
  ghost: [
    "bg-transparent text-gray-900",
    "hover:bg-gray-100",
    "active:bg-gray-200",
    "focus-visible:ring-gray-300",
    "border border-transparent"
  ].join(" ")
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={[baseClasses, variantClasses[variant], className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
