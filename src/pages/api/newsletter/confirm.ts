export const prerender = false

import type { APIRoute } from 'astro'
import { createHmac, timingSafeEqual } from 'crypto'
import { Resend } from 'resend'

const resend = new Resend(import.meta.env.RESEND_API_KEY)
const TOKEN_TTL_MS = 48 * 60 * 60 * 1000 // 48 hours

function verifyToken(token: string): { email: string; source: string; iat: number } | null {
  const secret = import.meta.env.NEWSLETTER_TOKEN_SECRET
  if (!secret) return null

  const dotIdx = token.lastIndexOf('.')
  if (dotIdx === -1) return null

  const payload = token.slice(0, dotIdx)
  const sig = token.slice(dotIdx + 1)

  const expectedSig = createHmac('sha256', secret).update(payload).digest('base64url')

  try {
    const sigBuf = Buffer.from(sig)
    const expBuf = Buffer.from(expectedSig)
    // timingSafeEqual requires equal-length buffers
    if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return null
  } catch {
    return null
  }

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (typeof data.email !== 'string' || typeof data.iat !== 'number') return null
    if (Date.now() - data.iat > TOKEN_TTL_MS) return null
    return data
  } catch {
    return null
  }
}

export const GET: APIRoute = async ({ url }) => {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? 'https://globaalelevate.com'
  const badRedirect = () =>
    new Response(null, { status: 302, headers: { Location: `${siteUrl}/newsletter/neplatny-odkaz` } })
  const goodRedirect = () =>
    new Response(null, { status: 302, headers: { Location: `${siteUrl}/newsletter/potvrzeno` } })

  const token = url.searchParams.get('token') ?? ''
  const data = verifyToken(token)

  if (!data) return badRedirect()

  const { email, source } = data
  const confirmDate = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

  try {
    // NOTE: Resend contacts API does not support custom properties.
    // We store consent metadata in firstName/lastName as a temporary workaround.
    // firstName = "[source]" (e.g. "[popup]"), lastName = confirmation date.
    // Consider a proper consent log (e.g. Vercel KV or Supabase) if GDPR audit trail is required.
    await resend.contacts.create({
      audienceId: import.meta.env.RESEND_AUDIENCE_ID,
      email,
      firstName: `[${source}]`,
      lastName: confirmDate,
      unsubscribed: false,
    })
  } catch (err: any) {
    // Idempotent: if contact already exists and is subscribed, that's fine.
    // Log the message only — never log the full email address.
    console.error('[newsletter/confirm] Resend error:', err?.message ?? 'unknown')
  }

  return goodRedirect()
}
