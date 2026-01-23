import { NextResponse } from 'next/server';
import { BlogService } from '@/lib/blog-service';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postData = await request.json();
    
    // 🟢 ADDED 'await' - essential for Supabase/Async operations
    const updated = await BlogService.update(params.id, postData);
    
    if (!updated) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 🟢 ADDED 'await' - essential for Supabase/Async operations
    const success = await BlogService.delete(params.id);
    
    if (!success) {
      return NextResponse.json({ error: 'Post not found or already deleted' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}