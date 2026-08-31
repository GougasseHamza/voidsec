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

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  // No default: falling back to the placeholder address would send real
  // enquiries into a mailbox that does not exist and report them as delivered.
  const to = process.env.CONTACT_TO;

  // No mail provider wired up yet — say so rather than showing a success
  // state for a message that nobody is going to receive.
  if (!apiKey || !from || !to) {
    console.warn("[contact] mail delivery unconfigured; enquiry not delivered", {
      subject,
      hasKey: Boolean(apiKey),
      hasFrom: Boolean(from),
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
    `Organisation: ${organisation || "—"}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[voidsec] ${subject} — ${name}`,
        text,
      }),
    });

    if (!response.ok) {
      console.error("[contact] provider rejected send", await response.text());
      return NextResponse.json(
        { error: `Could not send. Write to ${site.email} instead.` },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[contact] provider unreachable", error);
    return NextResponse.json(
      { error: `Could not send. Write to ${site.email} instead.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
