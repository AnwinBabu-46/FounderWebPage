import { blogPostsSummarySorted } from '@/data/blog/posts';

export async function GET() {
  const baseUrl = 'https://founder-webpage.vercel.app';
  
  const items = blogPostsSummarySorted.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.teaser}]]></description>
    </item>
  `).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Jamanudeen P - Blog</title>
      <link>${baseUrl}/blog</link>
      <description>Thoughts on entrepreneurship, sustainability, and building a business that truly serves people</description>
      <language>en</language>
      ${items}
    </channel>
  </rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
    },
  });
}
