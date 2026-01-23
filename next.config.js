/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // We add your Supabase project here so Next.js can optimize the images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ypcyevtqzvuzcwdeynnj.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = nextConfig