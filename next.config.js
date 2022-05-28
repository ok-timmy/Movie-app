/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "imdb-api.com",
      "m.media-amazon.com",
      "lh3.googleusercontent.com"
    ],
    // domains: ['m.media-amazon.com'],
  },
};

module.exports = nextConfig;
