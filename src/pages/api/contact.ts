export const prerender = false

import type { APIRoute } from 'astro'
import { Resend } from 'resend'

const resend = new Resend(import.meta.env.RESEND_API_KEY)

const TOPIC_LABELS_CS: Record<string, string> = {
  projekt: 'Projekt',
  booking: 'Booking',
  spoluprace: 'Spolupráce',
  jine: 'Jiné',
}

const TOPIC_LABELS_EN: Record<string, string> = {
  project: 'Project',
  booking: 'Booking',
  collaboration: 'Collaboration',
  other: 'Other',
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function internalEmailHtml(name: string, email: string, message: string, topic: string, lang: string): string {
  const topicLabel = lang === 'en'
    ? (TOPIC_LABELS_EN[topic] ?? topic)
    : (TOPIC_LABELS_CS[topic] ?? topic)

  return `<!DOCTYPE html>
<html lang="cs">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#0a0a0a;padding:28px 40px;text-align:left;">
            <span style="font-size:18px;font-weight:700;color:#ffffff;letter-spacing:0.02em;">GLOBAAL ELEVATE</span>
            <span style="font-size:11px;color:#B8935A;letter-spacing:0.15em;text-transform:uppercase;margin-left:10px;">PRODUCTION</span>
          </td>
        </tr>

        <!-- Accent strip -->
        <tr><td style="background:#B8935A;height:3px;"></td></tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px 28px;">
            <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#B8935A;font-weight:600;">Nová zpráva z webu</p>
            <h1 style="margin:0 0 28px;font-size:22px;font-weight:700;color:#0a0a0a;line-height:1.3;">Kontaktní formulář</h1>

            <!-- Info table -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:24px;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:13px;width:110px;vertical-align:top;">Jméno</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#0a0a0a;font-weight:600;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:13px;vertical-align:top;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;">
                  <a href="mailto:${escapeHtml(email)}" style="color:#0a0a0a;font-weight:600;text-decoration:underline;">${escapeHtml(email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:13px;vertical-align:top;">Téma</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="display:inline-block;background:#0a0a0a;color:#fff;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:3px 10px;border-radius:99px;">${escapeHtml(topicLabel)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#888;font-size:13px;vertical-align:top;">Jazyk</td>
                <td style="padding:10px 0;font-size:14px;color:#0a0a0a;">${lang === 'en' ? '🇬🇧 English' : '🇨🇿 Čeština'}</td>
              </tr>
            </table>

            <!-- Message -->
            <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#888;font-weight:600;">Zpráva</p>
            <div style="background:#f9f9f9;border-left:3px solid #B8935A;border-radius:0 6px 6px 0;padding:16px 20px;">
              <p style="margin:0;font-size:15px;color:#222;line-height:1.75;white-space:pre-wrap;">${escapeHtml(message)}</p>
            </div>
          </td>
        </tr>

        <!-- Reply CTA -->
        <tr>
          <td style="padding:0 40px 36px;">
            <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:#B8935A;color:#ffffff;font-size:14px;font-weight:700;letter-spacing:0.04em;padding:12px 24px;border-radius:6px;text-decoration:none;margin-top:4px;">
              Odpovědět → ${escapeHtml(email)}
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;border-top:1px solid #eee;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#aaa;">Globaal Elevate Production s.r.o. · IČO 24972070 · Praha 1</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function autoReplyHtml(name: string, lang: string): string {
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
          <td style="padding:36px 40px 24px;text-align:left;">
            <span style="font-size:18px;font-weight:700;color:#ffffff;letter-spacing:0.02em;">GLOBAAL ELEVATE</span>
            <span style="font-size:11px;color:#B8935A;letter-spacing:0.15em;text-transform:uppercase;margin-left:10px;">PRODUCTION</span>
          </td>
        </tr>

        <!-- Accent strip -->
        <tr><td style="background:#B8935A;height:2px;margin:0 40px;"></td></tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <h1 style="margin:0 0 16px;font-size:26px;font-weight:800;color:#ffffff;line-height:1.2;">
              ${isEn ? `Hey ${escapeHtml(name)} 👋` : `Díky, ${escapeHtml(name)} 👋`}
            </h1>
            <p style="margin:0 0 20px;font-size:16px;color:#c8c8c8;line-height:1.75;">
              ${isEn
                ? 'We\'ve received your message and will get back to you as soon as possible — usually within 1–2 business days.'
                : 'Vaši zprávu jsme přijali a ozveme se co nejdříve — obvykle do 1–2 pracovních dnů.'}
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#888;line-height:1.7;">
              ${isEn
                ? 'In the meantime, feel free to check out our portfolio or follow what we\'re up to.'
                : 'Mezitím se podívejte na naše portfolio nebo sledujte, co děláme.'}
            </p>

            <!-- CTA buttons -->
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:12px;">
                  <a href="https://globaalelevate.com${isEn ? '/en/portfolio' : '/portfolio'}" style="display:inline-block;background:#B8935A;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:0.05em;padding:12px 22px;border-radius:6px;text-decoration:none;">
                    ${isEn ? 'View portfolio' : 'Portfolio'}
                  </a>
                </td>
                <td>
                  <a href="https://globaalelevate.com${isEn ? '/en/' : '/'}" style="display:inline-block;background:#1e1e1e;color:#ffffff;border:1px solid #333;font-size:13px;font-weight:600;letter-spacing:0.04em;padding:12px 22px;border-radius:6px;text-decoration:none;">
                    ${isEn ? 'Our website' : 'Web'}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="background:#1a1a1a;height:1px;"></td></tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;text-align:left;">
            <p style="margin:0 0 4px;font-size:13px;color:#555;">
              ${isEn ? 'Questions?' : 'Dotazy?'} <a href="mailto:info@globaalelevate.com" style="color:#B8935A;text-decoration:none;">info@globaalelevate.com</a>
            </p>
            <p style="margin:0;font-size:12px;color:#444;">Globaal Elevate Production s.r.o. · Praha 1</p>
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

  let body: { name?: string; email?: string; message?: string; topic?: string; lang?: string }
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400, headers })
  }

  const { name, email, message, topic = 'projekt', lang = 'cs' } = body
  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400, headers })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400, headers })
  }

  const topicLabel = lang === 'en'
    ? (TOPIC_LABELS_EN[topic] ?? topic)
    : (TOPIC_LABELS_CS[topic] ?? topic)

  try {
    await Promise.all([
      // Internal notification
      resend.emails.send({
        from: 'Globaal Elevate <noreply@globaalelevate.com>',
        to: ['info@globaalelevate.com'],
        replyTo: email,
        subject: `[${topicLabel}] Zpráva od ${name}`,
        html: internalEmailHtml(name, email, message, topic, lang),
      }),
      // Auto-reply to sender
      resend.emails.send({
        from: 'Globaal Elevate Production <noreply@globaalelevate.com>',
        to: [email],
        subject: lang === 'en'
          ? 'We received your message — Globaal Elevate Production'
          : 'Přijali jsme vaši zprávu — Globaal Elevate Production',
        html: autoReplyHtml(name, lang),
      }),
    ])

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers })
  } catch (err) {
    console.error('Resend error:', err)
    return new Response(JSON.stringify({ error: 'Failed to send' }), { status: 500, headers })
  }
}
