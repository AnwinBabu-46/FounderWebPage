import { NextResponse } from 'next/server';
import { BlogService } from '@/lib/blog-service';

export async function POST(request: Request) {
  try {
    const post = await request.json();
    
    // Basic validation
    if (!post.title || !post.slug || !post.content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Assign ID if missing (auto-increment max id)
    if (!post.id) {
      const all = BlogService.getAll();
      const maxId = all.reduce((max, p) => Math.max(max, p.id), 0);
      post.id = maxId + 1;
    }

    const created = BlogService.create(post);
    return NextResponse.json(created);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
