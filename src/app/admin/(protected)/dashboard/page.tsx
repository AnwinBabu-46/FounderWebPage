import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import ProfileImageManager from '@/components/Admin/ProfileImageManager';
import { FileText, Plus, ExternalLink, LayoutDashboard } from 'lucide-react';

// ✅ CRITICAL: Force the page to never cache so the count is always real-time
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
  
  // 1. Fetch Real Blog Count from Supabase
  // { count: 'exact', head: true } asks Supabase for just the number, not the data
  const { count } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
             <LayoutDashboard className="text-teal-600" /> Dashboard
          </h1>
          <p className="text-gray-500 mt-2">Welcome back to your content command center.</p>
        </div>
        <Link 
          href="/" 
          target="_blank"
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black bg-white px-4 py-2 rounded-full border shadow-sm transition-all hover:shadow-md"
        >
          View Live Site <ExternalLink size={14} />
        </Link>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Stats & Quick Actions (Spans 2 columns) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Stats Card */}
          <div className="bg-gradient-to-br from-black to-gray-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-gray-300 font-medium flex items-center gap-2">
                <FileText size={20} /> Total Published Blogs
              </h3>
              <p className="text-6xl font-bold mt-4 tracking-tight">{count || 0}</p>
              <p className="text-gray-400 mt-2 text-sm">Keep writing to grow your audience!</p>
            </div>
            {/* Decorative Background Element */}
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10 group-hover:scale-110 transition-transform duration-500">
              <FileText size={200} />
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <Link href="/admin/blog/new" className="group">
                <div className="p-4 rounded-xl border border-gray-200 hover:border-teal-500 hover:bg-teal-50/50 transition-all cursor-pointer h-full">
                  <div className="w-10 h-10 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Plus size={20} />
                  </div>
                  <h3 className="font-bold text-gray-900">Create New Blog</h3>
                  <p className="text-sm text-gray-500 mt-1">Write and publish a new story.</p>
                </div>
              </Link>

              <Link href="/admin/blog" className="group">
                <div className="p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer h-full">
                  <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FileText size={20} />
                  </div>
                  <h3 className="font-bold text-gray-900">Manage Blogs</h3>
                  <p className="text-sm text-gray-500 mt-1">Edit or delete existing blogs.</p>
                </div>
              </Link>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Profile Manager */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full overflow-hidden">
             {/* This component handles the image upload & cropping */}
             <ProfileImageManager />
          </div>
        </div>

      </div>
    </div>
  );
}