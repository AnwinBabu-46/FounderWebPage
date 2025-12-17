import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth-session';
import { verifyPassword } from '@/lib/auth-password';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Default: Jamanudeen@myazlifresh.com / 446$Jamanudeen.co$
const DEFAULT_EMAIL = 'Jamanudeen@myazlifresh.com';
const DEFAULT_HASH = '$2b$10$ckB0qU07ARBZ5hRDKNXJdeG1kTzypwRgBXGkTgFwNwLlZfTu9sZbO';

export async function POST(request: Request) {
  try {
    // Environment validation with safe string handling
    const envEmail = process.env.ADMIN_EMAIL || DEFAULT_EMAIL;
    const envHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_HASH;
    const jwtSecret = process.env.JWT_SECRET_KEY;

    if (!jwtSecret) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // 1️⃣ Content-Type Gate (CRITICAL)
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Unsupported Media Type' }, { status: 415 });
    }

    // 2️⃣ Isolated JSON Parsing Guard
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // 3️⃣ Strict Input Normalization
    const { email, password } = body || {};
    
    if (!email || typeof email !== 'string' || email.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    if (!password || typeof password !== 'string' || password.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Safe string operations with validation
    let normalizedEmail, normalizedEnvEmail;
    try {
      normalizedEmail = email.toLowerCase();
      normalizedEnvEmail = envEmail.toLowerCase();
    } catch (error) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (normalizedEmail !== normalizedEnvEmail) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 4️⃣ Crypto Safety - bcrypt.compare
    let isValid;
    try {
      isValid = await verifyPassword(password, envHash);
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 4️⃣ Crypto Safety - JWT signing with safe date calculation
    let session, expires;
    try {
      expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      session = await encrypt({ user: 'admin', expires });
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    const response = NextResponse.json({ success: true });
    
    // 4️⃣ Crypto Safety - Cookie setting
    try {
      response.cookies.set('session', session, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    return response;
  } catch (error) {
    console.error('Login error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
