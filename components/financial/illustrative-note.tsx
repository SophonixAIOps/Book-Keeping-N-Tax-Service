import { cn } from "@/lib/cn";

type IllustrativeNoteProps = {
  children?: React.ReactNode;
  className?: string;
};

/** Marks sample figures as illustrative. Every financial figure shown on this
    site is invented for demonstration, so any block containing one must carry
    this note — visible to sighted users and to assistive technology alike. */
export function IllustrativeNote({
  children = "Figures shown are illustrative examples, not client results.",
  className,
}: IllustrativeNoteProps) {
  return (
    <p className={cn("text-caption text-ink-tertiary", className)}>{children}</p>
  );
}
