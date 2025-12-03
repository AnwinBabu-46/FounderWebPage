'use client'

import '../styles/globals.css'
import { NavBarDemo } from '../components/ui/navbar-demo'
import { AppThemeProvider } from '../components/theme-provider'
import { usePathname } from 'next/navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isBlogPage = pathname?.startsWith('/blog')

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-[#0A0F1C] dark:bg-black dark:text-white transition-colors duration-300">
        <AppThemeProvider>
        {!isBlogPage && <NavBarDemo />}
        {children}
        </AppThemeProvider>
      </body>
    </html>
  )
}

