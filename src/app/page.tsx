import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import ScrollProgress from '../components/Shared/ScrollProgress'
import Hero from '../components/Hero/Hero'
import Footer from '../components/Footer/Footer'

const Timeline = dynamic(() => import('../components/Timeline/Timeline').then(mod => mod.Timeline), {
  loading: () => <div className="h-screen w-full bg-[var(--page-bg)]" /> // Optional placeholder
})
const MissionSection = dynamic(() => import('../components/Mission/MissionSection'))
const MediaMentions = dynamic(() => import('../components/Media/MediaMentions'))
const ContactSection = dynamic(() => import('../components/Contact/ContactSection'))


export const metadata: Metadata = {
  title: 'Jamanudeen P | Sustainable Seafood Entrepreneur',
  description: 'Founder of My Azli Fresh. Expert in seafood export, cold chain logistics, and D2C sustainable food systems.',
  openGraph: {
    title: 'Jamanudeen P - Portfolio',
    description: 'From coastal roots to global seafood export chains.',
    type: 'website',
  }
}


const timelineData = [
  {
    title: "Early Life & Coastal Roots",
    content: (
      <p className="text-[var(--text-secondary)] text-sm md:text-base mb-8">
        Born in a rural coastal region of South India, Jamanudeen P grew up around fisheries and the local seafood trade—the foundation of his lifelong connection to the ocean.
      </p>
    ),
  },
  {
    title: "Export Career: 12+ Years in Seafood",
    content: (
      <p className="text-[var(--text-secondary)] text-sm md:text-base mb-8">
        Spent over 12 years in the seafood export business, working with global supply chains that connected India’s coastlines to Los Angeles, Dubai, the UAE, and London. Built deep expertise in cold chain logistics and quality management.
      </p>
    ),
  },
  {
    title: "Supply Chain Expertise",
    content: (
      <p className="text-[var(--text-secondary)] text-sm md:text-base mb-8">
        Developed mastery in export operations from sourcing and cold storage to transportation and delivery. Learned the power of consistency and transparency in perishable logistics.
      </p>
    ),
  },
  {
    title: "Turning Point: Founding My Azli Fresh",
    content: (
      <p className="text-[var(--text-secondary)] text-sm md:text-base mb-8">
        Transitioned from exporter to entrepreneur founding My Azli Fresh to bring fresh, chemical-free seafood directly to urban families through a D2C model.
      </p>
    ),
  },
  {
    title: "Building a Purpose-Driven Brand",
    content: (
      <p className="text-[var(--text-secondary)] text-sm md:text-base mb-8">
        My Azli Fresh isn’t just about delivery—it’s about worker welfare, customer trust, and making transparency a core part of the food ecosystem.
      </p>
    ),
  },
]

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main className="relative w-full bg-[var(--page-bg)]">
        
        {/* Updated Hero Section with the required imageSrc prop */}
        <section id="home">
          <Hero imageSrc="/images/founder.png" />
        </section>

      
        <section id="timeline">
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