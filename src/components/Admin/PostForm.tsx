'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPostFull } from '@/data/blog/types';
import { Button } from '@/components/ui/button';

interface PostFormProps {
  initialData?: BlogPostFull;
  isEditing?: boolean;
}

export default function PostForm({ initialData, isEditing = false }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<Partial<BlogPostFull>>(initialData || {
    title: '',
    slug: '',
    teaser: '',
    category: '',
    readTime: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    content: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEditing 
        ? `/api/admin/posts/${initialData?.slug}` 
        : '/api/admin/posts';
      
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save post');
      }

      router.push('/admin/blog');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/posts/${initialData?.slug}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      router.push('/admin/blog');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            name="slug"
            required
            value={formData.slug}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Read Time</label>
          <input
            name="readTime"
            required
            value={formData.readTime}
            onChange={handleChange}
            placeholder="e.g. 5 min read"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Teaser</label>
        <textarea
          name="teaser"
          required
          rows={3}
          value={formData.teaser}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Content (HTML allowed)</label>
        <textarea
          name="content"
          required
          rows={15}
          value={formData.content}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-xs text-gray-500">
          Tip: Use standard HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, etc.
        </p>
      </div>

      <div className="flex items-center justify-between pt-4">
        {isEditing && (
          <Button 
            type="button" 
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete Post
          </Button>
        )}
        <div className="flex gap-4 ml-auto">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Post'}
          </Button>
        </div>
      </div>
    </form>
  );
}
