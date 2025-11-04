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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Listen for hash changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHash(window.location.hash)
      
      const handleHashChange = () => {
        setHash(window.location.hash)
      }
      
      window.addEventListener('hashchange', handleHashChange)
      return () => window.removeEventListener('hashchange', handleHashChange)
    }
  }, [pathname])

  // Memoize active tab calculation to prevent unnecessary re-renders
  const activeTab = useMemo(() => {
    // Check exact match first (for routes like /blog)
    const exactMatch = items.find(item => item.url === pathname)
    if (exactMatch) return exactMatch.name
    
    // For hash links, check if we're on home page
    if (pathname === '/') {
      // Check if URL has hash (for #timeline, #contact)
      if (hash) {
        const hashMatch = items.find(item => item.url === hash)
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
  }, [pathname, hash, items])
  
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
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
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
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
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

