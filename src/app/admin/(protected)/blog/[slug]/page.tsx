import { notFound } from 'next/navigation';
import { BlogService } from '@/lib/blog-service';
import PostForm from '@/components/Admin/PostForm';

export default function EditPostPage({ params }: { params: { slug: string } }) {
  const post = BlogService.getBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <PostForm initialData={post} isEditing />
      </div>
    </div>
  );
}
