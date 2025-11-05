'use client'

import Link from 'next/link'
import { ArrowLeft, Share2, Calendar, Clock } from 'lucide-react'
import { blogPostsData } from '../../../data/blogPosts'

interface BlogPostClientProps {
  slug: string
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const post = blogPostsData[slug]

  // This should never happen as page.tsx checks before rendering
  // But keeping for type safety
  if (!post) {
    return null
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: `Read "${post.title}" by Jamanudeen P`,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <article className="min-h-screen bg-neutral-white border-t-4 border-blog-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl">
        {/* Navigation */}
        <nav className="mb-6 sm:mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm sm:text-base text-heading-text hover:text-link-hover transition-colors"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5 mr-2" />
            Back to Blog
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-8 sm:mb-12">
          <div className="mb-4 sm:mb-6">
            <span className="inline-block px-2.5 sm:px-3 py-1 bg-secondary-new/10 text-primary-new text-xs sm:text-sm font-medium rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-heading-text mb-4 sm:mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 text-sm sm:text-base text-body-text/70 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:space-x-4">
              <span className="flex items-center">
                <Calendar size={14} className="sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                {post.date}
              </span>
              <span className="flex items-center">
                <Clock size={14} className="sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                {post.readTime}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center text-heading-text hover:text-link-hover transition-colors"
              aria-label="Share article"
            >
              <Share2 size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </header>

        {/* Article Content */}
        <div
          className="prose prose-sm sm:prose-base md:prose-lg max-w-none prose-navy prose-headings:text-heading-text prose-p:text-body-text prose-a:text-link-hover prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Article Footer */}
        <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t-2 border-blog-accent">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-heading-text mb-3 sm:mb-4">
              Enjoyed this article?
            </h3>
            <p className="text-sm sm:text-base text-body-text mb-4 sm:mb-6 px-2">
              Connect with me on LinkedIn or follow My Azli Fresh for more insights on entrepreneurship and sustainable food systems.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 sm:space-x-6">
              <a
                href="https://www.linkedin.com/in/jamanudeenp/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm sm:text-base"
              >
                Connect on LinkedIn
              </a>
              <Link
                href="/#contact"
                className="btn-primary text-sm sm:text-base"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </article>
  )
}

