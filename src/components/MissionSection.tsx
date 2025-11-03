import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface MissionCard {
  id: number
  icon: string
  title: string
  description: string
}

const missionData: MissionCard[] = [
  {
    id: 1,
    icon: '🔪',
    title: 'Freshly-Cut After Order',
    description: 'We prepare your order after you place it. No pre-cut stock sitting in storage.'
  },
  {
    id: 2,
    icon: '❄️',
    title: 'No Frozen Stock',
    description: 'Everything delivered fresh, never frozen. Peak nutrition and taste guaranteed.'
  },
  {
    id: 3,
    icon: '👁️',
    title: 'Transparent Process',
    description: 'Customize your order and track your delivery. Full visibility from source to doorstep.'
  }
]

const MissionCard = ({ card, index }: { card: MissionCard; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
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
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="card group cursor-pointer"
    >
      <div className="text-center">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="text-5xl mb-6 inline-block"
        >
          {card.icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-navy mb-4">
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed">
          {card.description}
        </p>
      </div>
    </motion.div>
  )
}

const MissionSection = () => {
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
            The Mission — Purpose with Freshness
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our commitment to delivering the highest quality fresh food while maintaining transparency and customer choice
          </p>
        </motion.div>

        {/* Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {missionData.map((card, index) => (
            <MissionCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MissionSection