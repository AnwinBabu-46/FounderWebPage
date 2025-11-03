import type { NextPage } from 'next'
import Head from 'next/head'
import ScrollProgress from '../components/ScrollProgress'
import Hero from '../components/Hero'
import Timeline from '../components/Timeline'
import MissionSection from '../components/MissionSection'
import BlogSection from '../components/BlogSection'
import MediaMentions from '../components/MediaMentions'
import ContactSection from '../components/ContactSection'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Jamanudeen P - Founder, My Azli Fresh</title>
        <meta name="description" content="Transforming how fresh, chemical-free food reaches Indian families. From coastal roots to urban innovation — a journey redefining freshness and purpose." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Jamanudeen P - Founder, My Azli Fresh" />
        <meta property="og:description" content="Transforming how fresh, chemical-free food reaches Indian families." />
        <meta property="og:image" content="/images/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Jamanudeen P - Founder, My Azli Fresh" />
        <meta property="twitter:description" content="Transforming how fresh, chemical-free food reaches Indian families." />
        <meta property="twitter:image" content="/images/og-image.jpg" />

        {/* Additional SEO */}
        <meta name="keywords" content="Jamanudeen P, My Azli Fresh, fresh food, seafood delivery, entrepreneurship, founder story, sustainable sourcing" />
        <meta name="author" content="Jamanudeen P" />
        <meta name="robots" content="index, follow" />
      </Head>

      <ScrollProgress />

      <main>
        <Hero />
        <Timeline />
        <MissionSection />
        <BlogSection />
        <MediaMentions />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="bg-dark-blue text-white py-8">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="mb-2">
              © 2024 My Azli Fresh. All rights reserved.
            </p>
            <p className="text-sm opacity-80">
              Built with passion for fresh, sustainable food delivery.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home