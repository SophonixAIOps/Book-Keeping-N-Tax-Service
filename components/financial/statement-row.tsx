import { cn } from "@/lib/cn";

type StatementRowProps = {
  label: string;
  /** Pre-formatted figure, e.g. "$31,820". */
  value: string;
  emphasis?: boolean;
  className?: string;
};

/** A label/figure pair joined by leader dots, as on a printed statement. */
export function StatementRow({
  label,
  value,
  emphasis = false,
  className,
}: StatementRowProps) {
  return (
    <div className={cn("flex items-baseline gap-3", className)}>
      <span
        className={cn(
          "text-body-sm shrink-0",
          emphasis ? "text-ink font-medium" : "text-ink-secondary",
        )}
      >
        {label}
      </span>
      <span className="leader-dots h-px grow translate-y-[-0.2em]" aria-hidden="true" />
      <span
        className={cn(
          "numeric shrink-0 font-serif",
          emphasis ? "text-h3 text-ink" : "text-body text-ink",
        )}
      >
        {value}
      </span>
    </div>
  );
}
