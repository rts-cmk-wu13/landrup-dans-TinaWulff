/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/file-bucket/**',
      },
    ],
  },
  // evt. andre config options her
};

export default nextConfig;