import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { z } from 'zod';

// Dynamic route — the only non-static page in this otherwise static site.
// The Vercel adapter turns this into a serverless function at build time.
export const prerender = false;

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  pillar: z.enum(['business', 'booking']),
  // Honeypot field. Real users never see or fill it (hidden via CSS, not
  // display:none/hidden input, so it still attracts bots). If it has a
  // value, silently pretend success and skip sending the email.
  company_url: z.string().optional(),
});

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

// Best-effort in-memory rate limiter. Resets on cold start / redeploy and is
// not shared across serverless instances — good enough as a first line of
// defense against basic abuse, not a substitute for a real service.
const rateLimitStore = new Map<string, RateLimitEntry>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') ?? 'unknown';
}

function jsonResponse(body: { ok: boolean; error?: string }, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const FROM_ADDRESS = 'Globaal Elevate <web@globaalelevate.com>';

export const POST: APIRoute = async ({ request }) => {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return jsonResponse({ ok: false, error: 'rate_limited' }, 429);
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: 'invalid_json' }, 400);
  }

  const parsed = contactSchema.safeParse(rawBody);
  if (!parsed.success) {
    return jsonResponse({ ok: false, error: 'validation_failed' }, 400);
  }

  const { name, email, message, pillar, company_url } = parsed.data;

  // Honeypot tripped: tell the bot everything is fine, but never send mail.
  if (company_url) {
    return jsonResponse({ ok: true }, 200);
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    return jsonResponse({ ok: false, error: 'not_configured' }, 503);
  }

  const toAddress =
    pillar === 'business'
      ? import.meta.env.RESEND_TO_BUSINESS
      : import.meta.env.RESEND_TO_BOOKING;

  if (!toAddress) {
    return jsonResponse({ ok: false, error: 'not_configured' }, 503);
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: toAddress,
      replyTo: email,
      subject: `[${pillar === 'business' ? 'Business inquiry' : 'Event booking'}] ${name}`,
      text: `Jméno / Name: ${name}\nE-mail: ${email}\nPillar: ${pillar}\n\n${message}`,
      html: `<p><strong>Jméno / Name:</strong> ${escapeHtml(name)}</p>
<p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
<p><strong>Pillar:</strong> ${escapeHtml(pillar)}</p>
<p><strong>Zpráva / Message:</strong></p>
<p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>`,
    });

    if (error) {
      return jsonResponse({ ok: false, error: 'send_failed' }, 500);
    }
  } catch {
    return jsonResponse({ ok: false, error: 'send_failed' }, 500);
  }

  return jsonResponse({ ok: true }, 200);
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
