/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.pexels.com',
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
};

module.exports = nextConfig;
