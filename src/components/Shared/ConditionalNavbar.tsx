'use client'

import { usePathname } from 'next/navigation'
import { NavBarDemo } from './NavBarDemo'

export function ConditionalNavbar() {
  const pathname = usePathname()
  const isBlogPage = pathname?.startsWith('/blog')
  
  // Don't render navbar for blog pages - NestJS server handles those
  if (isBlogPage) {
    return null
  }
  
  return <NavBarDemo />
}
