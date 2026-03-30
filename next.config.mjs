/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
    'postprocessing',
  ],
  turbopack: {},
  allowedDevOrigins: ['192.168.29.199'],
};

export default nextConfig;
