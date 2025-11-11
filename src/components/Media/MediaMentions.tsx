'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface MediaItem {
  id: number
  publication: string
  logo: string
  title: string
  excerpt: string
  url: string
  date: string
}

const mediaData: MediaItem[] = [
  {
    id: 1,
    publication: 'The Republic News',
    logo: '',
    title: 'Explore Bangalore/Bengaluru - My Azli',
    excerpt: 'Media coverage about My Azli Fresh\'s presence and impact in Bangalore.',
    url: 'https://www.therepublicnews.co.in/2025/10/explore-bangalore-bengaluru-my-azli.html',
    date: 'October 2025'
  },
  {
    id: 2,
    publication: 'Insider News Times',
    logo: '',
    title: 'Explore Bangalore/Bengaluru - My Azli',
    excerpt: 'Coverage of My Azli Fresh\'s journey and services in Bangalore.',
    url: 'https://www.insidernewstimes.co.in/2025/10/explore-bangalore-bengaluru-my-azli.html',
    date: 'October 2025'
  },
  {
    id: 3,
    publication: 'News Today 24x7',
    logo: '',
    title: 'Explore Bangalore/Bengaluru - My Azli',
    excerpt: 'News coverage about My Azli Fresh in the Bangalore market.',
    url: 'https://www.newstoday24x7.co.in/2025/10/explore-bangalore-bengaluru-my-azli.html',
    date: 'October 2025'
  },
  {
    id: 4,
    publication: 'News Wire of India',
    logo: '',
    title: 'Explore Bangalore/Bengaluru - My Azli',
    excerpt: 'Press coverage of My Azli Fresh\'s operations in Bangalore.',
    url: 'https://www.newswireofindia.co.in/2025/10/explore-bangalore-bengaluru-my-azli.html',
    date: 'October 2025'
  }
]

const MediaCard = ({ item, index }: { item: MediaItem; index: number }) => {
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
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="card h-full cursor-pointer w-full block"
    >
      <div className="text-center">
        {/* Logo */}
        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
          {item.logo}
        </div>

        {/* Publication name */}
        <h4 className="text-xs sm:text-sm font-medium text-body-text mb-2">
          {item.publication}
        </h4>

        {/* Article title */}
        <h3 className="text-base sm:text-lg font-bold text-heading-text mb-2 sm:mb-3 line-clamp-2">
          {item.title}
        </h3>

        {/* Date */}
        <p className="text-xs sm:text-sm text-body-text/80 mb-3 sm:mb-4">
          {item.date}
        </p>

        {/* Read more link */}
        <div className="text-link-hover font-medium hover:text-primary-new transition-colors text-sm">
          Read More →
        </div>
      </div>
    </motion.a>
  )
}

const MediaMentions = () => {
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading-text mb-4 sm:mb-6">
            In the Press
          </h2>
          <p className="text-base sm:text-lg text-body-text max-w-3xl mx-auto px-2">
            Media coverage and stories about our journey, impact, and vision for the future
          </p>
        </motion.div>

        {/* Media Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {mediaData.map((item, index) => (
            <MediaCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MediaMentions

