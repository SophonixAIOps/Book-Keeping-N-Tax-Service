import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const weights = {
  hairline: "border-border",
  strong: "border-border-strong",
  ink: "border-border-ink",
} as const;

type DividerProps = {
  weight?: keyof typeof weights;
} & ComponentPropsWithoutRef<"hr">;

export function Divider({
  weight = "hairline",
  className,
  ...props
}: DividerProps) {
  return <hr className={cn("border-t", weights[weight], className)} {...props} />;
}
