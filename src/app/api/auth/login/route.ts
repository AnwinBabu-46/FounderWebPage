import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth-session';
import { verifyPassword } from '@/lib/auth-password';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Default: Jamanudeen@myazlifresh.com / 446$Jamanudeen.co$
const DEFAULT_EMAIL = 'Jamanudeen@myazlifresh.com';
const DEFAULT_HASH = '$2b$10$ckB0qU07ARBZ5hRDKNXJdeG1kTzypwRgBXGkTgFwNwLlZfTu9sZbO';

export async function POST(request: Request) {
  console.log("LOGIN ROUTE HIT");
  try {
    // Environment validation
    const envEmail = process.env.ADMIN_EMAIL || DEFAULT_EMAIL;
    const envHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_HASH;
    const jwtSecret = process.env.JWT_SECRET_KEY;

    if (!jwtSecret) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const body = await request.json();
    const { email, password } = body;

    if (email.toLowerCase() !== envEmail.toLowerCase()) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await verifyPassword(password, envHash);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ user: 'admin', expires });

    const response = NextResponse.json({ success: true });
    
    response.cookies.set('session', session, {
      expires,
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
