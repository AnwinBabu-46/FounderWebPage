import { BlogService } from '@/lib/blog-service';
import { BlogPostFull, BlogPostSummary } from './types';

/**
 * Fetches all posts and returns them as a dictionary keyed by slug.
 */
export async function getBlogPostsData(): Promise<Record<string, BlogPostFull>> {
  const allPosts = await BlogService.getAll();

  return allPosts.reduce((acc, post) => {
    acc[post.slug] = post;
    return acc;
  }, {} as Record<string, BlogPostFull>);
}

/**
 * Fetches all posts, summarizes them, and sorts them by date.
 */
export async function getBlogPostsSummarySorted(): Promise<BlogPostSummary[]> {
  const allPosts = await BlogService.getAll();

  const summary = allPosts.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    teaser: post.teaser,
    date: post.date,
    readTime: post.readTime,
    category: post.category
  }));

  return summary.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}