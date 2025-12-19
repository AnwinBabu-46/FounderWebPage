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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Scroll detection for navbar color change
  useEffect(() => {
    if (pathname !== '/') {
      setIsScrolled(true)
      return
    }

    const handleScroll = () => {
      const heroSection = document.getElementById('home')
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        // Switch to solid background earlier - when hero is mostly out of view OR when scrolled past a certain point
        setIsScrolled(rect.bottom < 200 || window.scrollY > 300)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // IntersectionObserver - SINGLE SOURCE OF TRUTH
  useEffect(() => {
    if (pathname !== '/') return

    let lastScrollY = window.scrollY

    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -50% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY
      lastScrollY = currentScrollY

      let mostVisibleEntry: IntersectionObserverEntry | undefined
      let maxVisibilityScore = 0

      for (const entry of entries) {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect
          const viewportHeight = window.innerHeight
          
          const visibleTop = Math.max(rect.top, 0)
          const visibleBottom = Math.min(rect.bottom, viewportHeight)
          const visibleHeight = Math.max(0, visibleBottom - visibleTop)
          
          // Pure visibility - no bias
          const visibilityScore = visibleHeight / Math.min(rect.height, viewportHeight)
          
          // Direction-aware exclusion: exclude Home when scrolling down and visibility < 30%
          const targetElement = entry.target as HTMLElement
          const isHomeSection = targetElement.id === 'home'
          const shouldExcludeHome = isHomeSection && isScrollingDown && visibilityScore < 0.3
          
          if (!shouldExcludeHome && visibilityScore > maxVisibilityScore) {
            maxVisibilityScore = visibilityScore
            mostVisibleEntry = entry
          }
        }
      }

      // ONLY place activeSection is written
      if (mostVisibleEntry) {
        const targetElement = mostVisibleEntry.target as HTMLElement
        const newActiveSection = `#${targetElement.id}`
        
        setActiveSection((prev) => {
          if (prev !== newActiveSection) {
            return newActiveSection
          }
          return prev
        })
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe ALL sections including home
    const sectionIds = ['home', 'timeline', 'contact']
    
    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    // Let observer determine initial state - no URL override

    return () => {
      observer.disconnect()
    }
  }, [pathname])

  // URL synchronization - separate from observer logic
  useEffect(() => {
    if (pathname === '/' && activeSection && window.history.replaceState) {
      window.history.replaceState(null, '', activeSection)
    }
  }, [activeSection, pathname])

  // Simple active tab calculation
  const activeTab = useMemo(() => {
    // Route-based override for non-home pages
    if (pathname !== '/') {
      const exactMatch = items.find(item => item.url === pathname)
      if (exactMatch) return exactMatch.name
      
      // Blog page
      if (pathname.startsWith('/blog')) {
        return items.find(item => item.url === '/blog')?.name || 'Blog'
      }
    }
    
    // Home page: direct hash mapping
    if (pathname === '/') {
      const hashMatch = items.find(item => item.url === activeSection)
      if (hashMatch) return hashMatch.name
      
      // Fallback to Home
      return items.find(item => item.url === '#home')?.name || 'Home'
    }
    
    return items[0]?.name || 'Home'
  }, [pathname, activeSection, items])
  
  // Handle navigation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (url.startsWith('#')) {
      if (pathname !== '/') {
        e.preventDefault()
        window.location.href = `/${url}`
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
            ? "bg-white border-gray-200"
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
              scroll={!item.url.startsWith('#') || pathname === '/'}
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
