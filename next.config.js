/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['fonts.gstatic.com', 'images.unsplash.com'],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    headers: async () => {
        return [
            {
                source: '/:all*(svg|jpg|png|webp|avif)',
                locale: false,
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/:path*.js',
                locale: false,
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/:path*.css',
                locale: false,
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ]
    },
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['@vercel/speed-insights', 'framer-motion', 'react-icons'],
    },
}

module.exports = nextConfig