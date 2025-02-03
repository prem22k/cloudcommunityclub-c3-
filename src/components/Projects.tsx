'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Rocket, Stars, Clock } from 'lucide-react'

export default function Projects(): React.ReactNode {
    return (
        <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden pt-16 sm:pt-0">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/projects/coming_soon.webp"
                    alt="Background"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 w-full py-8 sm:py-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8 max-w-7xl mx-auto"
                >
                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 px-2">
                        Projects Coming Soon
                    </h1>

                    {/* Description */}
                    <p className="text-gray-400 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto px-4">
                        Our community is working on exciting cloud projects that will be showcased here.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto mt-8 sm:mt-12 px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-neutral-900/50 to-neutral-950/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl"
                        >
                            <div className="flex justify-center mb-3 sm:mb-4">
                                <Rocket className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                                Innovation Hub
                            </h3>
                            <p className="text-gray-400 text-sm sm:text-base">
                                Cutting-edge cloud computing projects in development
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gradient-to-br from-neutral-900/50 to-neutral-950/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl"
                        >
                            <div className="flex justify-center mb-3 sm:mb-4">
                                <Stars className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                                Community Driven
                            </h3>
                            <p className="text-gray-400 text-sm sm:text-base">
                                Built by developers, for developers
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-gradient-to-br from-neutral-900/50 to-neutral-950/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl"
                        >
                            <div className="flex justify-center mb-3 sm:mb-4">
                                <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                                Launch Soon
                            </h3>
                            <p className="text-gray-400 text-sm sm:text-base">
                                Stay tuned for our upcoming project releases
                            </p>
                        </motion.div>
                    </div>

                    {/* Call to Action */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8 sm:mt-12 px-4"
                    >
                        <p className="text-gray-400 text-base sm:text-lg">
                            Want to contribute to our upcoming projects?{' '}
                            <a
                                href="https://discord.gg/dBNXWDKhrD"
                                className="text-blue-400 hover:text-blue-300 transition-colors underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Join our Discord
                            </a>
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Animated particles or dots (optional) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ top: '20%', left: '10%' }} />
                <div className="absolute w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{ top: '70%', left: '80%' }} />
                <div className="absolute w-2 h-2 bg-cyan-500 rounded-full animate-ping" style={{ top: '40%', left: '60%' }} />
            </div>
        </div>
    )
}