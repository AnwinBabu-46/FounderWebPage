'use client'

import { motion, useScroll, useTransform, useInView as useInViewMotion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useMemo, useRef } from 'react'

type JourneyItem = {
  title: string
  content: JSX.Element
  position: 'left' | 'right'
}

const data: JourneyItem[] = [
  {
    title: 'Early Life & Coastal Roots',
    content: (
      <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base mb-8">
        Born in a rural coastal region of South India, Jamanudeen P grew up around fisheries and the local seafood trade — the foundation of his lifelong connection to the ocean.
      </p>
    ),
    position: 'left',
  },
  {
    title: 'Export Career — 16+ Years in Seafood',
    content: (
      <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base mb-8">
        Spent over 16 years in the seafood export business, working with global supply chains that connected India’s coastlines to Los Angeles, Dubai, the UAE, and London. Built deep expertise in cold chain logistics and quality management.
      </p>
    ),
    position: 'right',
  },
  {
    title: 'Supply Chain Expertise',
    content: (
      <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base mb-8">
        Developed mastery in export operations — from sourcing and cold storage to transportation and delivery. Learned the power of consistency and transparency in perishable logistics.
      </p>
    ),
    position: 'left',
  },
  {
    title: 'Turning Point — Founding My Azli Fresh',
    content: (
      <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base mb-8">
        Transitioned from exporter to entrepreneur — founding My Azli Fresh to bring fresh, chemical-free seafood directly to urban families through a D2C model.
      </p>
    ),
    position: 'right',
  },
  {
    title: 'Building a Purpose-Driven Brand',
    content: (
      <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base mb-8">
        My Azli Fresh isn’t just about delivery — it’s about worker welfare, customer trust, and making transparency a core part of the food ecosystem.
      </p>
    ),
    position: 'left',
  },
]

const TimelineCard = ({ item, index }: { item: JourneyItem; index: number }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        x: item.position === 'left' ? -50 : 50,
        scale: 0.98,
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          delay: index * 0.1,
          ease: 'easeOut',
        },
      },
    }),
    [index, item.position]
  )

  return (
    <div className="relative flex items-center md:justify-center">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        className={`w-full md:w-5/12 ${item.position === 'left' ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8 md:text-left'}`}
      >
        <div className="timeline-card relative">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-heading-text dark:text-white mb-2 sm:mb-3">
            {item.title}
          </h3>
          {item.content}
        </div>
      </motion.div>

      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full z-30 bg-[#00e5b7] dark:bg-[#14B8A6]" />
    </div>
  )
}

const Timeline = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewMotion(ref, { once: true, amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="timeline" className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white dark:bg-black" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A0F1C] dark:text-white mb-4 sm:mb-6">
            Founder's Journey
          </h2>
          <p className="text-base sm:text-lg text-[#334155] dark:text-neutral-300 max-w-3xl mx-auto px-2">
            A path shaped by experience, purpose, and the vision to bring quality fresh food to every Indian family
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-[3px] h-full overflow-hidden">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full origin-top bg-gradient-to-b from-[#00b8c4] via-[#00e5b7] to-[#aaffc6] dark:from-[#0D9488] dark:to-[#14B8A6]"
            />
          </div>

          <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20">
            {data.map((item, index) => (
              <TimelineCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline

