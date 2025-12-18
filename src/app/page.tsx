import ScrollProgress from '../components/Shared/ScrollProgress'
import Hero from '../components/Hero/Hero'
import { Timeline } from '../components/Timeline/Timeline'
import MissionSection from '../components/Mission/MissionSection'
import MediaMentions from '../components/Media/MediaMentions'
import ContactSection from '../components/Contact/ContactSection'
import Footer from '../components/Footer/Footer'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main className="relative w-full bg-[var(--page-bg)]">
        <Hero />
        <section id="timeline">
          <Timeline
            data={[
              {
                title: "Early Life & Coastal Roots",
                content: (
                  <p className="text-[var(--text-secondary)] text-sm md:text-base mb-8">
                    Born in a rural coastal region of South India, Jamanudeen P grew up around fisheries and the local seafood trade the foundation of his lifelong connection to the ocean.
                  </p>
                ),
              },
              {
                title: "Export Career 12+ Years in Seafood",
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
                title: "Turning Point Founding My Azli Fresh",
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
                    My Azli Fresh isn’t just about delivery  it’s about worker welfare, customer trust, and making transparency a core part of the food ecosystem.
                  </p>
                ),
              },
            ]}
          />
        </section>
        <MissionSection />
        <MediaMentions />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

