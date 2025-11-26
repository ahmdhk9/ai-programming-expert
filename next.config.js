/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compress: true,
  optimizeFonts: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': require('path').resolve(__dirname, 'web/components'),
      '@assets': require('path').resolve(__dirname, 'web/public')
    };
    return config;
  }
};

module.exports = nextConfig;
