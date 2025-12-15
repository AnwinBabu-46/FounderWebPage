import { BlogService } from '@/lib/blog-service';
import { BlogPostFull, BlogPostSummary } from './types';

// Load posts dynamically
const allPosts = BlogService.getAll();

export const blogPostsData: Record<string, BlogPostFull> = allPosts.reduce((acc, post) => {
  acc[post.slug] = post;
  return acc;
}, {} as Record<string, BlogPostFull>);

export const blogPostsSummary: BlogPostSummary[] = Object.values(blogPostsData).map(post => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  teaser: post.teaser,
  date: post.date,
  readTime: post.readTime,
  category: post.category
}));

export const blogPostsSummarySorted = [...blogPostsSummary].sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB.getTime() - dateA.getTime();
});
