import { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import BlogSearch from '@/components/Blog/BlogSearch'; 
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight, Home, Menu } from 'lucide-react';

// ✅ Force dynamic rendering ensures fresh data on every visit
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Blog - Reflections & Insights | Jamanudeen P',
  description: 'Thoughts on entrepreneurship, sustainability, and building a business that truly serves people',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; q?: string };
}) {
  // 1. Parse Params
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const searchQuery = searchParams.q || '';
  const limit = 9;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // 2. Build Query
  let query = supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false })
    .range(from, to);

  // 3. Apply Search Filter if exists
  if (searchQuery) {
    query = query.ilike('title', `%${searchQuery}%`);
  }

  // 4. Fetch Data
  const { data: posts, count } = await query;

  // 5. Pagination Logic
  const totalPosts = count || 0;
  const totalPages = Math.ceil(totalPosts / limit);
  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  return (
    <>
      {/* Navbar - Consistent with Landing Page */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-neutral-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#0D9488] tracking-tight flex items-center gap-2">
            Jamanudeen P
          </Link>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="/" className="text-slate-600 hover:text-[#0D9488] transition-colors">Home</Link>
            <Link href="/#timeline" className="text-slate-600 hover:text-[#0D9488] transition-colors">Journey</Link>
            <Link href="/#mission" className="text-slate-600 hover:text-[#0D9488] transition-colors">Mission</Link>
            <Link href="/blog" className="text-[#0D9488]">Blog</Link>
            <Link href="/#contact" className="bg-[#0D9488] text-white px-5 py-2.5 rounded-full hover:bg-[#0B7C72] transition-colors shadow-sm hover:shadow-md">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Icon (Placeholder) */}
          <div className="md:hidden">
             <Link href="/" className="p-2 text-slate-600">
               <Home size={24} />
             </Link>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-4">
              The Journey
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Reflections & <span className="text-[#0D9488]">Insights</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Deep dives into entrepreneurship, sustainable food systems, and the lessons learned building My Azli Fresh.
            </p>
            
            {/* Search Bar Component */}
            <BlogSearch />
          </div>
        </section>

        {/* Blog Grid Section */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            
            {/* Loading / Empty State */}
            {!posts || posts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 max-w-3xl mx-auto">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No articles found</h3>
                {/* 👇 FIXED LINE: Used HTML Entities for quotes */}
                <p className="text-slate-500 mb-6">We couldn&apos;t find any posts matching &quot;{searchQuery}&quot;.</p>
                <Link href="/blog" className="text-[#0D9488] font-medium hover:underline inline-flex items-center gap-2">
                  <ChevronLeft size={16} /> Clear search filters
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article 
                    key={post.id} 
                    className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#0D9488]/30 group h-full"
                  >
                    <Link href={`/blog/${post.slug}`} className="flex flex-col h-full p-6 sm:p-8">
                      {/* Top Meta */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider rounded-full">
                          {post.category || 'General'}
                        </span>
                        <div className="flex items-center text-slate-400 text-xs">
                          <Clock size={14} className="mr-1" />
                          {post.read_time || '5 min read'}
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#0D9488] transition-colors leading-tight">
                        {post.title}
                      </h3>
                      
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 flex-grow line-clamp-3">
                        {post.excerpt || post.teaser}
                      </p>

                      {/* Footer Meta */}
                      <div className="pt-6 mt-auto border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center text-slate-500 text-xs font-medium">
                          <Calendar size={14} className="mr-1.5" />
                          {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : 'Date unavailable'}
                        </div>
                        <span className="flex items-center text-[#0D9488] font-bold text-sm group-hover:translate-x-1 transition-transform">
                          Read Story <ArrowRight size={16} className="ml-1" />
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-4">
                {hasPrevious ? (
                  <Link 
                    href={`/blog?page=${page - 1}${searchQuery ? `&q=${searchQuery}` : ''}`}
                    className="flex items-center px-6 py-3 bg-white border border-gray-200 text-slate-700 rounded-full hover:bg-slate-50 hover:border-[#0D9488] transition-all shadow-sm font-medium"
                  >
                    <ChevronLeft size={18} className="mr-2" /> Previous
                  </Link>
                ) : (
                  <button disabled className="flex items-center px-6 py-3 bg-gray-50 border border-gray-100 text-gray-400 rounded-full cursor-not-allowed opacity-50">
                    <ChevronLeft size={18} className="mr-2" /> Previous
                  </button>
                )}

                <span className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                  Page {page} of {totalPages}
                </span>

                {hasNext ? (
                  <Link 
                    href={`/blog?page=${page + 1}${searchQuery ? `&q=${searchQuery}` : ''}`}
                    className="flex items-center px-6 py-3 bg-white border border-gray-200 text-slate-700 rounded-full hover:bg-slate-50 hover:border-[#0D9488] transition-all shadow-sm font-medium"
                  >
                    Next <ChevronRight size={18} className="ml-2" />
                  </Link>
                ) : (
                  <button disabled className="flex items-center px-6 py-3 bg-gray-50 border border-gray-100 text-gray-400 rounded-full cursor-not-allowed opacity-50">
                    Next <ChevronRight size={18} className="ml-2" />
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#0D9488]">Jamanudeen P</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
            Building sustainable food systems and empowering communities through My Azli Fresh.
          </p>
          <div className="flex justify-center space-x-6 mb-8 text-sm font-medium">
             <Link href="/" className="hover:text-[#0D9488] transition-colors">Home</Link>
             <Link href="/blog" className="hover:text-[#0D9488] transition-colors">Blog</Link>
             <Link href="/#contact" className="hover:text-[#0D9488] transition-colors">Contact</Link>
          </div>
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} My Azli Fresh. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}