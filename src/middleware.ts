import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './lib/auth-session';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Handle authenticated users trying to access login page
  if (path === '/admin/login') {
    const session = request.cookies.get('session')?.value;
    if (session) {
      try {
        const payload = await decrypt(session);
        if (payload) {
          // Already authenticated, redirect to dashboard
          return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
      } catch (e) {
        // Invalid session, continue to login page
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // Protect /admin routes and /api/admin routes
  if ((path.startsWith('/admin') || path.startsWith('/api/admin'))) {
    const session = request.cookies.get('session')?.value;
    
    if (!session) {
      if (path.startsWith('/api')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const payload = await decrypt(session);
    if (!payload) {
      // Invalid token
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
