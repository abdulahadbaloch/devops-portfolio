import { NextResponse } from 'next/server';
import { profileData } from '@/data/profile';
import { contactSchema, type ContactInput, type ContactResponse } from '@/lib/contact';

// Simple per-instance rate limit: 5 messages per IP per 10 minutes.
// Good enough to stop casual abuse; use a shared store (e.g. Upstash) if traffic grows.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (recentByIp.size > 1000) {
    recentByIp.forEach((times, key) => {
      if (times.every((t) => now - t >= WINDOW_MS)) recentByIp.delete(key);
    });
  }
  const recent = (recentByIp.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    recentByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  recentByIp.set(ip, recent);
  return false;
}

function reply(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return reply({ ok: false, error: 'invalid' }, 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
    for (const key of ['name', 'email', 'message'] as const) {
      if (flat[key]?.[0]) fieldErrors[key] = flat[key]![0];
    }
    return reply({ ok: false, error: 'invalid', fieldErrors }, 400);
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot filled in: pretend success so bots don't retry.
  if (website) return reply({ ok: true }, 200);

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) return reply({ ok: false, error: 'rate_limited' }, 429);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || profileData.email;
  if (!apiKey) return reply({ ok: false, error: 'not_configured' }, 503);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`
      })
    });
    if (!res.ok) {
      console.error('Resend rejected contact email', res.status, await res.text().catch(() => ''));
      return reply({ ok: false, error: 'send_failed' }, 502);
    }
    return reply({ ok: true }, 200);
  } catch (err) {
    console.error('Contact email request failed', err);
    return reply({ ok: false, error: 'send_failed' }, 502);
  }
}
