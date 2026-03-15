import type { Metadata } from 'next'
import Script from "next/script"
import '../styles/globals.css'
import { ConditionalNavbar } from '../components/Shared/ConditionalNavbar'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://founder-webpage.vercel.app'),
  title: 'Jamanudeen P - Founder, My Azli Fresh',
  description: 'Transforming how fresh, chemical-free food reaches Indian families. From coastal roots to urban innovation a journey redefining freshness and purpose.',
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

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WH12TY75PF"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WH12TY75PF');
          `}
        </Script>

      </body>
    </html>
  )
}
