"use client";

import { useEffect, useRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  /** Stagger sibling reveals, in milliseconds. */
  delay?: number;
} & ComponentPropsWithoutRef<"div">;

/** Fades content up once it scrolls into view. The reveal state lives on the
    DOM node rather than in React state — it is a one-way visual effect, so
    re-rendering the subtree for it would be wasted work. */
export function Reveal({ delay = 0, className, style, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => node.setAttribute("data-revealed", "true");

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-revealed="false"
      className={cn("reveal", className)}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...props}
    />
  );
}
