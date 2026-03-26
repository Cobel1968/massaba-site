/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['wdvidnhqzomdsiirizla.supabase.co'],
    unoptimized: process.env.NODE_ENV === 'development' ? false : true,
  },
  experimental: {
    turbo: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
