import { Inter, Poppins, Ubuntu, Rubik, Open_Sans } from 'next/font/google'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import './globals.css'

// Font configurations
const inter = Inter({ 
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter'
})

const poppins = Poppins({ 
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins'
})

const ubuntu = Ubuntu({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-ubuntu'
})

const rubik = Rubik({ 
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-rubik'
})

const open_sans = Open_Sans({ 
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-open-sans'
})

export const metadata: Metadata = {
    metadataBase: new URL('https://snist.cloudcommunityclub.in'),
    title: 'Cloud Community Club (C³)',
    description: 'A vibrant community dedicated to cloud computing enthusiasts, professionals, and learners.',
    keywords: ['cloud community', 'community', 'technology', 'learning'],
    authors: [{ name: 'Cloud Community Club' }],
    openGraph: {
        title: 'Cloud Community Club (C³)',
        description: 'Join our cloud community club',
        url: 'https://snist.cloudcommunityclub.in',
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
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} ${poppins.variable} ${ubuntu.variable} ${rubik.variable} ${open_sans.variable}`}>
            <body className="min-h-screen bg-black text-white">
                <Navbar />
                <main>{children}</main>
            </body>
        </html>
    )
}