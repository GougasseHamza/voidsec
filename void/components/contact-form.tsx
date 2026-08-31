"use client";

import { useRef, useState } from "react";

import { ArrowUpRight } from "@/components/icons";
import { services, site } from "@/lib/site-data";

type Status = { tone: "ok" | "error"; message: string } | null;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [status, setStatus] = useState<Status>(null);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "Required";
    if (!data.email?.trim()) next.email = "Required";
    else if (!EMAIL_PATTERN.test(data.email)) next.email = "Not a valid address";
    if (!data.message?.trim() || data.message.trim().length < 20)
      next.message = "A sentence or two, at least";

    setErrors(next);
    const invalid = ["name", "email", "message"].filter((key) => next[key]);
    if (invalid.length > 0) {
      setStatus({
        tone: "error",
        message: `Not sent. Check ${invalid.join(", ")}.`,
      });
      form.querySelector<HTMLElement>(`#${invalid[0]}`)?.focus();
      return;
    }

    setPending(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus({
          tone: "error",
          message: body.error ?? `Could not send. Write to ${site.email} instead.`,
        });
        return;
      }

      form.reset();
      setStatus({
        tone: "ok",
        message: "Received. We reply within one business day.",
      });
    } catch {
      setStatus({
        tone: "error",
        message: `Network error. Write to ${site.email} instead.`,
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate ref={formRef}>
      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <span className="field-error" id="name-error">
              {errors.name}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="organisation">Organisation</label>
          <input id="organisation" name="organisation" autoComplete="organization" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="email">Work email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <span className="field-error" id="email-error">
            {errors.email}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="subject">What do you need</label>
        <select id="subject" name="subject" defaultValue={services[0].name}>
          {services.map((service) => (
            <option key={service.slug} value={service.name}>
              {service.name}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="message">What you run, and what worries you</label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Systems in scope, rough size of the estate, any deadline you are working to."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <span className="field-error" id="message-error">
            {errors.message}
          </span>
        )}
      </div>

      {/* Honeypot — bots fill it, humans never see it. */}
      <div aria-hidden="true" className="honeypot">
        <label htmlFor="company-website">Company website</label>
        <input id="company-website" name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Mounted always so the live region exists before its text changes. */}
      <p
        className="form-status"
        data-tone={status?.tone}
        role="status"
        hidden={!status}
      >
        {status?.message}
      </p>

      <button className="form-submit" type="submit" disabled={pending}>
        {pending ? "Sending" : "Send"}
        <ArrowUpRight />
      </button>

      <p className="form-note">
        Enquiry details stay with us. If you would rather send something
        sensitive encrypted, say so here first and we will exchange keys before
        you describe anything.
      </p>
    </form>
  );
}
