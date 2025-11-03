import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

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
    publication: 'LinkedIn',
    logo: '💼',
    title: 'Building My Azli Fresh: A Founder\'s Journey',
    excerpt: 'Insights on entrepreneurship and the challenges of building a fresh food delivery startup from scratch.',
    url: '#',
    date: 'October 2024'
  },
  {
    id: 2,
    publication: 'Insider News Times',
    logo: '📰',
    title: 'How One Founder is Revolutionizing Fresh Food Delivery in India',
    excerpt: 'Profile piece on My Azli Fresh\'s innovative approach to sourcing and delivering fresh seafood directly to consumers.',
    url: '#',
    date: 'September 2024'
  },
  {
    id: 3,
    publication: 'Fresh Food Weekly',
    logo: '🥗',
    title: 'Sustainability in Fresh Food: Beyond the Buzzwords',
    excerpt: 'Industry analysis of sustainable sourcing practices and their impact on the fresh food supply chain.',
    url: '#',
    date: 'August 2024'
  },
  {
    id: 4,
    publication: 'Local Business Journal',
    logo: '🏢',
    title: 'Community Impact: My Azli Fresh Creates Opportunities',
    excerpt: 'How the startup is empowering local workers and migrants through purpose-driven employment initiatives.',
    url: '#',
    date: 'July 2024'
  }
]

const MediaCard = ({ item, index }: { item: MediaItem; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isExpanded, setIsExpanded] = useState(false)

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

  const handleReadMore = () => {
    setIsExpanded(!isExpanded)
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
      className="card h-full cursor-pointer"
      onClick={handleReadMore}
    >
      <div className="text-center">
        {/* Logo */}
        <div className="text-4xl mb-4">
          {item.logo}
        </div>

        {/* Publication name */}
        <h4 className="text-sm font-medium text-gray-600 mb-2">
          {item.publication}
        </h4>

        {/* Article title */}
        <h3 className="text-lg font-bold text-navy mb-3">
          {item.title}
        </h3>

        {/* Date */}
        <p className="text-sm text-gray-500 mb-4">
          {item.date}
        </p>

        {/* Excerpt (expandable) */}
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-32' : 'max-h-0'}`}>
          <p className="text-sm text-gray-700 leading-relaxed">
            {item.excerpt}
          </p>
        </div>

        {/* Read more link */}
        <div className="text-navy font-medium hover:text-navy/80 transition-colors text-sm">
          {isExpanded ? 'Show Less' : 'Read More →'}
        </div>
      </div>
    </motion.div>
  )
}

const MediaMentions = () => {
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
            In the Press
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Media coverage and stories about our journey, impact, and vision for the future
          </p>
        </motion.div>

        {/* Media Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mediaData.map((item, index) => (
            <MediaCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MediaMentions