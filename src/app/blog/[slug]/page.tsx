import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPostsData } from '../../../data/blogPosts'
import BlogPostClient from './BlogPostClient'

export async function generateStaticParams() {
  return Object.keys(blogPostsData).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPostsData[params.slug]
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: `${post.title} - Jamanudeen P`,
    description: `Read "${post.title}" by Jamanudeen P, Founder of My Azli Fresh`,
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPostsData[params.slug]
  
  if (!post) {
    notFound()
  }
  
  return <BlogPostClient slug={params.slug} />
}
