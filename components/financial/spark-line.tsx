import { cn } from "@/lib/cn";

type SparkLineProps = {
  /** Caller-supplied series — deterministic so SSR and client agree. */
  data: number[];
  width?: number;
  height?: number;
  /** Subtle wash beneath the line. */
  fill?: boolean;
  className?: string;
};

/** Restrained editorial trend line. Deliberately not a dashboard chart:
    no axes, no gridlines, no tooltips. */
export function SparkLine({
  data,
  width = 240,
  height = 64,
  fill = true,
  className,
}: SparkLineProps) {
  if (data.length < 2) return null;

  const pad = 3;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = pad + (index / (data.length - 1)) * (width - pad * 2);
    const y = height - pad - ((value - min) / range) * (height - pad * 2);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("h-auto w-full overflow-visible", className)}
      aria-hidden="true"
      focusable="false"
    >
      {fill && (
        <polygon
          points={`${pad},${height - pad} ${points.join(" ")} ${width - pad},${height - pad}`}
          className="fill-accent/8"
        />
      )}
      <polyline
        points={points.join(" ")}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="stroke-accent"
      />
    </svg>
  );
}
