import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing images configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },

  // This silences the Turbopack + webpack conflict in Next.js 16
  turbopack: {},

  // Optional: keep this for extra safety
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;