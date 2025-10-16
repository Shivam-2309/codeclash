// components/Button.tsx
"use client";

import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "[var(--app-tint)]",
  secondary:
    "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400 disabled:bg-gray-300",
  ghost:
    "bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-300 disabled:opacity-60",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={
          [
            "inline-flex items-center justify-center whitespace-nowrap",
            "rounded-md px-3 py-2 text-sm font-medium",
            "border border-transparent",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            variantClasses[variant],
            className,
          ]
            .filter(Boolean)
            .join(" ")
        }
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
