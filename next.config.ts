import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep your existing images config
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

  // Force disable Turbopack completely and use Webpack (stable)
  experimental: {
    turbopack: false,           // This is the key for newer Next.js versions
  },

  // Extra safety: ensure webpack is used
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;