import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
  const scrollToTimeline = () => {
    const element = document.getElementById('timeline')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center text-gradient relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-dark-blue mb-6">
            Jamanudeen P
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-8">
            Founder, My Azli Fresh
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '100%' }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="overflow-hidden"
        >
          <h3 className="text-xl md:text-2xl font-medium text-navy mb-6 leading-relaxed">
            Transforming how fresh, chemical-free food reaches Indian families
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-lg md:text-xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto">
            From coastal roots to urban innovation — a journey redefining freshness and purpose
          </p>
        </motion.div>

        <motion.button
          onClick={scrollToTimeline}
          className="bounce-slow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronDown
            size={32}
            className="text-navy cursor-pointer hover:text-navy/80 transition-colors"
          />
        </motion.button>
      </div>
    </section>
  )
}

export default Hero