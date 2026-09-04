import type { ComponentProps, ReactNode } from "react";
import type Link from "next/link";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

export type SectionAction = {
  label: string;
  href: ComponentProps<typeof Link>["href"];
};

/** Heroes sit on the light end of the palette; the dark surface is reserved
    for the footer so the page ends, rather than starts, on ink. */
type LightTone = "canvas" | "surface" | "muted" | "accentSoft";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  primaryAction?: SectionAction;
  secondaryAction?: SectionAction;
  /** Rendered in a second column from `lg` up. Ignored when `align` is centred. */
  visual?: ReactNode;
  align?: "start" | "center";
  /** `display` suits the home hero; `h1` keeps interior pages subordinate to it. */
  size?: "display" | "h1";
  tone?: LightTone;
  spacing?: ComponentProps<typeof Section>["spacing"];
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  visual,
  align = "start",
  size = "h1",
  tone = "canvas",
  spacing = "lg",
  className,
}: PageHeroProps) {
  const centered = align === "center";
  const split = Boolean(visual) && !centered;

  const content = (
    <div className={cn(centered && "mx-auto max-w-narrow text-center")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}

      <Heading
        as="h1"
        variant={size}
        className={cn("text-ink", eyebrow && "mt-4")}
      >
        {title}
      </Heading>

      {description && (
        <Text
          size="lg"
          measure
          className={cn("mt-5", centered && "mx-auto")}
        >
          {description}
        </Text>
      )}

      {(primaryAction || secondaryAction) && (
        <div
          className={cn(
            "mt-8 flex flex-col gap-3 sm:flex-row sm:items-center",
            centered && "sm:justify-center",
          )}
        >
          {primaryAction && (
            <ButtonLink href={primaryAction.href} size="lg">
              {primaryAction.label}
            </ButtonLink>
          )}
          {secondaryAction && (
            <ButtonLink
              href={secondaryAction.href}
              variant="secondary"
              size="lg"
            >
              {secondaryAction.label}
            </ButtonLink>
          )}
        </div>
      )}
    </div>
  );

  return (
    <Section spacing={spacing} tone={tone} className={className}>
      <Container>
        {split ? (
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-7">{content}</div>
            <div className="lg:col-span-5">{visual}</div>
          </div>
        ) : (
          content
        )}
      </Container>
    </Section>
  );
}
