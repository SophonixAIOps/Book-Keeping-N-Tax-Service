import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const spacings = {
  sm: "section-sm",
  md: "section-md",
  lg: "section-lg",
} as const;

const tones = {
  canvas: "bg-canvas text-ink",
  surface: "bg-surface text-ink",
  muted: "bg-surface-muted text-ink",
  accentSoft: "bg-accent-soft text-ink",
  ink: "on-dark bg-ink-surface text-ink-inverse",
  accent: "on-dark bg-accent text-accent-foreground",
} as const;

type SectionProps = {
  spacing?: keyof typeof spacings;
  tone?: keyof typeof tones;
  bordered?: boolean;
} & ComponentPropsWithoutRef<"section">;

export function Section({
  spacing = "md",
  tone = "canvas",
  bordered = false,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        spacings[spacing],
        tones[tone],
        bordered && "border-t border-border",
        className,
      )}
      {...props}
    />
  );
}
