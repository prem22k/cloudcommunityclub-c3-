'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const ReactTyped = dynamic(() => import('react-typed').then(mod => mod.ReactTyped), {
    ssr: false,
    loading: () => <span className="bg-gradient-to-t from-yellow-300 to-purple-400 bg-clip-text text-transparent">Loading...</span>
})

interface GalleryTypewriterProps {
    words: string[]
}

export default function GalleryTypewriter({ words }: GalleryTypewriterProps) {
    return (
        <ReactTyped
            strings={words}
            typeSpeed={50}
            backSpeed={75}
            backDelay={3000}
            loop
            className='bg-gradient-to-t from-yellow-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(225,200,255,0.5)]'
        />
    )
}
