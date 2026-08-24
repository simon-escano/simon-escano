/**
 * Cloudflare Pages Function — Contact Form API
 * Route: POST /api/contact
 */

export async function onRequestPost(context) {
  const { request, env } = context

  // 1. CORS & Headers Setup
  const allowedOrigins = [
    'https://simon-escano.pages.dev',
    'http://localhost:5173',
    'http://localhost:4173',
  ]
  const origin = request.headers.get('Origin') || ''
  const isAllowed = allowedOrigins.includes(origin)

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'X-Content-Type-Options': 'nosniff',
  }

  try {
    const body = await request.json().catch(() => null)
    if (!body) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid JSON payload.' }),
        { status: 400, headers }
      )
    }

    const { name, email, subject, message, turnstileToken } = body

    // 2. Input Validation & Sanitization
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Name is required.' }),
        { status: 400, headers }
      )
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return new Response(
        JSON.stringify({ success: false, error: 'A valid email is required.' }),
        { status: 400, headers }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Message content is required.' }),
        { status: 400, headers }
      )
    }

    // Limit payload length to prevent memory exhaustion attacks
    if (message.length > 5000) {
      return new Response(
        JSON.stringify({ success: false, error: 'Message exceeds maximum allowable length (5000 chars).' }),
        { status: 400, headers }
      )
    }

    // 3. Cloudflare Turnstile Server-Side Verification
    const turnstileSecret = env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA'

    if (turnstileToken && turnstileSecret) {
      const clientIp = request.headers.get('CF-Connecting-IP') || ''
      const formData = new FormData()
      formData.append('secret', turnstileSecret)
      formData.append('response', turnstileToken)
      if (clientIp) formData.append('remoteip', clientIp)

      const turnstileRes = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          body: formData,
        }
      )

      const turnstileData = await turnstileRes.json()

      // In production, reject if Turnstile validation fails
      if (!turnstileData.success && env.TURNSTILE_SECRET_KEY) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Bot protection verification failed. Please try again.',
          }),
          { status: 403, headers }
        )
      }
    }

    // 4. Optional: Dispatch Email via Resend API
    if (env.RESEND_API_KEY) {
      const targetEmail = env.CONTACT_TO_EMAIL || 'escanosimonlyster@gmail.com'
      const cleanName = name.trim().slice(0, 100)
      const cleanEmail = email.trim().slice(0, 100)
      const cleanSubject = (subject || 'New Portfolio Contact Form Submission').trim().slice(0, 200)
      const cleanMessage = message.trim().slice(0, 5000)

      const emailPayload = {
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [targetEmail],
        reply_to: cleanEmail,
        subject: `[Portfolio Inquiry] ${cleanSubject}`,
        text: `From: ${cleanName} (${cleanEmail})\nSubject: ${cleanSubject}\n\nMessage:\n${cleanMessage}`,
      }

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      }).catch((e) => {
        console.error('Failed to send email via Resend:', e)
      })
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your message was successfully transmitted.',
      }),
      { status: 200, headers }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'An internal server error occurred while processing your request.',
      }),
      { status: 500, headers }
    )
  }
}

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
