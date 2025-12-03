/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: false,
  },
  async rewrites() {
    return [
      {
        source: '/blog',
        destination: 'http://localhost:3001/blog',
      },
      {
        source: '/blog/:path*',
        destination: 'http://localhost:3001/blog/:path*',
      },
    ]
  },
}

module.exports = nextConfig