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
    // Environment validation
    const envEmail = process.env.ADMIN_EMAIL || DEFAULT_EMAIL;
    const envHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_HASH;
    const jwtSecret = process.env.JWT_SECRET_KEY;

    if (!jwtSecret) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Safe body parsing
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // Input validation
    const { email, password } = body || {};
    
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (email.toLowerCase() !== envEmail.toLowerCase()) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Safe password verification
    let isValid;
    try {
      isValid = await verifyPassword(password, envHash);
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Safe session creation
    let session;
    try {
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      session = await encrypt({ user: 'admin', expires });
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    const response = NextResponse.json({ success: true });
    
    response.cookies.set('session', session, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
