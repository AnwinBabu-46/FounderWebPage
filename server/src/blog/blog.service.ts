import { Injectable, NotFoundException } from '@nestjs/common';
import { blogPostsData, blogPostsSummarySorted } from './blog.data';
import { BlogPostFull, BlogPostSummary } from './blog.entity';

@Injectable()
export class BlogService {
  findAll(page: number = 1, limit: number = 9): { posts: BlogPostSummary[]; total: number; totalPages: number; currentPage: number } {
    const total = blogPostsSummarySorted.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const posts = blogPostsSummarySorted.slice(startIndex, endIndex);

    return {
      posts,
      total,
      totalPages,
      currentPage: page,
    };
  }

  findOne(slug: string): BlogPostFull {
    const post = blogPostsData[slug];
    if (!post) {
      throw new NotFoundException(`Post with slug ${slug} not found`);
    }
    return post;
  }

  generateRss(): string {
    const baseUrl = 'https://founder-webpage.vercel.app'; // Assuming this based on layout.tsx
    const items = blogPostsSummarySorted.map(post => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${baseUrl}/blog/${post.slug}</link>
        <guid>${baseUrl}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.teaser}]]></description>
      </item>
    `).join('');

    return `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Jamanudeen P - Blog</title>
        <link>${baseUrl}/blog</link>
        <description>Thoughts on entrepreneurship, sustainability, and building a business that truly serves people</description>
        <language>en</language>
        ${items}
      </channel>
    </rss>`;
  }

  generateSitemap(): string {
    const baseUrl = 'https://founder-webpage.vercel.app';
    const urls = blogPostsSummarySorted.map(post => `
      <url>
        <loc>${baseUrl}/blog/${post.slug}</loc>
        <lastmod>${new Date(post.date).toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}/blog</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>
      ${urls}
    </urlset>`;
  }
}
