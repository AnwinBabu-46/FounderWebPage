import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPostsData, blogPostsSummary } from '@/data/blog/posts';

export async function generateStaticParams() {
  return blogPostsSummary.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPostsData[params.slug];
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Jamanudeen P`,
    description: post.teaser,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPostsData[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <>
      <article className="min-h-screen bg-white border-t-4 border-[#F59E0B] pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl">
          {/* Navigation */}
          <nav className="mb-6 sm:mb-8">
            <Link href="/blog" className="inline-flex items-center text-sm sm:text-base text-[#0F172A] hover:text-[#0EA5E9] transition-colors">
              ← Back to Blog
            </Link>
          </nav>

          {/* Article Header */}
          <header className="mb-8 sm:mb-12">
            <div className="mb-4 sm:mb-6">
              <span className="inline-block px-2.5 sm:px-3 py-1 bg-[#14B8A6]/10 text-[#0D9488] text-xs sm:text-sm font-medium rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4 sm:mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 text-sm sm:text-base text-[#334155]/70 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:space-x-4">
                <span className="flex items-center">
                  {post.date}
                </span>
                <span className="flex items-center">
                  {post.readTime}
                </span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-sm sm:prose-base md:prose-lg max-w-none prose-headings:text-[#0F172A] prose-p:text-[#334155] prose-a:text-[#0EA5E9] prose-a:no-underline hover:prose-a:underline prose-ul:text-[#334155] prose-li:text-[#334155]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Article Footer */}
          <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t-2 border-[#F59E0B]">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">
                Enjoyed this article?
              </h3>
              <p className="text-sm sm:text-base text-[#334155] mb-4 sm:mb-6 px-2">
                Connect with me on LinkedIn or follow My Azli Fresh for more insights on entrepreneurship and sustainable food systems.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 sm:space-x-6">
                <a 
                  href="https://www.linkedin.com/in/jamanudeenp/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#03D6C4] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-[#02B6A5] hover:scale-105 inline-block"
                >
                  Connect on LinkedIn
                </a>
                <Link 
                  href="/#contact" 
                  className="bg-[#03D6C4] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-[#02B6A5] hover:scale-105 inline-block"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </article>

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
