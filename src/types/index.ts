export interface BlogPostSummary {
  id: number
  slug: string
  title: string
  teaser: string
  date: string
  readTime: string
  category: string
}

export interface BlogPostFull extends BlogPostSummary {
  content: string
}

export interface FormData {
  name: string
  email: string
  message: string
  honeypot?: string
}

export interface SocialLink {
  name: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  url: string
  color: string
}

