import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface TimelineItem {
  id: number
  title: string
  description: string
  icon: string
  position: 'left' | 'right'
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: 'Coastal Roots',
    description: 'Born in a rural coastal town, Jamanudeen\'s early exposure to fisheries shaped his understanding of sourcing and freshness.',
    icon: '📍',
    position: 'left'
  },
  {
    id: 2,
    title: 'Export Expertise',
    description: '12+ years in seafood export built the foundation for quality control, supply chain, and trust.',
    icon: '🐟',
    position: 'right'
  },
  {
    id: 3,
    title: 'The Turning Point',
    description: 'Seeing the gap between export quality and local consumer experience inspired the birth of My Azli Fresh.',
    icon: '💡',
    position: 'left'
  },
  {
    id: 4,
    title: 'Founding My Azli Fresh (2023)',
    description: 'A D2C venture built to deliver fish and perishables with freshness, customization, and hygiene.',
    icon: '🚚',
    position: 'right'
  },
  {
    id: 5,
    title: 'Work & Explore Initiative',
    description: 'Empowering workers and migrants through purpose-driven employment and education.',
    icon: '🤝',
    position: 'left'
  },
  {
    id: 6,
    title: 'Future Vision',
    description: 'Scaling across India and GCC with sustainable sourcing and tech-backed cold-chain innovation.',
    icon: '🌟',
    position: 'right'
  }
]

const TimelineItem = ({ item, index }: { item: TimelineItem; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const variants = {
    hidden: {
      opacity: 0,
      x: item.position === 'left' ? -50 : 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut'
      }
    }
  }

  const arrowDirection = item.position === 'left' ? '↘' : '↙'

  return (
    <div className="relative flex items-center mb-16 md:mb-20">
      {/* Arrow indicator */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-3xl text-navy z-20">
        {arrowDirection}
      </div>

      {/* Timeline card */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        className={`w-full md:w-5/12 ${item.position === 'left' ? 'md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'}`}
      >
        <div className="timeline-card relative">
          {/* Number indicator */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 md:left-auto md:right-4 md:top-4 md:transform-none">
            <div className="w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center font-bold text-sm">
              {item.id}
            </div>
          </div>

          {/* Icon */}
          <div className="text-4xl mb-4 md:mb-6">{item.icon}</div>

          {/* Content */}
          <h3 className="text-xl md:text-2xl font-bold text-navy mb-3">
            {item.title}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {item.description}
          </p>
        </div>
      </motion.div>

      {/* Center dot for desktop */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-navy rounded-full z-30"></div>
    </div>
  )
}

const Timeline = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="timeline" className="py-20 md:py-32 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            Founder's Journey
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            A path shaped by experience, purpose, and the vision to bring quality fresh food to every Indian family
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-navy/30"></div>

          {/* Timeline items */}
          <div className="space-y-0">
            {timelineData.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline