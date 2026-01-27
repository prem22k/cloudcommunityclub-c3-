import { Inter, Poppins, JetBrains_Mono } from 'next/font/google'
import { Metadata } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from '@/components/Navbar'
import './globals.css'

// Font configurations
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
    preload: true
})

const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    preload: true
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-jetbrains',
    preload: false
})

export const metadata: Metadata = {
    metadataBase: new URL('https://snist.cloudcommunityclub.tech'),
    title: {
        default: 'Cloud Community Club',
        template: '%s | Cloud Community Club',
    },
    description: 'Cloud Community Club - Learn, collaborate, and build with our Project Schools initiative and community events.',
    keywords: ['cloud community', 'community', 'technology', 'learning'],
    authors: [{ name: 'Cloud Community Club' }],
    openGraph: {
        title: 'Cloud Community Club (C³)',
        description: 'Join our cloud community club',
        url: 'https://snist.cloudcommunityclub.tech',
        siteName: 'Cloud Community Club',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Cloud Community Club (C³)'
            }
        ],
        locale: 'en_US',
        type: 'website',
    },

    twitter: {
        card: 'summary_large_image',
        site: '@C3Snist',
        creator: '@C3Snist'
    },
    other: {
        'linkedin:organization': 'cloud-community-club',
        'github:organization': 'C3Snist'
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
            <body className="min-h-screen bg-black text-white" suppressHydrationWarning>
                <Navbar />
                <main>{children}</main>
                {process.env.NODE_ENV === 'production' && <SpeedInsights />}
            </body>
        </html>
    )
}