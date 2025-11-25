/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // ← مهم لإصدار ملفات static بدون next export
}

module.exports = nextConfig
