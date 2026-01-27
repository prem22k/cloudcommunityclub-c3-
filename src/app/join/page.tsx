'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import TerminalJoinForm from '../../components/TerminalJoinForm'

export default function JoinUs() {
    return (
        <div className="min-h-screen relative w-full flex flex-col items-center justify-center overflow-hidden bg-[#09090b]">
            {/* Engineering Grid Background */}
            <div className="absolute inset-0 w-full h-full bg-[#09090b]">
                <div
                    className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem]"
                    style={{
                        maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)'
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full py-12 flex flex-col items-center justify-center">
                {/* Logo Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full flex justify-center mb-6"
                >
                    <div className="relative w-32 h-32 md:w-40 md:h-40">
                        <Image
                            src="/assets/ccc_logo.webp"
                            alt="Cloud Community Club Logo"
                            fill
                            className="object-contain hover:scale-105 transition-transform duration-300"
                            priority
                        />
                    </div>
                </motion.div>

                {/* Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center mb-8 px-4"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg font-mono">
                        $ join --club c3
                    </h1>
                    <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto font-mono">
                        # Initialize your journey with Cloud Community Club
                    </p>
                </motion.div>

                {/* Terminal Join Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-full"
                >
                    <TerminalJoinForm />
                </motion.div>

                {/* Footer hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-8 text-xs text-zinc-600 font-mono"
                >
                    Press [Tab] to navigate • [Enter] to confirm
                </motion.p>
            </div>
        </div>
    )
}
