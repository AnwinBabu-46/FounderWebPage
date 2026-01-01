import PostForm from '@/components/Admin/PostForm';

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <PostForm />
      </div>
    </div>
  );
}