import ScrollProgress from '../components/Shared/ScrollProgress'
import Hero from '../components/Hero/Hero'
import Timeline from '../components/Timeline/Timeline'
import MissionSection from '../components/Mission/MissionSection'
import BlogSection from '../components/Blog/BlogSection'
import MediaMentions from '../components/Media/MediaMentions'
import ContactSection from '../components/Contact/ContactSection'
import Footer from '../components/Footer/Footer'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main className="relative w-full">
        <Hero />
        <Timeline />
        <MissionSection />
        <BlogSection />
        <MediaMentions />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

