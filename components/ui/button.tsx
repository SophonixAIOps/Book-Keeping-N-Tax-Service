import type { ComponentProps, ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/* The 1px lift and press are deliberately near the threshold of perception:
   enough that the control answers the pointer, small enough that a page of
   them never reads as floating UI. `disabled:` variants are doubled up on
   `hover`/`active` so they win on specificity rather than source order. */
const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-button font-medium " +
  /* `translate`, not `transform`: Tailwind v4 emits translate utilities as the
     standalone `translate` property, so transitioning `transform` would leave
     the lift snapping instead of easing. */
  "border transition-[background-color,border-color,color,translate] " +
  "[transition-duration:var(--duration-fast)] [transition-timing-function:var(--ease-out-soft)] " +
  "hover:-translate-y-px active:translate-y-px " +
  "disabled:cursor-not-allowed disabled:bg-disabled-surface disabled:text-disabled-ink disabled:border-transparent " +
  "disabled:hover:translate-y-0 disabled:active:translate-y-0";

const variants = {
  primary:
    "border-accent bg-accent text-accent-foreground hover:bg-accent-hover hover:border-accent-hover active:bg-accent-active active:border-accent-active",
  secondary:
    "border-border-strong bg-transparent text-ink hover:border-ink hover:bg-surface active:bg-surface-muted",
  ghost:
    "border-transparent bg-transparent text-ink hover:bg-surface-muted active:bg-surface-sunken",
  inverse:
    "border-ink-inverse/25 bg-transparent text-ink-inverse hover:bg-ink-inverse/10 active:bg-ink-inverse/15",
  /* Solid counterpart to `inverse` — the primary action on a dark surface,
     where `primary` would sink into the background. */
  inverseSolid:
    "border-ink-inverse bg-ink-inverse text-accent hover:bg-white hover:border-white active:bg-surface-muted active:border-surface-muted",
} as const;

/* Heights meet the 44px minimum touch target from md upward. */
const sizes = {
  sm: "h-9 px-4",
  md: "h-11 px-5",
  lg: "h-12 px-7",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

type StyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

/** Exposed so `next/link` anchors can carry identical button styling. */
export function buttonStyles({
  variant = "primary",
  size = "md",
  fullWidth = false,
}: StyleOptions = {}) {
  return cn(base, variants[variant], sizes[size], fullWidth && "w-full");
}

type ButtonProps = StyleOptions & ComponentPropsWithoutRef<"button">;

export function Button({
  variant,
  size,
  fullWidth,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonStyles({ variant, size, fullWidth }), className)}
      {...props}
    />
  );
}

type ButtonLinkProps = StyleOptions & ComponentProps<typeof Link>;

/** A link that carries button styling — for CTAs that navigate rather than act. */
export function ButtonLink({
  variant,
  size,
  fullWidth,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonStyles({ variant, size, fullWidth }), className)}
      {...props}
    />
  );
}
