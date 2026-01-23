'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface HeroProps {
  imageSrc?: string | null;
  imageAlt?: string; 
}

const Hero = ({ imageSrc, imageAlt = "Jamanudeen P - Founder" }: HeroProps) => {
  const [imageError, setImageError] = useState(false)
  const defaultImage = "/images/founder.png"
  const finalImage = (!imageSrc || imageError) ? defaultImage : imageSrc;

  const scrollToTimeline = () => {
    const element = document.getElementById('timeline')
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

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
      className="relative min-h-[100svh] lg:h-screen flex items-center justify-center overflow-hidden pt-20 pb-32 lg:py-0 bg-[#020617]"
    >
      {/* --- PREMIUM BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Deep Mesh Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[#03D6C4]/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[120px]" />
        
        {/* Cinematic Grain/Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Subtle Grid for Tech Feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* IMAGE BLOCK - With Glassmorphism */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end w-full order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-[280px] h-[280px] md:w-[440px] md:h-[440px] group">
              {/* Outer Glow Ring */}
              <div className="absolute inset-[-20px] bg-[#03D6C4]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-[#03D6C4] via-cyan-400 to-blue-600 opacity-40 shadow-2xl shadow-[#03D6C4]/20"
                animate={blobAnimation}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.div
                className="absolute inset-[8px] overflow-hidden z-10 bg-slate-900 border border-white/10"
                animate={blobAnimation}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={finalImage} 
                  alt={imageAlt}
                  fill
                  className="object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                  priority
                  onError={() => setImageError(true)}
                />
                {/* Image Inner Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              </motion.div>
            </div>
          </motion.div>

          {/* TEXT CONTENT */}
          <motion.div
            className="flex-1 text-center lg:text-left w-full order-2 lg:order-1"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#03D6C4]/10 border border-[#03D6C4]/20 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-[#03D6C4] animate-ping" />
              <span className="text-[#03D6C4] text-[10px] font-bold uppercase tracking-[0.3em]">The Founder&apos;s Vision</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.85]">
              Meet <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                Jamanudeen
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Redefining Indian food systems through <span className="text-white">chemical-free innovation</span> and coastal integrity.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <button
                onClick={scrollToTimeline}
                className="px-10 py-4 bg-[#03D6C4] text-[#020617] font-bold rounded-2xl hover:scale-105 hover:shadow-[0_0_30px_rgba(3,214,196,0.4)] transition-all active:scale-95"
              >
                Explore Journey
              </button>
              <Link
                href="/blog"
                className="px-10 py-4 border border-white/10 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all backdrop-blur-md flex items-center justify-center gap-2 group"
              >
                Read Blog
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- PROFESSIONAL BOTTOM FADE --- */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        <div className="h-48 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
        <div className="h-12 bg-[#020617]" />
      </div>
    </section>
  )
}

export default Hero