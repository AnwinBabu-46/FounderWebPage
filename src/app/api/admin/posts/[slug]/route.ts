import { NextResponse } from 'next/server';
import { BlogService } from '@/lib/blog-service';

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await request.json();
    const updated = BlogService.update(params.slug, post);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    BlogService.delete(params.slug);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
