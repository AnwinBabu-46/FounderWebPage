"use client"

import React, { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<string>('#home')
  const [isScrolled, setIsScrolled] = useState(false)

  // 1. Scroll Style Handler (Kept your original style logic)
  useEffect(() => {
    if (pathname !== '/') {
      setIsScrolled(true)
      return
    }

    const handleScroll = () => {
      // Switches to solid background after 50px scroll
      setIsScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // 2. THE FIX: Smart "Auto-Detect" Intersection Observer
  // This is what fixes the "Sticking" issue on mobile/laptop
  useEffect(() => {
    if (pathname !== '/') return

    const observerOptions = {
      root: null,
      // -45% margin means the trigger line is exactly in the middle of the screen
      // This works perfectly on Mobile AND Laptop
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Updates the active tab to match the section currently in the middle of the screen
          setActiveSection(`#${entry.target.id}`)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // DYNAMIC FIX: Instead of hardcoding ['home', 'timeline'], 
    // we find ALL sections on the page automatically.
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [pathname])

  // 3. Active Tab Logic
  const activeTab = useMemo(() => {
    if (pathname !== '/') {
      const exactMatch = items.find(item => item.url === pathname)
      return exactMatch ? exactMatch.name : items[0].name
    }
    
    // Matches the detected section to the menu item
    // If the section isn't in the menu (like "Mission"), it keeps the last valid tab
    const hashMatch = items.find(item => item.url === activeSection)
    return hashMatch ? hashMatch.name : activeSection === '#home' ? 'Home' : items.find(i => i.url === '#timeline')?.name || 'Home'
  }, [pathname, activeSection, items])
  
  // 4. Smooth Scroll Click Handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (url.startsWith('#') && pathname === '/') {
      e.preventDefault()
      const element = document.querySelector(url)
      if (element) {
        // Offset ensures the section title isn't hidden under the navbar
        const yOffset = -80; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }

  return (
    <div
      className={cn(
        // Mobile: Fixed at Bottom | Desktop: Fixed at Top
        // Changed bottom-0 to bottom-4/6 for better Mobile touch area
        "fixed bottom-4 sm:bottom-auto sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-0 sm:pt-6 pointer-events-none w-full sm:w-auto flex justify-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1 sm:gap-2 md:gap-3 border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg transition-all duration-300 pointer-events-auto",
          // YOUR ORIGINAL STYLES PRESERVED HERE
          isScrolled
            ? "bg-white/90 border-gray-200"
            : "bg-gradient-to-r from-[#00b8c4]/20 via-[#00e5b7]/20 to-[#aaffc6]/20 border-[#03D6C4]/30"
        )}
      >
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={(e) => handleNavClick(e, item.url)}
              className={cn(
                "relative cursor-pointer text-xs sm:text-sm font-semibold px-3 sm:px-4 md:px-6 py-2 rounded-full transition-colors whitespace-nowrap flex-shrink-0 flex items-center gap-2",
                isScrolled
                  ? "text-[#0A1F44] hover:text-[#03D6C4]"
                  : "text-white hover:text-[#5CF4A2]",
                isActive && (isScrolled 
                  ? "bg-gray-100 text-[#03D6C4]" 
                  : "bg-white/20 text-white"),
              )}
            >
              <span className="hidden sm:inline">{item.name}</span>
              <span className="sm:hidden">
                <Icon size={20} strokeWidth={2.5} />
              </span>
              
              {/* YOUR ORIGINAL LAMP ANIMATION CODE */}
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className={cn(
                    "absolute inset-0 w-full rounded-full -z-10 pointer-events-none",
                    isScrolled 
                      ? "bg-[#03D6C4]/10" 
                      : "bg-white/20"
                  )}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div
                    className={cn(
                      "absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full pointer-events-none",
                      isScrolled 
                        ? "bg-[#03D6C4]" 
                        : "bg-white"
                    )}
                  >
                    <div className={cn(
                      "absolute w-12 h-6 rounded-full blur-md -top-2 -left-2 pointer-events-none",
                      isScrolled 
                        ? "bg-[#03D6C4]/20" 
                        : "bg-white/30"
                    )} />
                    <div className={cn(
                      "absolute w-8 h-6 rounded-full blur-md -top-1 pointer-events-none",
                      isScrolled 
                        ? "bg-[#03D6C4]/20" 
                        : "bg-white/30"
                    )} />
                    <div className={cn(
                      "absolute w-4 h-4 rounded-full blur-sm top-0 left-2 pointer-events-none",
                      isScrolled 
                        ? "bg-[#03D6C4]/20" 
                        : "bg-white/30"
                    )} />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}