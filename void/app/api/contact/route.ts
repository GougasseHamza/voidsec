import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

import { site } from "@/lib/site-data";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  organisation?: string;
  email?: string;
  subject?: string;
  message?: string;
  companyWebsite?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD = 5000;
const MAX_BODY_BYTES = 32_000;

// Per-IP token bucket. In-memory is enough for a single instance; if this ever
// runs on more than one, move it to a shared store.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD) : "";
}

/** Strip CR/LF so user input cannot inject extra mail headers. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Try again shortly." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Message too large." }, { status: 413 });
  }

  let payload: Payload;

  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: accept silently so bots do not learn they were caught.
  if (clean(payload.companyWebsite)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name);
  const organisation = clean(payload.organisation);
  const email = clean(payload.email);
  const subject = clean(payload.subject) || "General enquiry";
  const message = clean(payload.message);

  if (!name || !EMAIL_PATTERN.test(email) || message.length < 20) {
    return NextResponse.json(
      { error: "Please give your name, a valid email and a short message." },
      { status: 422 },
    );
  }

  // Plain SMTP, so this works with Zoho (already the authorised sender for
  // this domain), Resend, Postmark or anything else without a code change.
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO;
  // Most providers reject a From that is not the authenticated mailbox.
  const from = process.env.CONTACT_FROM ?? user;

  // Nothing configured yet. Say so rather than showing a success state for a
  // message nobody is going to receive.
  if (!host || !user || !pass || !to) {
    console.warn("[contact] SMTP unconfigured; enquiry not delivered", {
      subject,
      hasHost: Boolean(host),
      hasUser: Boolean(user),
      hasPass: Boolean(pass),
      hasTo: Boolean(to),
    });
    return NextResponse.json(
      {
        error: `The form is not connected to a mailbox yet. Write to ${site.email} directly.`,
      },
      { status: 503 },
    );
  }

  const text = [
    `Name: ${name}`,
    `Organisation: ${organisation || "(not given)"}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    message,
  ].join("\n");

  try {
    const transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transport.sendMail({
      from: `"${headerSafe(name)} via voidsec.sh" <${from}>`,
      to,
      replyTo: headerSafe(email),
      subject: headerSafe(`[voidsec.sh] ${subject} - ${name}`),
      text,
    });
  } catch (error) {
    console.error("[contact] SMTP send failed", error);
    return NextResponse.json(
      { error: `Could not send. Write to ${site.email} instead.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
