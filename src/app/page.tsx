import { Metadata } from 'next'
import dynamicImport from 'next/dynamic'
import ScrollProgress from '../components/Shared/ScrollProgress'
import Hero from '../components/Hero/Hero'
import Footer from '../components/Footer/Footer'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Timeline = dynamicImport(() => import('../components/Timeline/Timeline').then(mod => mod.Timeline), {
  loading: () => <div className="h-screen w-full bg-[var(--page-bg)]" />
})
const MissionSection = dynamicImport(() => import('../components/Mission/MissionSection'))
const MediaMentions = dynamicImport(() => import('../components/Media/MediaMentions'))
const ContactSection = dynamicImport(() => import('../components/Contact/ContactSection'))

export const metadata: Metadata = {
  title: 'Jamanudeen P | Sustainable Seafood Entrepreneur',
  description: 'Founder of My Azli Fresh. Expert in seafood export, cold chain logistics, and D2C sustainable food systems.',
  openGraph: {
    title: 'Jamanudeen P - Portfolio',
    description: 'From coastal roots to global seafood export chains.',
    type: 'website',
  }
}

export default async function Home() {
  // 1. Fetch Profile and Timeline data in parallel
  const [profileRes, timelineRes] = await Promise.all([
    supabase.from('admin_profile').select('avatar_url').eq('id', 1).maybeSingle(),
    supabase.from('timeline_events').select('*').order('event_order', { ascending: true })
  ]);

  const profile = profileRes.data;
  const dbTimeline = timelineRes.data || [];

  // 2. Map DB data to the component's format while injecting the SAME style
  const timelineData = dbTimeline.map((item) => ({
    title: item.title,
    content: (
      <p className="text-[var(--text-secondary)] text-sm md:text-base mb-8">
        {item.description}
      </p>
    ),
  }));

  const defaultImage = "/images/founder.png"

  return (
    <>
      <ScrollProgress />
      <main className="relative w-full bg-[var(--page-bg)]">
        
        <section id="home">
          <Hero imageSrc={profile?.avatar_url || defaultImage} />
        </section>

        <section id="timeline">
          {/* ✅ Now using dynamic data with preserved styling */}
          <Timeline data={timelineData} />
        </section>

        <MissionSection />
        <MediaMentions />

        <section id="contact">
          <ContactSection />
        </section>
        
      </main>
      <Footer />
    </>
  )
}