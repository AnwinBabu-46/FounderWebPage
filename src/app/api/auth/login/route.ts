import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth-session';
import { verifyPassword } from '@/lib/auth-password';

export const dynamic = 'force-dynamic';

// Default: Jaman@myazlifresh.com / azilfreshjamanu@446
const DEFAULT_EMAIL = 'Jaman@myazlifresh.com';
const DEFAULT_HASH = '$2b$10$TTHZjGQMhqOFAfYX8Ug4AufQBnX0QwTsLMAA7NFTefb1V34cKh4ga';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const envEmail = process.env.ADMIN_EMAIL || DEFAULT_EMAIL;
    const envHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_HASH;

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
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
