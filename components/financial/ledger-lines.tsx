import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type LedgerLinesProps = {
  /** Row height in pixels — controls the ruling density. */
  rowHeight?: number;
  orientation?: "horizontal" | "vertical";
  /** Fades the ruling out toward the bottom so it reads as a backdrop. */
  fade?: boolean;
} & ComponentPropsWithoutRef<"div">;

/** Decorative accounting-paper ruling. Purely visual — never carries meaning. */
export function LedgerLines({
  rowHeight = 32,
  orientation = "horizontal",
  fade = true,
  className,
  style,
  ...props
}: LedgerLinesProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none",
        orientation === "horizontal" ? "ledger-rules" : "ledger-column",
        fade &&
          "[mask-image:linear-gradient(to_bottom,black,black_55%,transparent)]",
        className,
      )}
      style={{ ["--ledger-row" as string]: `${rowHeight}px`, ...style }}
      {...props}
    />
  );
}
