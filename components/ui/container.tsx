import type { ElementType, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const widths = {
  wide: "max-w-wide",
  page: "max-w-page",
  narrow: "max-w-narrow",
  measure: "max-w-measure",
} as const;

type ContainerElement = "div" | "section" | "header" | "footer" | "main" | "nav";

type ContainerProps<T extends ContainerElement> = {
  as?: T;
  width?: keyof typeof widths;
  bleed?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "width">;

export function Container<T extends ContainerElement = "div">({
  as,
  width = "page",
  bleed = false,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = (as ?? "div") as ElementType;

  return (
    <Component
      className={cn(
        "mx-auto w-full",
        widths[width],
        !bleed && "gutter",
        className,
      )}
      {...props}
    />
  );
}
