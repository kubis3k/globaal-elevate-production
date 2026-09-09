export const prerender = false

import type { APIRoute } from 'astro'
import { Resend } from 'resend'

const resend = new Resend(import.meta.env.RESEND_API_KEY)
const AUDIENCE_ID = import.meta.env.RESEND_AUDIENCE_ID

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function welcomeEmailHtml(lang: string): string {
  const isEn = lang === 'en'
  return `<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0a0a0a;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.2);">

        <!-- Header -->
        <tr>
          <td style="padding:36px 40px 20px;">
            <span style="font-size:18px;font-weight:700;color:#ffffff;letter-spacing:0.02em;">GLOBAAL ELEVATE</span>
            <span style="font-size:11px;color:#B8935A;letter-spacing:0.15em;text-transform:uppercase;margin-left:10px;">PRODUCTION</span>
          </td>
        </tr>

        <tr><td style="background:#B8935A;height:2px;"></td></tr>

        <!-- Hero -->
        <tr>
          <td style="padding:40px 40px 32px;">
            <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#B8935A;font-weight:600;">
              ${isEn ? 'Newsletter' : 'Newsletter'}
            </p>
            <h1 style="margin:0 0 20px;font-size:28px;font-weight:800;color:#ffffff;line-height:1.2;">
              ${isEn ? 'You\'re in. 🎉' : 'Jste v tom. 🎉'}
            </h1>
            <p style="margin:0 0 16px;font-size:16px;color:#c8c8c8;line-height:1.75;">
              ${isEn
                ? 'Welcome to the Globaal Elevate Production newsletter. You\'ll be the first to hear about new projects, events, partnerships and what\'s happening behind the scenes.'
                : 'Vítejte v newsletteru Globaal Elevate Production. Budete první, kdo se dozví o nových projektech, eventech, partnerstvích a co se děje za kulisami.'}
            </p>
            <p style="margin:0 0 36px;font-size:15px;color:#777;line-height:1.7;">
              ${isEn
                ? 'No spam, no noise — just the stuff that matters, when it matters.'
                : 'Žádný spam, žádný šum — jen to, co má smysl, kdy to má smysl.'}
            </p>

            <a href="https://globaalelevate.com${isEn ? '/en/' : '/'}" style="display:inline-block;background:#B8935A;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:0.05em;padding:13px 26px;border-radius:6px;text-decoration:none;">
              ${isEn ? 'Visit our website →' : 'Navštívit web →'}
            </a>
          </td>
        </tr>

        <!-- What to expect -->
        <tr>
          <td style="padding:0 40px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #1e1e1e;padding-top:28px;">
              <tr>
                <td style="padding-top:28px;">
                  <p style="margin:0 0 16px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#555;font-weight:600;">
                    ${isEn ? 'What to expect' : 'Co vás čeká'}
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    ${['🎵 ' + (isEn ? 'Music releases & events' : 'Hudba a eventy'),
                       '🎨 ' + (isEn ? 'Creative work & projects' : 'Kreativní projekty'),
                       '📈 ' + (isEn ? 'Growth & marketing insights' : 'Marketing a growth tipy'),
                       '🔧 ' + (isEn ? 'Tech & product updates' : 'Technologie a produkty')]
                      .map(item => `<tr><td style="padding:7px 0;font-size:14px;color:#aaa;line-height:1.5;">${item}</td></tr>`)
                      .join('')}
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr><td style="background:#111;height:1px;"></td></tr>
        <tr>
          <td style="padding:22px 40px;text-align:left;">
            <p style="margin:0 0 6px;font-size:12px;color:#444;">
              ${isEn
                ? 'You\'re receiving this because you signed up at globaalelevate.com.'
                : 'Tento email jste obdrželi, protože jste se přihlásili na globaalelevate.com.'}
            </p>
            <p style="margin:0;font-size:12px;color:#333;">
              Globaal Elevate Production s.r.o. · IČO 24972070 · Praha 1
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' }

  let body: { email?: string; lang?: string }
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400, headers })
  }

  const { email, lang = 'cs' } = body
  if (!email) {
    return new Response(JSON.stringify({ error: 'Email required' }), { status: 400, headers })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400, headers })
  }

  try {
    await Promise.all([
      // Add to Resend audience (if AUDIENCE_ID is set)
      ...(AUDIENCE_ID ? [
        resend.contacts.create({
          audienceId: AUDIENCE_ID,
          email,
          unsubscribed: false,
        })
      ] : []),
      // Welcome email
      resend.emails.send({
        from: 'Globaal Elevate Production <noreply@globaalelevate.com>',
        to: [email],
        subject: lang === 'en'
          ? 'Welcome to GEP Newsletter 🎉'
          : 'Vítejte v GEP Newsletteru 🎉',
        html: welcomeEmailHtml(lang),
      }),
    ])

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers })
  } catch (err) {
    console.error('Newsletter error:', err)
    return new Response(JSON.stringify({ error: 'Failed to subscribe' }), { status: 500, headers })
  }
}
