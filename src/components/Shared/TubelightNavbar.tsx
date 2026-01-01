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
  const [isMobile, setIsMobile] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('#home')
  const [isScrolled, setIsScrolled] = useState(false)

  // 1. Resize Handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // 2. Scroll Style Handler (Changes color when scrolling)
  useEffect(() => {
    if (pathname !== '/') {
      setIsScrolled(true)
      return
    }

    const handleScroll = () => {
      // Switch to solid background as soon as user scrolls down 50px
      // This is more reliable than calculating bounding rects for the hero
      setIsScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // 3. THE FIX: IntersectionObserver with "Center Line" Logic
  useEffect(() => {
    if (pathname !== '/') return

    const observerOptions = {
      root: null,
      // This margin creates a narrow "trigger zone" in the middle of the screen.
      // The navbar updates ONLY when a section crosses this center line.
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections defined in your page
    const sectionIds = ['home', 'timeline', 'contact']
    
    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [pathname])

  // 4. URL Sync (Optional: Updates the browser URL #hash without jumping)
  useEffect(() => {
    if (pathname === '/' && activeSection) {
      // We use replaceState so it doesn't clutter the "Back" button history
      window.history.replaceState(null, '', activeSection)
    }
  }, [activeSection, pathname])

  // 5. Active Tab Logic
  const activeTab = useMemo(() => {
    // If we are on a different page (like /blog), match the URL
    if (pathname !== '/') {
      const exactMatch = items.find(item => item.url === pathname)
      return exactMatch ? exactMatch.name : items[0].name
    }
    
    // If we are on Home, use the hash we detected (#home, #timeline, etc.)
    const hashMatch = items.find(item => item.url === activeSection)
    return hashMatch ? hashMatch.name : 'Home'
  }, [pathname, activeSection, items])
  
  // 6. Smooth Scroll Click Handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (url.startsWith('#') && pathname === '/') {
      e.preventDefault()
      const element = document.querySelector(url)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6 pointer-events-none",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1 sm:gap-2 md:gap-3 border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg transition-all duration-300 pointer-events-auto",
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
                "relative cursor-pointer text-xs sm:text-sm font-semibold px-3 sm:px-4 md:px-6 py-2 rounded-full transition-colors whitespace-nowrap flex-shrink-0",
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
                <Icon size={18} strokeWidth={2.5} />
              </span>
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