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
            {
                source: '/:path*',
                locale: false,
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.ravenjs.com https://*.widgetbot.io https://*.discord.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.widgetbot.io https://*.discord.com; img-src 'self' data: https://*.discordapp.com https://*.discord.com; font-src 'self' https://fonts.gstatic.com https://*.widgetbot.io https://*.discord.com; connect-src 'self' https://*.widgetbot.io https://*.discord.com https://c3-backend-cnhr.onrender.com; frame-src 'self' https://*.widgetbot.io https://*.discord.com;",
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
        ]
    },
    experimental: {
        // Note: critters package is deprecated but still required for optimizeCss
        // Consider switching to the maintained fork at https://github.com/danielroe/beasties in the future
        optimizeCss: true,
        optimizePackageImports: ['@vercel/speed-insights', 'framer-motion', 'react-icons'],
    },
}

module.exports = nextConfig