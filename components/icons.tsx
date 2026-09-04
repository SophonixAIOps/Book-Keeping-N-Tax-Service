
import type { SVGProps } from "react";

export type IconProps = { size?: number } & SVGProps<SVGSVGElement>;

/* Shared geometry: 24px grid, 1.5 stroke, currentColor, no fill.
   Icons are decorative by default — give the parent element the label. */
function Icon({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function LedgerIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="12" y1="8" x2="17" y2="8" />
      <line x1="12" y1="12" x2="17" y2="12" />
      <line x1="12" y1="16" x2="17" y2="16" />
    </Icon>
  );
}

export function CalculatorIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <rect x="8" y="6" width="8" height="3" rx="0.5" />
      <circle cx="9" cy="13" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="12" cy="13" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="9" cy="17" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="12" cy="17" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="15" cy="17" r="0.85" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5L14 3Z" />
      <path d="M14 3v4.5h4.5" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="16.5" x2="13" y2="16.5" />
    </Icon>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <line x1="4" y1="20" x2="20" y2="20" />
      <line x1="8" y1="20" x2="8" y2="13" />
      <line x1="12" y1="20" x2="12" y2="8.5" />
      <line x1="16" y1="20" x2="16" y2="15" />
    </Icon>
  );
}

export function PayrollIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.4a3.2 3.2 0 0 1 0 6" />
      <path d="M17.4 14.4a5.5 5.5 0 0 1 3.1 4.9" />
    </Icon>
  );
}

export function TaxIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17l-3-1.8-3 1.8-3-1.8L6 21Z" />
      <line x1="14" y1="8.5" x2="10" y2="13.5" />
      <circle cx="10" cy="8.8" r="0.9" />
      <circle cx="14" cy="13.2" r="0.9" />
    </Icon>
  );
}

export function BusinessIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="8" width="7" height="13" rx="0.75" />
      <rect x="11" y="3" width="9" height="18" rx="0.75" />
      <line x1="14" y1="7.5" x2="17" y2="7.5" />
      <line x1="14" y1="11.5" x2="17" y2="11.5" />
      <line x1="14" y1="15.5" x2="17" y2="15.5" />
      <line x1="6.75" y1="12.5" x2="8.25" y2="12.5" />
      <line x1="6.75" y1="16.5" x2="8.25" y2="16.5" />
    </Icon>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="5" width="17" height="16" rx="1.5" />
      <line x1="3.5" y1="10" x2="20.5" y2="10" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="16" y1="3" x2="16" y2="7" />
    </Icon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <polyline points="4.5 12.5 9.5 17.5 19.5 7" />
    </Icon>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <polyline points="8.2 12.3 11 15 15.8 9.6" />
    </Icon>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 21s7-3.2 7-9V6.2l-7-2.7-7 2.7V12c0 5.8 7 9 7 9Z" />
    </Icon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </Icon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <line x1="4" y1="12" x2="19" y2="12" />
      <polyline points="13.5 6.5 20 12 13.5 17.5" />
    </Icon>
  );
}

export function TrendUpIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <polyline points="4 16 9.5 10.5 13 14 20 7" />
      <polyline points="15 7 20 7 20 12" />
    </Icon>
  );
}

export function TrendDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <polyline points="4 8 9.5 13.5 13 10 20 17" />
      <polyline points="15 17 20 17 20 12" />
    </Icon>
  );
}
