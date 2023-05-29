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
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    GEOLOCATION_API_KEY: process.env.GEOLOCATION_API_KEY,
  },
}

