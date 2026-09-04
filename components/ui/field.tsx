import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const control =
  "w-full rounded-md border border-border bg-surface px-3.5 text-body text-ink " +
  "placeholder:text-ink-tertiary " +
  "transition-[border-color,background-color] [transition-duration:var(--duration-fast)] [transition-timing-function:var(--ease-out-soft)] " +
  "hover:border-border-strong " +
  "disabled:cursor-not-allowed disabled:bg-disabled-surface disabled:text-disabled-ink " +
  "aria-[invalid=true]:border-negative";

export function Label({
  className,
  ...props
}: ComponentPropsWithoutRef<"label">) {
  return (
    <label
      className={cn("text-body-sm font-medium text-ink", className)}
      {...props}
    />
  );
}

export function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return <input className={cn(control, "h-11", className)} {...props} />;
}

export function Textarea({
  className,
  rows = 5,
  ...props
}: ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea rows={rows} className={cn(control, "py-2.5", className)} {...props} />
  );
}

export function Select({
  className,
  ...props
}: ComponentPropsWithoutRef<"select">) {
  return <select className={cn(control, "h-11 pr-9", className)} {...props} />;
}

type FieldProps = {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

/** Wraps a control with its label, hint and error text. Hint and error are
    given ids so the control can reference them via aria-describedby. */
export function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {hint && (
        <p id={`${htmlFor}-hint`} className="text-caption text-ink-tertiary">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-caption text-negative">
          {error}
        </p>
      )}
    </div>
  );
}
