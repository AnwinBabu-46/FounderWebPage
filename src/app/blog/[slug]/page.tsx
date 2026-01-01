import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import { ReadingProgress, ShareButtons } from '@/components/Blog/ArticleInteractive';

// ✅ Force dynamic to ensure fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// 1. Generate Metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: post } = await supabase
    .from('posts')
    .select('title, excerpt')
    .eq('slug', params.slug)
    .single();

  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} - Jamanudeen P`,
    description: post.excerpt || 'Read this article on Jamanudeen P blog.',
  };
}

// 2. Main Page Component
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  
  // Fetch Data from Supabase
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!post) notFound();

  // Calculate Read Time if missing
  const readTime = post.read_time || `${Math.max(1, Math.ceil((post.content?.split(' ').length || 0) / 200))} min read`;

  // Format Date
  const date = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      {/* 🟢 Interactive Reading Bar */}
      <ReadingProgress />

      {/* Navbar (Simplified for Reading Mode) */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/blog" className="flex items-center text-sm font-medium text-slate-600 hover:text-[#0D9488] transition-colors group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Back to Blog
          </Link>
          <Link href="/" className="text-lg font-bold text-[#0D9488]">Jamanudeen P</Link>
        </div>
      </nav>

      <main className="min-h-screen bg-white">
        
        {/* HERO HEADER */}
        <header className="pt-12 pb-10 sm:pt-20 sm:pb-16 px-4 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto max-w-3xl text-center">
            
            <div className="mb-6 flex items-center justify-center gap-2">
              <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider rounded-full border border-teal-100">
                {post.category || 'Article'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-slate-500 text-sm font-medium">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-[#0D9488]" />
                {date}
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2 text-[#0D9488]" />
                {readTime}
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-2 text-[#0D9488]" />
                Jamanudeen P
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="container mx-auto px-4 sm:px-6 relative">
          
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 max-w-5xl mx-auto">
            
            {/* ⬅️ LEFT: Sticky Share Bar (Desktop) */}
            <aside className="hidden md:block w-16 flex-shrink-0">
              <div className="sticky top-24">
                <ShareButtons title={post.title} slug={post.slug} />
              </div>
            </aside>

            {/* 📄 CENTER: Article Content */}
            <article className="flex-1 max-w-3xl mx-auto pb-24">
              
              {/* Teaser Block */}
              {post.excerpt && (
                <div className="text-xl sm:text-2xl text-slate-600 font-medium leading-relaxed mb-10 border-l-4 border-[#0D9488] pl-6 italic bg-slate-50 py-4 rounded-r-lg">
                  {post.excerpt}
                </div>
              )}

              {/* Main HTML Content */}
              <div 
                className="prose prose-lg sm:prose-xl prose-slate max-w-none 
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 
                  prose-p:text-slate-600 prose-p:leading-8 
                  prose-a:text-[#0D9488] prose-a:no-underline hover:prose-a:underline 
                  prose-strong:text-slate-900 prose-strong:font-bold
                  prose-ul:list-disc prose-ul:pl-6 prose-li:text-slate-600
                  prose-blockquote:border-l-[#0D9488] prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:italic
                  prose-img:rounded-2xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Mobile Share Bar (Fixed Bottom) */}
              <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 shadow-xl rounded-full">
                <ShareButtons title={post.title} slug={post.slug} />
              </div>

            </article>

            {/* ➡️ RIGHT: Spacer for balance (optional sidebar area) */}
            <div className="hidden lg:block w-16 flex-shrink-0"></div>
          </div>
        </div>

        {/* FOOTER CTA */}
        <footer className="bg-slate-900 py-16 text-center text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#0D9488] to-transparent opacity-50"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6">Enjoyed this perspective?</h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">
              I share insights on sustainable entrepreneurship and building meaningful businesses. Connect with me for more.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="https://www.linkedin.com/in/jamanudeenp/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#0077b5] hover:bg-[#006097] text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Connect on LinkedIn
              </a>
              <Link 
                href="/blog" 
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-full font-bold transition-all backdrop-blur-sm"
              >
                Read More Articles
              </Link>
            </div>
            <p className="mt-12 text-slate-600 text-xs">
              © {new Date().getFullYear()} My Azli Fresh. All rights reserved.
            </p>
          </div>
        </footer>

      </main>
    </>
  );
}