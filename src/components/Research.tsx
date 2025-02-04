'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
    Brain, 
    Network, 
    CloudCog,
    GraduationCap,
    Lightbulb
} from 'lucide-react'

const researchAreas = [
    {
        icon: <Brain className="w-8 h-8" />,
        title: "Cloud Innovation",
        description: "Exploring next-generation cloud computing paradigms and innovative architectures"
    },
    {
        icon: <Network className="w-8 h-8" />,
        title: "Edge Computing",
        description: "Research on distributed edge computing and IoT cloud integration"
    },
    {
        icon: <CloudCog className="w-8 h-8" />,
        title: "Cloud Security",
        description: "Advanced research in cloud security, privacy, and compliance"
    }
]

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5
        }
    }
}

export default function Research(): React.ReactNode {
    return (
        <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/research/research_bg.webp"
                    alt="Research Background"
                    fill
                    className="object-cover opacity-30"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
                <div className="text-center space-y-8">
                    {/* Header Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="flex justify-center items-center space-x-4">
                            <GraduationCap className="w-12 h-12 text-blue-400" />
                            <span className="text-lg text-blue-400 font-semibold tracking-wider uppercase">
                                Research Initiative
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white">
                            Advancing Cloud Technology
                            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Through Research
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Our research division is preparing to launch groundbreaking studies 
                            in cloud computing, bringing together academic excellence and industry innovation.
                        </p>
                    </motion.div>

                    {/* Research Areas */}
                    <motion.div 
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
                    >
                        {researchAreas.map((area, index) => (
                            <motion.div
                                key={index}
                                variants={item}
                                whileHover={{ 
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                                className="p-6 rounded-xl bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 
                                         backdrop-blur-sm border border-neutral-800/50 hover:border-blue-500/30 
                                         transition-all duration-300 transform-gpu" // Added transform-gpu for smoother animations
                            >
                                <div className="text-blue-400 mb-4">
                                    {area.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{area.title}</h3>
                                <p className="text-gray-400">{area.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Coming Soon Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-16 p-8 rounded-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <div className="flex items-center gap-3">
                                <Lightbulb className="w-8 h-8 text-yellow-400 animate-pulse" />
                                <span className="text-xl text-gray-300">Research Program Launch</span>
                            </div>
                            <div className="h-8 w-px bg-gray-700 hidden md:block" />
                            <p className="text-gray-400">
                                Want to be part of our research community? {' '}
                                <a 
                                    href="https://discord.gg/dBNXWDKhrD" 
                                    className="text-blue-400 hover:text-blue-300 transition-colors underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Join our Discord
                                </a>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
