'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex-shrink-0 hidden md:block">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="p-4 space-y-2">
          <Link 
            href="/admin/dashboard" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Dashboard
          </Link>
          
          <Link 
            href="/admin/blog" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Blog Posts
          </Link>

          {/* ADDED MEDIA MENTIONS LINK HERE */}
          <Link 
            href="/admin/media" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Media Mentions
          </Link>

          <Link 
            href="/" 
            target="_blank" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            View Site
          </Link>
        </nav>
        
        <div className="p-4 border-t mt-auto">
          <Button variant="outline" onClick={handleLogout} className="w-full">
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}