'use client'

import Image from 'next/image'

import { motion } from 'framer-motion'

// Update these paths with your club's assets
const logo = '/assets/ccc_logo.webp'  // Replace with your club logo
const loader = '/assets/bits/loader.webp'  // Replace with a cloud-themed loader

export default function IntroFade(): React.ReactNode {


    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className='z-30 flex flex-col items-center justify-center pointer-events-none absolute w-full h-screen bg-gradient-to-b from-black to-[#001830]'
        >
            <Image
                src={logo}
                className='opacity-90 animate-pulse'
                alt='C³ Logo'
                width={150}
                height={150}
                priority
                quality={85}
                sizes="150px"
            />
            <Image
                src={loader}
                className='opacity-70 mt-4'
                alt='Loading...'
                width={80}
                height={80}
                priority
                quality={75}
                sizes="80px"
            />

            <p className="text-[#00A0DC] text-sm mt-2 font-light opacity-70">Cloud Community Club</p>
        </motion.div>
    )
}
