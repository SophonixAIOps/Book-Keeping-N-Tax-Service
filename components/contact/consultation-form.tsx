"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { Text } from "@/components/ui/typography";

const businessTypes = [
  "Small Business",
  "Freelancer",
  "Contractor",
  "Startup",
  "Landlord",
  "Individual",
  "Other",
];

const serviceOptions = [
  "Monthly Bookkeeping",
  "Tax Preparation",
  "Payroll Support",
  "Business Accounting",
  "Financial Reporting",
  "Catch-Up Bookkeeping",
  "Not Sure Yet",
];

/* Input categories only. Naming a package here says nothing about whether
   ClearLedger is a partner or certified provider for it, and no such claim is
   made anywhere on the site. */
const softwareOptions = [
  "QuickBooks",
  "Xero",
  "FreshBooks",
  "Wave",
  "Other",
  "Not Currently Using Accounting Software",
  "Not Sure",
];

type ErrorKey = "name" | "email" | "message";
type Errors = Partial<Record<ErrorKey, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ConsultationForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const focusTarget = useRef<ErrorKey | null>(null);

  useEffect(() => {
    if (!focusTarget.current) return;
    document.getElementById(`inquiry-${focusTarget.current}`)?.focus();
    focusTarget.current = null;
  }, [errors]);

  const clearError = (key: ErrorKey) =>
    setErrors((current) =>
      current[key] ? { ...current, [key]: undefined } : current,
    );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const next: Errors = {};
    if (!value("name")) next.name = "Enter your name so we know who to reply to.";
    if (!value("email")) next.email = "Enter an email address.";
    else if (!emailPattern.test(value("email")))
      next.email = "Enter an email address in the format name@example.com.";
    if (!value("message"))
      next.message = "Tell us a little about what you need help with.";

    const firstInvalid = (["name", "email", "message"] as const).find(
      (key) => next[key],
    );
    if (firstInvalid) {
      focusTarget.current = firstInvalid;
      setErrors(next);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const describedBy = (key: ErrorKey) =>
    errors[key] ? `inquiry-${key}-error` : undefined;

  if (submitted) {
    return (
      <div role="status" className="mt-6">
        <Text className="text-ink">This form is a demonstration.</Text>
        <Text size="sm" className="mt-3">
          Your details were checked for completeness but not submitted.
          ClearLedger is a demonstration site with no inquiry backend connected,
          so nothing was sent, stored or shared.
        </Text>
        <Button
          variant="secondary"
          className="mt-7"
          onClick={() => setSubmitted(false)}
        >
          Return to the form
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      {/* Lives with the form, not with the card heading, so the confirmation
          state does not keep describing fields that are no longer shown. */}
      <Text size="sm" className="mb-2 sm:col-span-2">
        Only your name, email and message are needed. Everything else helps, but
        you can leave it blank.
      </Text>

      <Field label="Name" htmlFor="inquiry-name" error={errors.name}>
        <Input
          id="inquiry-name"
          name="name"
          autoComplete="name"
          required
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy("name")}
          onChange={() => clearError("name")}
        />
      </Field>

      <Field label="Business Name" htmlFor="inquiry-business" optional>
        <Input
          id="inquiry-business"
          name="business"
          autoComplete="organization"
        />
      </Field>

      <Field label="Email" htmlFor="inquiry-email" error={errors.email}>
        <Input
          id="inquiry-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={describedBy("email")}
          onChange={() => clearError("email")}
        />
      </Field>

      <Field label="Phone" htmlFor="inquiry-phone" optional>
        <Input id="inquiry-phone" name="phone" type="tel" autoComplete="tel" />
      </Field>

      <Field label="Business Type" htmlFor="inquiry-type" optional>
        <Select id="inquiry-type" name="businessType" defaultValue="">
          <option value="">Select one</option>
          {businessTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Service Needed" htmlFor="inquiry-service" optional>
        <Select id="inquiry-service" name="service" defaultValue="">
          <option value="">Select one</option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label="Current Accounting Software"
        htmlFor="inquiry-software"
        optional
        className="sm:col-span-2"
      >
        <Select id="inquiry-software" name="software" defaultValue="">
          <option value="">Select one</option>
          {softwareOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label="Message"
        htmlFor="inquiry-message"
        hint="Where things stand today, and what you are looking for help with."
        error={errors.message}
        className="sm:col-span-2"
      >
        <Textarea
          id="inquiry-message"
          name="message"
          rows={6}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            [
              "inquiry-message-hint",
              errors.message ? "inquiry-message-error" : null,
            ]
              .filter(Boolean)
              .join(" ") || undefined
          }
          onChange={() => clearError("message")}
        />
      </Field>

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" fullWidth className="sm:w-auto">
          Request a Consultation
        </Button>
        {/* Both halves matter: the discretion line is the tone the rest of the
            site sets, and the demonstration line keeps the page from implying
            a delivery that no backend performs. */}
        <Text size="caption" tone="tertiary" className="mt-5">
          Your information is treated with care and discretion. ClearLedger is a
          demonstration site — this form checks your entries but does not send
          them.
        </Text>
      </div>
    </form>
  );
}
