import type { Metadata } from 'next'
import '../styles/globals.css'
import { ConditionalNavbar } from '../components/Shared/ConditionalNavbar'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://founder-webpage.vercel.app'),
  title: 'Jamanudeen P - Founder, My Azli Fresh',
  description: 'Transforming how fresh, chemical-free food reaches Indian families. From coastal roots to urban innovation — a journey redefining freshness and purpose.',
  keywords: ['Jamanudeen P', 'My Azli Fresh', 'fresh food', 'seafood delivery', 'entrepreneurship', 'founder story', 'sustainable sourcing'],
  authors: [{ name: 'Jamanudeen P' }],
  openGraph: {
    type: 'website',
    title: 'Jamanudeen P - Founder, My Azli Fresh',
    description: 'Transforming how fresh, chemical-free food reaches Indian families.',
    images: ['/images/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jamanudeen P - Founder, My Azli Fresh',
    description: 'Transforming how fresh, chemical-free food reaches Indian families.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-[#0A0F1C] transition-colors duration-300">
        <ConditionalNavbar />
        {children}
      </body>
    </html>
  )
}

