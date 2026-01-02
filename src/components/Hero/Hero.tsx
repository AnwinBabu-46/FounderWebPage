'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

// Define the interface for the image prop
interface HeroProps {
  imageSrc: string;
  imageAlt?: string; 
}

const Hero = ({ imageSrc, imageAlt = "Jamanudeen P - Founder" }: HeroProps) => {
  const [imageError, setImageError] = useState(false)

  const scrollToTimeline = () => {
    const element = document.getElementById('timeline')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  // Define the morphing animation values for the blob shape
  const blobAnimation = {
    borderRadius: [
      "60% 40% 30% 70% / 60% 30% 70% 40%",
      "30% 60% 70% 40% / 50% 60% 30% 60%",
      "60% 40% 30% 70% / 60% 30% 70% 40%"
    ]
  }

  return (
    <section 
      id="home"
      // CHANGE: Use 100dvh (dynamic viewport height) for stable mobile height
      className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden px-4 sm:px-6 py-12 lg:py-0 bg-slate-900 supports-[height:100cqh]:h-[100cqh]"
    >
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0a2e2b] to-slate-900 opacity-90 z-0"></div>
      
      {/* CHANGE: Adjusted blob sizes and opacity for mobile to prevent visual clutter */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -left-20 w-48 h-48 sm:w-72 sm:h-72 bg-[#03D6C4] rounded-full blur-[80px] sm:blur-[100px] opacity-20" />
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#02B6A5] rounded-full blur-[100px] sm:blur-[120px] opacity-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* CHANGE: Reduced gap from 12 to 8 on mobile to keep things compact */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-16">
          
          {/* --- TEXT CONTENT --- */}
          <motion.div
            className="flex-1 text-center lg:text-left w-full lg:w-auto"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Greeting Pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4 sm:mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#03D6C4]"></span>
              <span className="text-white text-sm font-medium tracking-wide">Hello, Welcome</span>
            </motion.div>

            {/* Name - CHANGE: Adjusted font sizes for better mobile fitting */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 tracking-tight"
            >
              I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Jamanudeen</span>
            </motion.h1>

            {/* Role */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#03D6C4] mb-4 sm:mb-6"
            >
              Founder, My Azli Fresh
            </motion.h2>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Transforming how chemical-free, fresh food reaches Indian families. 
              <br className="hidden sm:block" />
              <span className="text-gray-400 text-sm sm:text-base mt-2 block">
                From coastal roots to urban innovation—a journey redefining freshness & purpose.
              </span>
            </motion.p>

            {/* CTA Buttons - CHANGE: Full width buttons on very small screens */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto"
            >
              <button
                onClick={scrollToTimeline}
                className="px-8 py-4 font-bold rounded-xl transition-all duration-200 hover:brightness-110 active:scale-95 w-full sm:w-auto bg-[#03D6C4] text-white shadow-lg"
              >
                About Journey
              </button>
              <Link
                href="/blog"
                className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-200 active:scale-95 text-center w-full sm:w-auto"
              >
                Read Blog
              </Link>
            </motion.div>
          </motion.div>

          {/* --- NEW LIQUID BLOB IMAGE LAYOUT --- */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* CHANGE: Responsive Widths
                - w-[280px] for very small screens
                - w-[80vw] to ensure it never overflows screen width
                - capped at larger sizes for desktop
            */}
            <div className="relative w-[280px] h-[280px] xs:w-[320px] xs:h-[320px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px]">
              
              {/* 1. Gradient Border Blob */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-[#03D6C4] via-blue-500 to-[#02B6A5] opacity-60 blur-sm"
                animate={blobAnimation}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* 2. Background Glow */}
               <motion.div 
                className="absolute inset-1 bg-slate-800 z-0"
                animate={blobAnimation}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* 3. The Image Mask */}
              <motion.div
                className="absolute inset-[4px] overflow-hidden z-10"
                animate={blobAnimation}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                {!imageError ? (
                  <Image
                    src={imageSrc} 
                    alt={imageAlt}
                    fill
                    className="object-cover scale-110"
                    priority
                    // CHANGE: Updated sizes to prioritize mobile loading
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 450px, 500px"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800">
                    <span className="text-white/20 text-5xl font-bold">JP</span>
                  </div>
                )}
                
                {/* 4. Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Hero