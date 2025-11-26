/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
