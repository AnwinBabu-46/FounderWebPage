import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth-session';

export async function GET() {
  return NextResponse.json({ authenticated: true });
}

// This route will be protected by middleware
// If the request reaches here, the session is valid
