'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// If this import fails, remove it and define the interface locally
import { BlogPostFull } from '@/data/blog/types'; 
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Trash2, 
  X, 
  Loader2 
} from 'lucide-react';

interface PostFormProps {
  initialData?: BlogPostFull;
  isEditing?: boolean;
}

const READ_TIME_OPTIONS = [
  "1 min read", "2 min read", "3 min read", "4 min read", 
  "5 min read", "7 min read", "10 min read", "15+ min read"
];

export default function PostForm({ initialData, isEditing = false }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // UI States for Modals and Toasts
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  // Helper to get YYYY-MM-DD format for the Date Input safely
  const formatDateForInput = (dateString?: string) => {
    try {
      if (!dateString) return new Date().toISOString().split('T')[0];
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return new Date().toISOString().split('T')[0];
      return date.toISOString().split('T')[0];
    } catch (e) {
      return new Date().toISOString().split('T')[0];
    }
  };

  const [formData, setFormData] = useState<Partial<BlogPostFull>>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    teaser: initialData?.teaser || '',
    category: initialData?.category || '',
    readTime: initialData?.readTime || '5 min read',
    date: formatDateForInput(initialData?.date),
    content: initialData?.content || '',
  });

  // Sync initialData if it loads later
  useEffect(() => {
    if (initialData) {
        setFormData(prev => ({
            ...prev,
            ...initialData,
            date: formatDateForInput(initialData.date)
        }));
    }
  }, [initialData]);

  // Helper: Show Toast Notification
  const showToastMessage = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
    // Auto hide after 3 seconds
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  // Helper: Generate a unique URL-friendly slug
  const generateSlug = (title: string) => {
    const cleanTitle = (title || '')
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') 
      .replace(/[\s_-]+/g, '-') 
      .replace(/^-+|-+$/g, ''); 

    const uniqueSuffix = Math.random().toString(36).substring(2, 7);
    return `${cleanTitle}-${uniqueSuffix}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const updates = { ...prev, [name]: value };
      if (name === 'title' && !isEditing) {
        updates.slug = generateSlug(value);
      }
      return updates;
    });
  };

  const handleRegenerateSlug = () => {
    if (formData.title) {
      setFormData(prev => ({ ...prev, slug: generateSlug(prev.title!) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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

      // Success!
      showToastMessage(isEditing ? 'Post updated successfully!' : 'Post published successfully!');
      
      // Wait a moment so user sees the toast, then redirect
      setTimeout(() => {
        router.push('/admin/blog');
        router.refresh();
      }, 1000);

    } catch (err: any) {
      showToastMessage(err.message, 'error');
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/posts/${initialData?.slug}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      
      showToastMessage('Post deleted successfully', 'success');
      setShowDeleteModal(false);

      setTimeout(() => {
        router.push('/admin/blog');
        router.refresh();
      }, 1000);

    } catch (err: any) {
      showToastMessage(err.message, 'error');
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="w-full max-w-6xl mx-auto pb-24 lg:pb-0">
        
        {/* Error/Success Banner (Mobile) */}
        {toast.show && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl flex items-center gap-3 animate-in slide-in-from-top-5 fade-in duration-300 ${
            toast.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
             {toast.type === 'error' ? <AlertTriangle size={20}/> : <CheckCircle2 size={20}/>}
             <p className="font-medium text-sm">{toast.message}</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 p-4 lg:p-0">
          
          {/* LEFT COLUMN: Main Content */}
          <div className="flex-1 space-y-6 order-2 lg:order-1">
            
            {/* Post Details Card */}
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-100 space-y-5">
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                ✏️ <span className="border-b-2 border-teal-100">Post Content</span>
              </h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Post Title</label>
                <input
                  name="title"
                  required
                  placeholder="Enter an engaging title..."
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full text-lg p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Teaser / Excerpt</label>
                <textarea
                  name="teaser"
                  required
                  rows={3}
                  placeholder="A short summary to hook the reader..."
                  value={formData.teaser}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm text-gray-600 leading-relaxed text-base"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-semibold text-gray-700">Main Content</label>
                  <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">HTML / Text</span>
                </div>
                <textarea
                  name="content"
                  required
                  rows={15}
                  placeholder="Write your story here..."
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg border border-gray-300 font-mono text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-inner bg-gray-50 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Settings (Sidebar) */}
          <div className="w-full lg:w-80 space-y-6 order-1 lg:order-2">
            
            {/* Card: Publishing Settings */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm space-y-5">
              <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-3 flex items-center gap-2">
                ⚙️ <span>Settings</span>
              </h3>

              {/* Date Picker */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Publish Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-white p-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-teal-500 cursor-pointer"
                />
              </div>

              {/* Read Time Dropdown */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Read Time</label>
                <div className="relative">
                  <select
                    name="readTime"
                    required
                    value={formData.readTime}
                    onChange={handleChange}
                    className="w-full bg-white p-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-teal-500 appearance-none"
                  >
                    {READ_TIME_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Category</label>
                <input
                  name="category"
                  required
                  placeholder="e.g. Technology"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-white p-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Slug Field */}
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">URL Slug</label>
                  <button type="button" onClick={handleRegenerateSlug} className="text-xs text-teal-600 hover:underline">
                    Regenerate
                  </button>
                </div>
                <input
                  name="slug"
                  readOnly={!isEditing}
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full bg-gray-100 text-gray-500 text-xs p-2 rounded border border-gray-200 focus:outline-none"
                />
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex flex-col gap-3 sticky top-6">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white py-6 text-lg shadow-md transition-all hover:scale-[1.02]"
              >
                {loading ? <Loader2 className="animate-spin" /> : (isEditing ? 'Update Post' : 'Publish Post')}
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
                  Cancel
                </Button>
                {isEditing && (
                  <Button 
                    type="button" 
                    variant="destructive" 
                    onClick={() => setShowDeleteModal(true)} 
                    disabled={loading} 
                    className="bg-red-50 text-red-600 border-red-200"
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE STICKY ACTION BAR */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden flex gap-3 z-40">
          <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="flex-[2] bg-black text-white">
            {loading ? <Loader2 className="animate-spin" /> : (isEditing ? 'Update' : 'Publish')}
          </Button>
        </div>

      </form>

      {/* 🔴 SAFETY DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 transform transition-all scale-100">
             <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                   <AlertTriangle size={24} />
                </div>
                <div>
                   <h2 className="text-xl font-bold text-gray-900">Delete this post?</h2>
                   <p className="text-gray-500 mt-2 text-sm">
                     This action cannot be undone. This will permanently remove the post from your blog.
                   </p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full mt-2">
                   <Button 
                     variant="outline" 
                     onClick={() => setShowDeleteModal(false)}
                     disabled={loading}
                   >
                     Cancel
                   </Button>
                   <Button 
                     className="bg-red-600 hover:bg-red-700 text-white"
                     onClick={handleConfirmDelete}
                     disabled={loading}
                   >
                     {loading ? 'Deleting...' : 'Delete Forever'}
                   </Button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}