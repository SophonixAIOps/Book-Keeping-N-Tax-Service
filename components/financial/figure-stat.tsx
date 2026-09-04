import { cn } from "@/lib/cn";
import { TrendUpIcon, TrendDownIcon } from "@/components/icons";

type FigureStatProps = {
  /** Pre-formatted figure, e.g. "$84,240". */
  value: string;
  label: string;
  /** Change indicator, e.g. "12.4%". Always paired with an icon and
      a text direction, so meaning never depends on colour alone. */
  delta?: string;
  direction?: "up" | "down";
  className?: string;
};

export function FigureStat({
  value,
  label,
  delta,
  direction = "up",
  className,
}: FigureStatProps) {
  const TrendIcon = direction === "up" ? TrendUpIcon : TrendDownIcon;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <span className="font-serif text-figure numeric text-ink">{value}</span>
      <span className="text-caption text-ink-tertiary">{label}</span>
      {delta && (
        <span
          className={cn(
            "mt-0.5 inline-flex items-center gap-1.5 text-caption numeric",
            direction === "up" ? "text-positive" : "text-negative",
          )}
        >
          <TrendIcon size={14} />
          {delta}
          <span className="sr-only">
            {direction === "up" ? "increase" : "decrease"}
          </span>
        </span>
      )}
    </div>
  );
}
