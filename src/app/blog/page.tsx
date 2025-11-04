import type { Metadata } from 'next'
import BlogIndexClient from './BlogIndexClient'

export const metadata: Metadata = {
  title: 'Blog - Reflections & Insights | Jamanudeen P',
  description: 'Thoughts on entrepreneurship, sustainability, and building a business that truly serves people',
}

export default function BlogPage() {
  return <BlogIndexClient />
}
