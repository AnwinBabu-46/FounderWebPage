import { Metadata } from 'next';
import Link from 'next/link';
import { blogPostsSummarySorted } from '@/data/blog/posts';

export const metadata: Metadata = {
  title: 'Blog - Reflections & Insights | Jamanudeen P',
  description: 'Thoughts on entrepreneurship, sustainability, and building a business that truly serves people',
};

export default function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const limit = 9;
  const total = blogPostsSummarySorted.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = blogPostsSummarySorted.slice(startIndex, endIndex);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push({
      number: i,
      isActive: i === page,
      url: `/blog?page=${i}`
    });
  }

  const hasPrevious = page > 1;
  const hasNext = page < totalPages;
  const previousUrl = `/blog?page=${page - 1}`;
  const nextUrl = `/blog?page=${page + 1}`;

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#0D9488]">Jamanudeen P</Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-[#334155] hover:text-[#0D9488] transition-colors">Home</Link>
            <Link href="/#timeline" className="text-[#334155] hover:text-[#0D9488] transition-colors">Journey</Link>
            <Link href="/#mission" className="text-[#334155] hover:text-[#0D9488] transition-colors">Mission</Link>
            <Link href="/blog" className="text-[#0D9488] font-medium">Blog</Link>
            <Link href="/#contact" className="bg-[#03D6C4] text-white px-4 py-2 rounded-lg hover:bg-[#02B6A5] transition-colors">Contact</Link>
          </div>
          <div className="md:hidden">
            <Link href="/blog" className="text-[#0D9488] font-medium">Blog</Link>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-white border-t-4 border-[#F59E0B]">
        <section className="py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 sm:mb-6">
                Reflections & Insights
              </h1>
              <p className="text-base sm:text-lg text-[#334155] max-w-3xl mx-auto px-2">
                Thoughts on entrepreneurship, sustainability, and building a business that truly serves people
              </p>
            </div>

            {/* Blog Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-12">
              {posts.map((post) => (
                <div key={post.slug} className="rounded-lg p-6 shadow-sm transition-all duration-200 hover:shadow-md bg-white border border-teal-500/20 hover:border-[#0D9488] hover:shadow-lg h-full cursor-pointer group w-full relative">
                  <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10" />
                  {/* Category badge */}
                  <div className="mb-3 sm:mb-4 relative z-20">
                    <span className="inline-block px-2.5 sm:px-3 py-1 bg-[#14B8A6]/10 text-[#0D9488] text-xs sm:text-sm font-medium rounded-full border border-[#14B8A6]/20">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0F172A] mb-2 sm:mb-3 group-hover:text-[#0EA5E9] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Teaser */}
                  <p className="text-sm sm:text-base text-[#334155] mb-3 sm:mb-4 leading-relaxed flex-grow line-clamp-3">
                    {post.teaser}
                  </p>

                  {/* Date and read time */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 text-xs sm:text-sm text-[#334155]/70">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Read more link */}
                  <div className="mt-3 sm:mt-4 text-[#0EA5E9] font-medium group-hover:text-[#0D9488] transition-colors text-sm sm:text-base">
                    Read More →
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {/* Previous Button */}
                  {hasPrevious ? (
                    <Link href={previousUrl} className="px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium bg-[#F59E0B] text-white hover:bg-opacity-90 transition-all duration-200">
                      Previous
                    </Link>
                  ) : (
                    <span className="px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium bg-gray-200 text-gray-400 cursor-not-allowed">
                      Previous
                    </span>
                  )}

                  {/* Page Numbers */}
                  {pages.map((p) => (
                    <Link
                      key={p.number}
                      href={p.url}
                      className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg font-medium transition-all duration-200 ${
                        p.isActive
                          ? 'bg-[#F59E0B] text-white'
                          : 'bg-white text-[#0F172A] border-2 border-[#0D9488] hover:bg-[#F59E0B] hover:text-white hover:border-[#F59E0B]'
                      }`}
                    >
                      {p.number}
                    </Link>
                  ))}

                  {/* Next Button */}
                  {hasNext ? (
                    <Link href={nextUrl} className="px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium bg-[#F59E0B] text-white hover:bg-opacity-90 transition-all duration-200">
                      Next
                    </Link>
                  ) : (
                    <span className="px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium bg-gray-200 text-gray-400 cursor-not-allowed">
                      Next
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Back to Home Link */}
            <div className="text-center mt-8 sm:mt-12">
              <Link href="/" className="inline-flex items-center text-sm sm:text-base text-[#0F172A] hover:text-[#0EA5E9] transition-colors font-medium">
                ← Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0D9488] text-white py-8">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="mb-2 hover:text-[#F59E0B] cursor-default transition-colors">
              © 2024 My Azli Fresh. All rights reserved.
            </p>
            <p className="text-sm opacity-80 hover:opacity-100 hover:text-[#F59E0B] transition-colors">
              Built with passion for fresh, sustainable food delivery.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
