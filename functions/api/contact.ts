interface Env {
  TURNSTILE_SECRET_KEY?: string;
}

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  turnstileToken?: string;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const { request, env } = context;

    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Content-Type must be application/json' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body: ContactPayload = await request.json();
    const { name, email, subject, message, turnstileToken } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return new Response(
        JSON.stringify({ success: false, error: 'A valid email address is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Message is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Payload size sanity checks
    if (name.length > 150 || (subject && subject.length > 200) || message.length > 5000) {
      return new Response(
        JSON.stringify({ success: false, error: 'Payload exceeds allowed field character limits' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Optional Cloudflare Turnstile token validation
    if (env.TURNSTILE_SECRET_KEY && turnstileToken) {
      const formData = new FormData();
      formData.append('secret', env.TURNSTILE_SECRET_KEY);
      formData.append('response', turnstileToken);
      const ip = request.headers.get('CF-Connecting-IP');
      if (ip) formData.append('remoteip', ip);

      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData,
      });

      const verifyOutcome = (await verifyRes.json()) as { success?: boolean };
      if (!verifyOutcome.success) {
        return new Response(
          JSON.stringify({ success: false, error: 'Turnstile verification failed' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message delivered successfully to simon-escano.',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error while processing request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
