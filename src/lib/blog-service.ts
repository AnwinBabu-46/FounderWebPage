import fs from 'fs';
import path from 'path';
import { BlogPostFull, BlogPostSummary } from '@/data/blog/types';

const DATA_FILE = path.join(process.cwd(), 'src/data/blog/posts.json');

// Helper to read posts
function readPosts(): Record<string, BlogPostFull> {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return {};
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return {};
  }
}

// Helper to write posts
function writePosts(posts: Record<string, BlogPostFull>) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error('Error writing blog posts:', error);
    throw new Error('Failed to save blog post');
  }
}

export const BlogService = {
  getAll: (): BlogPostFull[] => {
    const posts = readPosts();
    return Object.values(posts);
  },

  getBySlug: (slug: string): BlogPostFull | undefined => {
    const posts = readPosts();
    return posts[slug];
  },

  create: (post: BlogPostFull) => {
    const posts = readPosts();
    if (posts[post.slug]) {
      throw new Error('Slug already exists');
    }
    posts[post.slug] = post;
    writePosts(posts);
    return post;
  },

  update: (slug: string, post: BlogPostFull) => {
    const posts = readPosts();
    if (!posts[slug]) {
      throw new Error('Post not found');
    }
    // If slug changes, we need to handle that (delete old, add new)
    if (slug !== post.slug) {
      if (posts[post.slug]) {
        throw new Error('New slug already exists');
      }
      delete posts[slug];
    }
    posts[post.slug] = post;
    writePosts(posts);
    return post;
  },

  delete: (slug: string) => {
    const posts = readPosts();
    if (!posts[slug]) {
      throw new Error('Post not found');
    }
    delete posts[slug];
    writePosts(posts);
  },
};
