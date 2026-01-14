import { notFound } from 'next/navigation';
import { BlogService } from '@/lib/blog-service';
import PostForm from '@/components/Admin/PostForm';

// ✅ FIX: Add these two lines to force fresh data every time
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function EditPostPage({ params }: { params: { slug: string } }) {
  
  // 1. Fetch the LATEST data from Supabase
  const post = await BlogService.getBySlug(params.slug);

  // 2. If no post is found in the DB, show 404
  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
      <div className="bg-white rounded-xl shadow-sm border p-6">
        {/* Pass the fresh data to the form */}
        <PostForm initialData={post} isEditing />
      </div>
    </div>
  );
}