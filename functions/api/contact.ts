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

const ALLOWED_ORIGINS = [
  'https://simon-escano.pages.dev',
  'http://localhost:3000',
  'http://localhost:5173',
];

function getCorsHeaders(origin: string | null) {
  const isAllowed = origin && ALLOWED_ORIGINS.some((allowed) => origin === allowed || origin.endsWith('.simon-escano.pages.dev'));
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'https://simon-escano.pages.dev',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export const onRequestOptions = async (context: { request: Request }) => {
  const origin = context.request.headers.get('Origin');
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;
  const origin = request.headers.get('Origin');
  const corsHeaders = getCorsHeaders(origin);

  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Content-Type must be application/json' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const body: ContactPayload = await request.json();
    const { name, email, subject, message, turnstileToken } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return new Response(
        JSON.stringify({ success: false, error: 'A valid email address is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Message is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Payload size sanity checks
    if (name.length > 150 || (subject && subject.length > 200) || message.length > 5000) {
      return new Response(
        JSON.stringify({ success: false, error: 'Payload exceeds allowed field character limits' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
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
          { status: 403, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
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
          ...corsHeaders,
        },
      }
    );
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error while processing request' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};
