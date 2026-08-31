export const prerender = false

import type { APIRoute } from 'astro'
import { Resend } from 'resend'

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' }

  let body: { name?: string; email?: string; message?: string; lang?: string }
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400, headers })
  }

  const { name, email, message, lang } = body
  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400, headers })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400, headers })
  }

  try {
    await resend.emails.send({
      from: 'Globaal Elevate Production <noreply@globaalelevate.com>',
      to: ['info@globaalelevate.com'],
      replyTo: email,
      subject: `Nová zpráva od ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #0a0a0a;">Nová zpráva z webu</h2>
          <table style="width:100%; border-collapse:collapse;">
            <tr><td style="padding:8px 0; color:#666; width:100px;">Jméno:</td><td style="padding:8px 0;"><strong>${escapeHtml(name)}</strong></td></tr>
            <tr><td style="padding:8px 0; color:#666;">Email:</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px 0; color:#666;">Jazyk:</td><td style="padding:8px 0;">${lang === 'en' ? 'EN' : 'CS'}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #eee; margin:16px 0;">
          <h3 style="color:#0a0a0a;">Zpráva:</h3>
          <p style="color:#333; line-height:1.7; white-space:pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    })

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers })
  } catch (err) {
    console.error('Resend error:', err)
    return new Response(JSON.stringify({ error: 'Failed to send' }), { status: 500, headers })
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
