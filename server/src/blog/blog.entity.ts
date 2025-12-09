export interface BlogPostSummary {
  id: number;
  slug: string;
  title: string;
  teaser: string;
  date: string;
  readTime: string;
  category: string;
}

export interface BlogPostFull extends BlogPostSummary {
  content: string;
}
