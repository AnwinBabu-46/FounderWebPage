import { getBlogPostsSummarySorted } from '@/data/blog/posts';

export async function GET() {
  const baseUrl = 'https://founder-webpage.vercel.app';
  
  // Fetch posts asynchronously
  const posts = await getBlogPostsSummarySorted();
  
  const urls = posts.map(post => `
    <url>
      <loc>${baseUrl}/blog/${post.slug}</loc>
      <lastmod>${new Date(post.date).toISOString().split('T')[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}/blog</loc>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>
    ${urls}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
    },
  });
}