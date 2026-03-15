import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '', // Leave empty for default port
        pathname: '/**', // Allow all paths under the hostname
      },
    ],
  },
};

export default nextConfig;