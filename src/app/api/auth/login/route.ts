import { NextResponse } from 'next/server';
import { encrypt, verifyPassword, hashPassword } from '@/lib/auth';

// Default: admin@example.com / admin123
const DEFAULT_EMAIL = 'admin@example.com';
// Hash for 'admin123'
const DEFAULT_HASH = '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const envEmail = process.env.ADMIN_EMAIL || DEFAULT_EMAIL;
    const envHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_HASH;

    if (email !== envEmail) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await verifyPassword(password, envHash);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
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
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
