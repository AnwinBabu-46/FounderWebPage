import Link from 'next/link';
import { BlogService } from '@/lib/blog-service';

export default function DashboardPage() {
  const posts = BlogService.getAll();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-medium text-gray-500">Total Posts</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{posts.length}</p>
        </div>
        {/* Add more stats if needed */}
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link 
            href="/admin/blog/new" 
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Create New Post
          </Link>
          <Link 
            href="/admin/blog" 
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Manage Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
