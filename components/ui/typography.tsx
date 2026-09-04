import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

/* Display/H1/H2 use the editorial serif; H3/H4 drop to the sans for
   legibility at small sizes, which keeps the serif feeling deliberate. */
const headingVariants = {
  display: "font-serif text-display",
  h1: "font-serif text-h1",
  h2: "font-serif text-h2",
  h3: "font-sans text-h3",
  h4: "font-sans text-h4",
} as const;

type HeadingProps = {
  /** Semantic level — set independently of the visual size. */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
  variant?: keyof typeof headingVariants;
} & ComponentPropsWithoutRef<"h2">;

export function Heading({
  as = "h2",
  variant = "h2",
  className,
  ...props
}: HeadingProps) {
  const Component = as as ElementType;
  return (
    <Component
      className={cn(headingVariants[variant], className)}
      {...props}
    />
  );
}

const textSizes = {
  lg: "text-body-lg",
  base: "text-body",
  sm: "text-body-sm",
  caption: "text-caption",
} as const;

const textTones = {
  default: "text-ink",
  secondary: "text-ink-secondary",
  tertiary: "text-ink-tertiary",
  inverse: "text-ink-inverse",
  accent: "text-accent",
} as const;

type TextProps = {
  as?: "p" | "span" | "div" | "li" | "dd" | "dt";
  size?: keyof typeof textSizes;
  tone?: keyof typeof textTones;
  /** Constrains to a comfortable reading measure. */
  measure?: boolean;
} & ComponentPropsWithoutRef<"p">;

export function Text({
  as = "p",
  size = "base",
  tone = "secondary",
  measure = false,
  className,
  ...props
}: TextProps) {
  const Component = as as ElementType;
  return (
    <Component
      className={cn(
        textSizes[size],
        textTones[tone],
        measure && "max-w-measure",
        className,
      )}
      {...props}
    />
  );
}

type EyebrowProps = {
  as?: "p" | "span" | "div";
} & ComponentPropsWithoutRef<"p">;

export function Eyebrow({ as = "p", className, ...props }: EyebrowProps) {
  const Component = as as ElementType;
  return (
    <Component
      className={cn(
        "text-eyebrow uppercase text-ink-tertiary font-sans",
        className,
      )}
      {...props}
    />
  );
}
