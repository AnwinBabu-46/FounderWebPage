'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { blogPostsSummarySorted } from '../../data/blogPosts'
import type { BlogPostSummary } from '../../types'

const BlogCard = ({ post, index }: { post: BlogPostSummary; index: number }) => {
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

const BlogSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-blue mb-4 sm:mb-6">
            Reflections & Insights
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-2">
            Thoughts on entrepreneurship, sustainability, and building a business that truly serves people
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {blogPostsSummarySorted.slice(0, 3).map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* View all posts button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link href="/blog" className="btn-primary inline-block">
            View All Posts
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default BlogSection

