"use client";

import { useEffect, useRef } from "react";
import { SparkLine } from "@/components/financial/spark-line";

/** The hero chart is the only sparkline with no `.reveal` ancestor to hold it,
    so its sweep runs in the browser's first style pass and is over before the
    page is on screen. Deferring the start to mount is the whole point of this
    wrapper: it moves the sweep to a moment a visitor is actually looking at.

    The flag lives on the DOM node rather than in React state, as in `Reveal` —
    it is a one-way visual gate, so re-rendering the chart for it is wasted. */
export function HeroSparkLine({
  data,
  height,
}: {
  data: number[];
  height?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.setAttribute("data-spark-ready", "true");
  }, []);

  return (
    <div ref={ref} className="spark-gate" data-spark-ready="false">
      <SparkLine data={data} height={height} />
    </div>
  );
}
