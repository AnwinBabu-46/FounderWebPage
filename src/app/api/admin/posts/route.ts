import { NextResponse } from 'next/server';
import { BlogService } from '@/lib/blog-service';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // ✅ Supabase Update: We await the service because the DB call is async
    // We also removed the ID calculation because Supabase handles IDs automatically
    const created = await BlogService.create(body);

    return NextResponse.json(created);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}