'use client'

import { usePathname } from 'next/navigation'
import { NavBarDemo } from './NavBarDemo'

export function ConditionalNavbar() {
  const pathname = usePathname()
  const isBlogPage = pathname?.startsWith('/blog')
  const isAdminPage = pathname?.startsWith('/admin')
  
  // Don't render navbar for blog pages or admin pages
  if (isBlogPage || isAdminPage) {
    return null
  }
  
  return <NavBarDemo />
}
