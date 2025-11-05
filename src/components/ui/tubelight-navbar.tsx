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
  const [hash, setHash] = useState<string>('')
  const [activeSection, setActiveSection] = useState<string>('')
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
        // Check if hero section is out of view (scrolled past)
        setIsScrolled(rect.bottom < 100)
      }
    }

    handleScroll() // Check initial state
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // IntersectionObserver for scroll-based active section detection
  useEffect(() => {
    if (pathname !== '/') return // Only run on home page

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is 20% from top
      threshold: [0, 0.25, 0.5, 0.75, 1]
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the section that's most visible
      let maxIntersection = 0
      let activeId = ''

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxIntersection) {
          maxIntersection = entry.intersectionRatio
          activeId = entry.target.id
        }
      })

      if (activeId) {
        setActiveSection(`#${activeId}`)
        // Update URL hash without scrolling
        if (window.history.replaceState) {
          window.history.replaceState(null, '', `#${activeId}`)
        }
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections with IDs
    const sections = ['home', 'timeline', 'contact']
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    // Also check initial hash
    if (window.location.hash) {
      setActiveSection(window.location.hash)
    } else {
      // Default to home section if at top of page
      const heroSection = document.getElementById('home')
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        if (rect.top >= 0 && rect.top < window.innerHeight * 0.5) {
          setActiveSection('#home')
        }
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [pathname])

  // Listen for hash changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHash(window.location.hash)
      
      const handleHashChange = () => {
        setHash(window.location.hash)
        if (window.location.hash) {
          setActiveSection(window.location.hash)
        }
      }
      
      window.addEventListener('hashchange', handleHashChange)
      // Also listen for popstate (back/forward navigation)
      window.addEventListener('popstate', handleHashChange)
      
      return () => {
        window.removeEventListener('hashchange', handleHashChange)
        window.removeEventListener('popstate', handleHashChange)
      }
    }
  }, [pathname])

  // Memoize active tab calculation to prevent unnecessary re-renders
  const activeTab = useMemo(() => {
    // Check exact match first (for routes like /blog)
    const exactMatch = items.find(item => item.url === pathname)
    if (exactMatch) return exactMatch.name
    
    // For hash links, check if we're on home page
    if (pathname === '/') {
      // Use activeSection from IntersectionObserver if available
      const currentHash = activeSection || hash || (typeof window !== 'undefined' ? window.location.hash : '')
      
      // If we're at home section (no hash or #home), highlight Home nav item
      if (!currentHash || currentHash === '#home') {
        const homeItem = items.find(item => item.url === '/')
        if (homeItem) return homeItem.name
      }
      
      // Check for other hash matches
      if (currentHash) {
        const hashMatch = items.find(item => item.url === currentHash)
        if (hashMatch) return hashMatch.name
      }
      
      // Default to Home on home page
      return items[0].name
    }
    
    // For blog page
    if (pathname.startsWith('/blog')) {
      return items.find(item => item.url === '/blog')?.name || items[0].name
    }
    
    // Default to first item
    return items[0].name
  }, [pathname, hash, activeSection, items])
  
  // Handle hash navigation - if on different page, navigate to home first
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (url.startsWith('#')) {
      // Hash link - navigate to home first if not already there
      if (pathname !== '/') {
        e.preventDefault()
        // Use router to navigate, then scroll after navigation
        const targetId = url.substring(1) // Remove # from hash
        window.location.href = `/${url}`
        // Scroll will happen after navigation via browser default behavior
      }
      // If already on home, let default behavior handle scroll
    }
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className,
      )}
    >
      <div 
        className={cn(
          "flex items-center gap-1 sm:gap-2 md:gap-3 border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg transition-all duration-300",
          isScrolled 
            ? "bg-white border-gray-200" 
            : "bg-gradient-to-r from-[#03D6C4]/20 to-[#5CF4A2]/20 border-[#03D6C4]/30"
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
                isActive && (isScrolled ? "bg-gray-100 text-[#03D6C4]" : "bg-white/20 text-white"),
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
                    "absolute inset-0 w-full rounded-full -z-10",
                    isScrolled ? "bg-[#03D6C4]/10" : "bg-white/20"
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
                      "absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full",
                      isScrolled ? "bg-[#03D6C4]" : "bg-white"
                    )}
                  >
                    <div className={cn(
                      "absolute w-12 h-6 rounded-full blur-md -top-2 -left-2",
                      isScrolled ? "bg-[#03D6C4]/20" : "bg-white/30"
                    )} />
                    <div className={cn(
                      "absolute w-8 h-6 rounded-full blur-md -top-1",
                      isScrolled ? "bg-[#03D6C4]/20" : "bg-white/30"
                    )} />
                    <div className={cn(
                      "absolute w-4 h-4 rounded-full blur-sm top-0 left-2",
                      isScrolled ? "bg-[#03D6C4]/20" : "bg-white/30"
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

