import type { BlogPostFull, BlogPostSummary } from '../types'

export const blogPostsData: Record<string, BlogPostFull> = {
  'how-my-azli-fresh-was-built-on-customer-pain-points': {
    id: 1,
    slug: 'how-my-azli-fresh-was-built-on-customer-pain-points',
    title: 'How My Azli Fresh Was Built on Customer Pain Points',
    teaser: 'Understanding customer needs transformed our approach to fresh food delivery, leading to innovative solutions that truly matter.',
    date: 'October 15, 2024',
    readTime: '3 min read',
    category: 'Foundership',
    content: `
      <h2>The Beginning: Understanding the Problem</h2>
      <p>When I first started exploring the fresh food delivery space, I wasn't thinking about building a company. I was thinking about solving a problem that I and countless others faced every day: the disconnect between the quality of fresh food available for export and what was accessible to local consumers.</p>

      <h2>Listening to Customer Stories</h2>
      <p>Over months of conversations with home cooks, restaurant owners, and families across Mumbai, I began to notice patterns. People wanted fresh seafood, but they didn't trust what was available in local markets. They were concerned about quality, hygiene, and transparency in the supply chain.</p>

      <h2>The Innovation Moment</h2>
      <p>The breakthrough came when I realized that the solution wasn't just about logistics — it was about fundamentally rethinking how fresh food reaches consumers. Instead of focusing on frozen inventory, we could build a system that prepares food after the order is placed, maintaining peak freshness.</p>

      <h2>Building the Solution</h2>
      <p>My Azli Fresh was born from these insights. We built our entire operation around three core principles that emerged from customer feedback:</p>
      <ul>
        <li>Fresh preparation after order placement</li>
        <li>Complete transparency in sourcing and processing</li>
        <li>Customization to meet individual needs</li>
      </ul>

      <h2>Lessons Learned</h2>
      <p>The biggest lesson has been that the best products come from truly understanding customer pain points, not from assuming what customers want. Every feature, every process, every decision at My Azli Fresh traces back to a specific customer need we identified through listening.</p>
    `
  },
  'the-danger-of-perfectionism-in-startups': {
    id: 2,
    slug: 'the-danger-of-perfectionism-in-startups',
    title: 'The Danger of Perfectionism in Startups.',
    teaser: 'Perfection can be the enemy of progress. Learning when to launch imperfectly and iterate based on real feedback.',
    date: 'September 28, 2024',
    readTime: '2 min read',
    category: 'Business',
    content: `
      <h2>The Perfection Trap</h2>
      <p>As founders, we're often told to "build the perfect product" before launching. But this advice can be dangerous. In my journey with My Azli Fresh, I've learned that perfectionism can be the enemy of progress.</p>

      <h2>My Early Mistakes</h2>
      <p>When I first started, I spent months trying to perfect every aspect of the business before launching. The sourcing had to be perfect, the packaging flawless, the delivery system optimized. But while I was perfecting, customers were still struggling with the problems I wanted to solve.</p>

      <h2>The Launch Anyway Mindset</h2>
      <p>The turning point came when I realized that launching with an imperfect product was better than never launching at all. Our first version wasn't perfect — far from it. But it solved a real problem, and it allowed us to learn from real customer feedback instead of hypothetical scenarios.</p>

      <h2>Iterative Improvement</h2>
      <p>Today, My Azli Fresh is much better than our initial launch, but we're still not perfect. And that's okay. We improve every day based on customer feedback, operational data, and new insights. This iterative approach has been far more valuable than trying to achieve perfection from the start.</p>

      <h2>The Lesson</h2>
      <p>Perfectionism in startups isn't about quality — it's about fear. Fear of criticism, fear of failure, fear of not being good enough. The most successful founders I know aren't perfect; they're brave enough to launch imperfectly and learn in public.</p>
    `
  },
  'sustainable-sourcing-more-than-a-buzzword': {
    id: 3,
    slug: 'sustainable-sourcing-more-than-a-buzzword',
    title: 'Sustainable Sourcing: More Than a Buzzword',
    teaser: 'Building a supply chain that not only delivers quality but also supports local communities and environmental stewardship.',
    date: 'August 12, 2024',
    readTime: '4 min read',
    category: 'Sustainability',
    content: `
      <h2>Beyond the Labels</h2>
      <p>In today's business landscape, "sustainability" has become a buzzword that companies use to signal their commitment to environmental and social responsibility. But at My Azli Fresh, sustainability isn't a marketing strategy — it's the foundation of our entire business model.</p>

      <h2>The Real Cost of Unsustainable Practices</h2>
      <p>Having spent over a decade in the seafood export industry, I've seen firsthand the environmental and social costs of unsustainable sourcing practices. Overfishing, poor working conditions, and lack of transparency in supply chains aren't just ethical issues — they're business risks that ultimately harm both producers and consumers.</p>

      <h2>Our Sustainable Sourcing Framework</h2>
      <p>When we built My Azli Fresh, we developed a sourcing framework based on three pillars:</p>

      <h3>1. Environmental Responsibility</h3>
      <p>We work directly with fishing communities that use sustainable practices. This means respecting fishing seasons, avoiding overfished species, and supporting methods that minimize bycatch and habitat damage.</p>

      <h3>2. Fair Trade Practices</h3>
      <p>We ensure that everyone in our supply chain is paid fairly for their work. This includes fishers, processors, delivery partners, and everyone in between. Fair wages aren't just ethical — they ensure quality and consistency.</p>

      <h3>3. Community Development</h3>
      <p>Our "Work & Explore" initiative is designed to empower workers and migrants through education and skill development. We believe that sustainable business includes investing in the communities that make our work possible.</p>

      <h2>Measuring Impact</h2>
      <p>True sustainability requires measurement and transparency. We track metrics like:</p>
      <ul>
        <li>Percentage of sustainably sourced seafood</li>
        <li>Waste reduction in our operations</li>
        <li>Community investment and education programs</li>
        <li>Carbon footprint of our delivery network</li>
      </ul>

      <h2>The Business Case for Sustainability</h2>
      <p>What we've learned is that sustainability isn't just good for the planet — it's good for business. Customers increasingly demand transparency and ethical practices. Partners prefer working with companies that share their values. And employees are more engaged when they know their work has positive impact.</p>

      <h2>Looking Forward</h2>
      <p>As we expand across India and the GCC, sustainability remains at the core of our strategy. We're exploring new technologies like blockchain for supply chain transparency, renewable energy for our operations, and innovative packaging solutions that reduce waste.</p>

      <p>Sustainability isn't a destination — it's a journey of continuous improvement. And we're committed to walking this path, one transparent, ethical decision at a time.</p>
    `
  }
}

// Export summary data for listings
export const blogPostsSummary: BlogPostSummary[] = Object.values(blogPostsData).map(post => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  teaser: post.teaser,
  date: post.date,
  readTime: post.readTime,
  category: post.category
}))

// Export sorted by date (newest first)
export const blogPostsSummarySorted = [...blogPostsSummary].sort((a, b) => {
  const dateA = new Date(a.date)
  const dateB = new Date(b.date)
  return dateB.getTime() - dateA.getTime()
})

