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

  // No webpack config needed anymore — we'll control it via build flag
};

export default nextConfig;