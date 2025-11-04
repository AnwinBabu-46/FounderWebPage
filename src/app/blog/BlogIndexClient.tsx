'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { blogPostsSummarySorted } from '../../data/blogPosts'
import type { BlogPostSummary } from '../../types'
import Footer from '../../components/Footer/Footer'

const POSTS_PER_PAGE = 9

interface BlogCardProps {
  post: BlogPostSummary
  index: number
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const variants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="card h-full cursor-pointer group w-full">
          {/* Category badge */}
          <div className="mb-3 sm:mb-4">
            <span className="inline-block px-2.5 sm:px-3 py-1 bg-leaf-green/10 text-leaf-green text-xs sm:text-sm font-medium rounded-full border border-leaf-green/20">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-dark-blue mb-2 sm:mb-3 group-hover:text-leaf-green transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Teaser */}
          <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed flex-grow line-clamp-3">
            {post.teaser}
          </p>

          {/* Date and read time */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 text-xs sm:text-sm text-gray-600">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>

          {/* Read more link */}
          <div className="mt-3 sm:mt-4 text-leaf-green font-medium group-hover:text-dark-blue transition-colors text-sm sm:text-base">
            Read More →
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function BlogIndexClient() {
  const [currentPage, setCurrentPage] = useState(1)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Ensure blogPostsSummarySorted exists and is an array
  if (!blogPostsSummarySorted || !Array.isArray(blogPostsSummarySorted)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No blog posts available.</p>
        </div>
      </div>
    )
  }

  const totalPosts = blogPostsSummarySorted.length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = blogPostsSummarySorted.slice(startIndex, endIndex)

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <main className="min-h-screen bg-white">
        <section className="py-12 sm:py-16 md:py-20 lg:py-32" ref={ref}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-blue mb-4 sm:mb-6">
                Reflections & Insights
              </h1>
              <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-2">
                Thoughts on entrepreneurship, sustainability, and building a business that truly serves people
              </p>
            </motion.div>

            {/* Blog Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-12">
              {currentPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-center justify-center space-y-3 sm:space-y-4"
              >
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-dark-blue text-white hover:bg-dark-blue/90 hover:scale-105 active:scale-95'
                    }`}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} className="sm:w-5 sm:h-5 inline" />
                  </button>

                  {/* Page Numbers */}
                  <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage =
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)

                      if (!showPage) {
                        // Show ellipsis
                        if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <span key={page} className="px-1 sm:px-2 text-gray-400 text-sm">
                              ...
                            </span>
                          )
                        }
                        return null
                      }

                      return (
                        <button
                          key={page}
                          onClick={() => handlePageClick(page)}
                          className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg font-medium transition-all duration-200 ${
                            currentPage === page
                              ? 'bg-leaf-green text-white'
                              : 'bg-white text-dark-blue border-2 border-dark-blue hover:bg-leaf-green hover:text-white hover:border-leaf-green'
                          }`}
                          aria-label={`Go to page ${page}`}
                          aria-current={currentPage === page ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      )
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-dark-blue text-white hover:bg-dark-blue/90 hover:scale-105 active:scale-95'
                    }`}
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} className="sm:w-5 sm:h-5 inline" />
                  </button>
                </div>

                {/* Page Info */}
                <p className="text-xs sm:text-sm text-gray-600 text-center px-4">
                  Showing {startIndex + 1}-{Math.min(endIndex, totalPosts)} of {totalPosts} posts
                </p>
              </motion.div>
            )}

            {/* Back to Home Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mt-8 sm:mt-12"
            >
              <Link
                href="/"
                className="inline-flex items-center text-sm sm:text-base text-dark-blue hover:text-leaf-green transition-colors font-medium"
              >
                <ChevronLeft size={18} className="sm:w-5 sm:h-5 mr-2" />
                Back to Home
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

