/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Enables static export
    trailingSlash: true, // Optional: Adds trailing slashes to all paths
    images: {
      unoptimized: true, // Disables the Image Optimization API for static exports
    },
  };
  
  module.exports = nextConfig;
  