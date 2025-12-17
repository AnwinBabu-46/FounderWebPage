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
      rootMargin: '-10% 0px -60% 0px', // More sensitive detection
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Sort entries by their position on screen (top to bottom)
      const sortedEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => {
          const aRect = a.boundingClientRect
          const bRect = b.boundingClientRect
          return aRect.top - bRect.top
        })

      // Find the section that's most prominently visible
      let bestEntry: IntersectionObserverEntry | null = null
      let bestScore = 0

      for (const entry of sortedEntries) {
        const rect = entry.boundingClientRect
        const viewportHeight = window.innerHeight
        
        // Calculate visibility score based on how much of the section is visible
        // and how close it is to the center of the viewport
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
        const visibilityRatio = visibleHeight / Math.min(rect.height, viewportHeight)
        
        // Prefer sections that are closer to the top of the viewport
        const centerDistance = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2)
        const centerScore = 1 - (centerDistance / viewportHeight)
        
        // Combined score: visibility ratio weighted with center proximity
        const score = visibilityRatio * 0.7 + centerScore * 0.3
        
        if (score > bestScore) {
          bestScore = score
          bestEntry = entry
        }
      }

      if (bestEntry) {
        const targetElement = bestEntry.target as Element
        const newActiveSection = `#${targetElement.id}`
        if (newActiveSection !== activeSection) {
          setActiveSection(newActiveSection)
          // Update URL hash without scrolling
          if (window.history.replaceState) {
            window.history.replaceState(null, '', newActiveSection === '#home' ? '/' : newActiveSection)
          }
        }
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections with IDs
    const sections = ['home', 'timeline', 'contact']
    const observedElements: Element[] = []
    
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
        observedElements.push(element)
      }
    })

    // Set initial active section based on current scroll position
    const setInitialActiveSection = () => {
      if (window.location.hash) {
        setActiveSection(window.location.hash)
      } else {
        // Check which section is currently most visible
        let bestElement: Element | null = null
        let bestScore = 0

        observedElements.forEach((element) => {
          const rect = element.getBoundingClientRect()
          const viewportHeight = window.innerHeight
          
          if (rect.bottom > 0 && rect.top < viewportHeight) {
            const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
            const visibilityRatio = visibleHeight / Math.min(rect.height, viewportHeight)
            
            if (visibilityRatio > bestScore) {
              bestScore = visibilityRatio
              bestElement = element
            }
          }
        })

        if (bestElement) {
          const element = bestElement as HTMLElement
          setActiveSection(`#${element.id}`)
        } else {
          // Default to home if nothing is visible
          setActiveSection('#home')
        }
      }
    }

    // Set initial state after a brief delay to ensure DOM is ready
    const timeoutId = setTimeout(setInitialActiveSection, 100)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [pathname, activeSection])

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
      // Use activeSection from IntersectionObserver if available, otherwise fall back to hash
      const currentSection = activeSection || hash || (typeof window !== 'undefined' ? window.location.hash : '')
      
      // Map sections to navigation items
      if (!currentSection || currentSection === '#home' || currentSection === '/') {
        const homeItem = items.find(item => item.url === '/')
        if (homeItem) return homeItem.name
      }
      
      if (currentSection === '#timeline') {
        const aboutItem = items.find(item => item.url === '#timeline')
        if (aboutItem) return aboutItem.name
      }
      
      if (currentSection === '#contact') {
        const contactItem = items.find(item => item.url === '#contact')
        if (contactItem) return contactItem.name
      }
      
      // Check for exact hash matches as fallback
      const hashMatch = items.find(item => item.url === currentSection)
      if (hashMatch) return hashMatch.name
      
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
                    "absolute inset-0 w-full rounded-full -z-10",
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
                      "absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full",
                      isScrolled 
                        ? "bg-[#03D6C4]" 
                        : "bg-white"
                    )}
                  >
                    <div className={cn(
                      "absolute w-12 h-6 rounded-full blur-md -top-2 -left-2",
                      isScrolled 
                        ? "bg-[#03D6C4]/20" 
                        : "bg-white/30"
                    )} />
                    <div className={cn(
                      "absolute w-8 h-6 rounded-full blur-md -top-1",
                      isScrolled 
                        ? "bg-[#03D6C4]/20" 
                        : "bg-white/30"
                    )} />
                    <div className={cn(
                      "absolute w-4 h-4 rounded-full blur-sm top-0 left-2",
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

