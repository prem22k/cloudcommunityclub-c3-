'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6 p-8 rounded-xl bg-neutral-900/50 backdrop-blur-sm"
            >
                <div className="flex justify-center">
                    <AlertTriangle className="w-16 h-16 text-yellow-500 animate-pulse" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-white">Oops! Something went wrong</h2>
                    <p className="text-gray-400">We encountered an unexpected error</p>
                </div>
                <button
                    onClick={() => reset()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg
                             hover:from-blue-600 hover:to-blue-700 transition-all duration-300
                             transform hover:scale-105 active:scale-95"
                >
                    Try Again
                </button>
            </motion.div>
        </div>
    )
}