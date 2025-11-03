import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

interface BlogPost {
  id: number
  slug: string
  title: string
  teaser: string
  date: string
  readTime: string
  category: string
}

const blogData: BlogPost[] = [
  {
    id: 1,
    slug: 'how-my-azli-fresh-was-built-on-customer-pain-points',
    title: 'How My Azli Fresh Was Built on Customer Pain Points',
    teaser: 'Understanding customer needs transformed our approach to fresh food delivery, leading to innovative solutions that truly matter.',
    date: 'October 15, 2024',
    readTime: '3 min read',
    category: 'Foundership'
  },
  {
    id: 2,
    slug: 'the-danger-of-perfectionism-in-startups',
    title: 'The Danger of Perfectionism in Startups',
    teaser: 'Perfection can be the enemy of progress. Learning when to launch imperfectly and iterate based on real feedback.',
    date: 'September 28, 2024',
    readTime: '2 min read',
    category: 'Business'
  },
  {
    id: 3,
    slug: 'sustainable-sourcing-more-than-a-buzzword',
    title: 'Sustainable Sourcing: More Than a Buzzword',
    teaser: 'Building a supply chain that not only delivers quality but also supports local communities and environmental stewardship.',
    date: 'August 12, 2024',
    readTime: '4 min read',
    category: 'Sustainability'
  }
]

const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => {
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
        <div className="card h-full cursor-pointer group">
          {/* Category badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-leaf-green/10 text-leaf-green text-sm font-medium rounded-full border border-leaf-green/20">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-navy mb-3 group-hover:text-navy/80 transition-colors">
            {post.title}
          </h3>

          {/* Teaser */}
          <p className="text-gray-700 mb-4 leading-relaxed flex-grow">
            {post.teaser}
          </p>

          {/* Date and read time */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>

          {/* Read more link */}
          <div className="mt-4 text-navy font-medium group-hover:text-navy/80 transition-colors">
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
    <section className="py-20 md:py-32 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            Reflections & Insights
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Thoughts on entrepreneurship, sustainability, and building a business that truly serves people
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {blogData.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* View all posts button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <button className="btn-primary">
            View All Posts
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default BlogSection