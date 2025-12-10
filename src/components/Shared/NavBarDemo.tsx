"use client"

import { Home, User, Briefcase, FileText, BookOpen } from 'lucide-react'
import { NavBar } from "./TubelightNavbar"

export function NavBarDemo() {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '#timeline', icon: User },
    { name: 'Blog', url: '/blog', icon: BookOpen },
    { name: 'Contact', url: '#contact', icon: FileText }
  ]

  return <NavBar items={navItems} />
}

