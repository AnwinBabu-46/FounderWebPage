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
    console.log('Login attempt started');
    
    // Environment validation
    const envEmail = process.env.ADMIN_EMAIL || DEFAULT_EMAIL;
    const envHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_HASH;
    const jwtSecret = process.env.JWT_SECRET_KEY;
    
    console.log('Environment check:', {
      hasAdminEmail: !!process.env.ADMIN_EMAIL,
      hasPasswordHash: !!process.env.ADMIN_PASSWORD_HASH,
      hasJwtSecret: !!jwtSecret,
      nodeEnv: process.env.NODE_ENV
    });

    if (!jwtSecret) {
      console.error('JWT_SECRET_KEY is missing');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const body = await request.json();
    const { email, password } = body;

    console.log('Request parsed successfully');

    if (email.toLowerCase() !== envEmail.toLowerCase()) {
      console.log('Email mismatch');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    console.log('Email validation passed, verifying password');
    const isValid = await verifyPassword(password, envHash);

    if (!isValid) {
      console.log('Password verification failed');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    console.log('Password verified, creating session');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ user: 'admin', expires });

    console.log('Session created, setting cookie');
    const response = NextResponse.json({ success: true });
    
    response.cookies.set('session', session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    console.log('Login successful');
    return response;
  } catch (error) {
    console.error('Login error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown'
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
