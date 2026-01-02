import { notFound } from 'next/navigation';
import { BlogService } from '@/lib/blog-service';
import PostForm from '@/components/Admin/PostForm';

// 1. Make the component ASYNC
export default async function EditPostPage({ params }: { params: { slug: string } }) {
  
  // 2. AWAIT the data fetching from Supabase
  const post = await BlogService.getBySlug(params.slug);

  // 3. If no post is found in the DB, show 404
  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
      <div className="bg-white rounded-xl shadow-sm border p-6">
        {/* Pass the data to the form */}
        <PostForm initialData={post} isEditing />
      </div>
    </div>
  );
}