/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75],
  },
  experimental: {
    optimizePackageImports: [
      '@hugeicons/react',
      '@hugeicons/core-free-icons',
      '@react-three/drei',
      'motion',
    ],
  },
};

export default nextConfig;