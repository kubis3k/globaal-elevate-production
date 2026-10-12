export const prerender = false

import type { APIRoute } from 'astro'
import { createHmac } from 'crypto'
import { Resend } from 'resend'

const resend = new Resend(import.meta.env.RESEND_API_KEY)

// In-memory rate limiter.
// Best-effort only: each Vercel serverless function instance has its own memory.
// Upgrade to Upstash Redis if strict cross-instance limiting is needed.
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const RATE_LIMIT = 5

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

function makeToken(email: string, source: string): string {
  const secret = import.meta.env.NEWSLETTER_TOKEN_SECRET
  const payload = Buffer.from(JSON.stringify({ email, source, iat: Date.now() })).toString('base64url')
  const sig = createHmac('sha256', secret).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

function buildConfirmEmail(confirmUrl: string): { html: string; text: string } {
  const html = `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Potvrďte přihlášení k newsletteru</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:36px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Dark header -->
        <tr>
          <td style="background:#0B0B0B;padding:28px 36px 24px;">
            <span style="font-size:17px;font-weight:700;color:#ffffff;letter-spacing:0.04em;">GLOBAAL ELEVATE</span>
            <span style="font-size:10px;color:#B5976A;letter-spacing:0.2em;text-transform:uppercase;margin-left:10px;">PRODUCTION</span>
          </td>
        </tr>

        <!-- Gold accent line -->
        <tr><td style="background:#B5976A;height:2px;line-height:2px;font-size:2px;">&nbsp;</td></tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 36px 32px;">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#B5976A;font-weight:600;">Newsletter</p>
            <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:#0B0B0B;line-height:1.25;letter-spacing:-0.01em;">Potvrďte přihlášení</h1>
            <p style="margin:0 0 16px;font-size:15px;color:#444;line-height:1.8;">
              Díky, že máte zájem o newsletter Globaal Elevate Production. Budete dostávat novinky o projektech, eventech, nové hudbě a zákulisí — co nastane dřív, než to uvidíte jinde.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#444;line-height:1.8;">
              Pro dokončení přihlášení klikněte na tlačítko níže. Odkaz je platný 48 hodin.
            </p>

            <!-- CTA button -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="border-radius:10px;background:#B5976A;mso-padding-alt:0;">
                  <a href="${confirmUrl}" target="_blank" style="display:inline-block;padding:16px 32px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.02em;border-radius:10px;">
                    Potvrdit přihlášení →
                  </a>
                </td>
              </tr>
            </table>

            <!-- Fallback link -->
            <p style="margin:0 0 6px;font-size:12px;color:#999;">Pokud tlačítko nefunguje, zkopírujte tento odkaz do prohlížeče:</p>
            <p style="margin:0 0 28px;font-size:12px;color:#999;word-break:break-all;line-height:1.6;">
              <a href="${confirmUrl}" style="color:#B5976A;">${confirmUrl}</a>
            </p>

            <!-- Safety note -->
            <p style="margin:0;font-size:13px;color:#bbb;border-top:1px solid #f0f0f0;padding-top:20px;line-height:1.65;">
              Pokud jste se nepřihlašovali vy, tento e-mail ignorujte. Bez potvrzení vám nic posílat nebudeme.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#fafafa;border-top:1px solid #f0f0f0;padding:18px 36px;">
            <p style="margin:0;font-size:12px;color:#bbb;line-height:1.6;">
              Globaal Elevate Production s.r.o. · IČO 24972070 · Praha 1 ·
              <a href="https://globaalelevate.com/gdpr" style="color:#bbb;text-decoration:underline;">Zásady ochrany údajů</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

  const text = `Potvrďte přihlášení k newsletteru Globaal Elevate Production
================================================================

Díky za zájem o newsletter Globaal Elevate Production. Budete dostávat novinky o projektech, eventech, nové hudbě a zákulisí.

Pro dokončení přihlášení klikněte na tento odkaz (platí 48 hodin):
${confirmUrl}

Pokud jste se nepřihlašovali vy, tento e-mail ignorujte. Bez potvrzení vám nic posílat nebudeme.

--
Globaal Elevate Production s.r.o. · IČO 24972070 · Praha 1
Zásady ochrany údajů: https://globaalelevate.com/gdpr`

  return { html, text }
}

export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' }
  const silentOk = new Response(JSON.stringify({ ok: true }), { status: 200, headers })

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    // Return 429 so the client can show a "try again later" message
    return new Response(JSON.stringify({ error: 'Too many requests' }), { status: 429, headers })
  }

  let body: { email?: string; website?: string; source?: string; lang?: string }
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400, headers })
  }

  // Honeypot: silently succeed so bots don't know they were blocked
  if (body.website) return silentOk

  const email = (body.email ?? '').trim().toLowerCase()
  const source = body.source ?? 'popup'

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || email.length > 254 || !emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400, headers })
  }

  const token = makeToken(email, source)
  const confirmUrl = `${import.meta.env.PUBLIC_SITE_URL}/api/newsletter/confirm?token=${token}`

  try {
    const { html, text } = buildConfirmEmail(confirmUrl)
    await resend.emails.send({
      from: import.meta.env.NEWSLETTER_FROM ?? 'Globaal Elevate <newsletter@globaalelevate.com>',
      to: [email],
      subject: 'Potvrďte přihlášení k newsletteru Globaal Elevate',
      html,
      text,
    })
  } catch (err) {
    console.error('[newsletter/subscribe] Resend error:', err)
    return new Response(JSON.stringify({ error: 'Send failed' }), { status: 500, headers })
  }

  return silentOk
}
