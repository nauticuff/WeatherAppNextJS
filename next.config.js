require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn-icons-png.flaticon.com'],
  },
}

module.exports = {
  ...nextConfig,
  env: {
    API_KEY: process.env.API_KEY,
  },
}

