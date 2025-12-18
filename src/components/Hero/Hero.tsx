'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const Hero = () => {
  const [imageError, setImageError] = useState(false)

  const scrollToTimeline = () => {
    const element = document.getElementById('timeline')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 pt-20 sm:pt-0 hero-gradient-bg"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-light rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary-light rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text Content - Left Side (Desktop) / Top (Mobile) */}
        <motion.div
            className="flex-1 text-center lg:text-left w-full lg:w-auto"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
            {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center justify-center lg:justify-start gap-2 mb-4"
        >
              <span className="text-white text-lg sm:text-xl font-medium">Hello.</span>
              <span className="w-2 h-2 rounded-full bg-[#03D6C4]"></span>
        </motion.div>

            {/* Accent Line */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '100%' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 mb-6 max-w-[80px] mx-auto lg:mx-0"
              style={{ backgroundColor: '#03D6C4' }}
            />

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3"
            >
              I&apos;m Jamanudeen
            </motion.h1>

            {/* Role */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Founder  My Azli Fresh
            </motion.h2>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-white mb-4 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Transforming how chemical free,fresh food reaches Indian families.
            </motion.p>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm sm:text-base md:text-lg text-white mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              From coastal roots to urban innovation a journey redefining freshness & purpose.
            </motion.p>

            {/* CTA Buttons */}
        <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={scrollToTimeline}
                className="px-8 py-3 font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto bg-[#03D6C4] text-white"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#02B6A5'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#03D6C4'
                }}
              >
                About Journey
              </button>
              <Link
                href="/blog"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95 text-center w-full sm:w-auto"
              >
                Read Blog
              </Link>
            </motion.div>
        </motion.div>

          {/* Image Content - Right Side (Desktop) / Top (Mobile) */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]">
              {/* Glowing Ring */}
              <div className="absolute inset-0 rounded-full hero-glow-ring"></div>
              
              {/* Founder Image with Circular Frame */}
              <div 
                className="relative w-full h-full rounded-full z-10"
                style={{
                  backgroundColor: '#FAFAFA',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '10px'
                }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  {!imageError ? (
                    <Image
                      src="/images/founder.png"
                      alt="Jamanudeen P - Founder of My Azli Fresh"
                      fill
                      className="object-cover rounded-full"
                      priority
                      sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 500px"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-medium to-primary-light flex items-center justify-center rounded-full">
                      <span className="text-text-on-primary text-4xl sm:text-5xl md:text-6xl font-bold">JP</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Decorative arrows */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden lg:block">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-white/30">
                  <path d="M25 10L15 20L25 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden lg:block">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-white/30">
                  <path d="M15 10L25 20L15 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero

