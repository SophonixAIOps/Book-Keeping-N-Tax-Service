import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import type { SectionAction } from "@/components/sections/page-hero";

type CTATone = "canvas" | "surface" | "muted" | "accentSoft" | "ink" | "accent";

type CTASectionProps = {
  eyebrow?: string;
  heading: ReactNode;
  description?: ReactNode;
  action: SectionAction;
  /** Rendered as a quiet text link beside the primary action. */
  secondaryAction?: SectionAction;
  tone?: CTATone;
  spacing?: ComponentProps<typeof Section>["spacing"];
  /** Centres the block — suits a page's closing moment more than a mid-page band. */
  align?: "start" | "center";
  className?: string;
};

export function CTASection({
  eyebrow,
  heading,
  description,
  action,
  secondaryAction,
  tone = "accentSoft",
  spacing = "md",
  align = "start",
  className,
}: CTASectionProps) {
  const onDark = tone === "ink" || tone === "accent";
  const centered = align === "center";

  return (
    <Section
      spacing={spacing}
      tone={tone}
      bordered={!onDark}
      className={className}
    >
      <Container>
        <div
          className={cn(
            "flex flex-col gap-8",
            centered
              ? "items-center text-center"
              : "md:flex-row md:items-end md:justify-between md:gap-12",
          )}
        >
          <div className={cn(centered && "flex flex-col items-center")}>
            {eyebrow && (
              <Eyebrow className={cn(onDark && "text-ink-inverse/55")}>
                {eyebrow}
              </Eyebrow>
            )}
            <Heading
              as="h2"
              className={cn(
                onDark ? "text-ink-inverse" : "text-ink",
                eyebrow && "mt-4",
              )}
            >
              {heading}
            </Heading>
            {description && (
              <Text
                size="lg"
                measure
                tone={onDark ? "inverse" : "secondary"}
                className={cn("mt-4", onDark && "opacity-75")}
              >
                {description}
              </Text>
            )}
          </div>

          <div
            className={cn(
              "flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6",
              centered && "sm:justify-center",
            )}
          >
            <ButtonLink
              href={action.href}
              size="lg"
              variant={onDark ? "inverseSolid" : "primary"}
            >
              {action.label}
            </ButtonLink>
            {secondaryAction && (
              <ButtonLink
                href={secondaryAction.href}
                size="lg"
                variant={onDark ? "inverse" : "secondary"}
              >
                {secondaryAction.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
