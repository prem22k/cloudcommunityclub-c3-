'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { ReactTyped } from 'react-typed'

// Critical components loaded immediately
import IntroFade from '../components/IntroFade'
import Hero from '../components/Hero'

// Dynamically imported components
const Overview = dynamic(() => import('../components/Overview'), {
    loading: () => <div className="h-screen bg-black" />
})
const Technologies = dynamic(() => import('../components/Technologies'), {
    loading: () => <div className="h-screen bg-black" />
})
const About = dynamic(() => import('../components/About'), {
    loading: () => <div className="h-screen bg-black" />
})
const Leadership = dynamic(() => import('../components/Leadership'), {
    loading: () => <div className="h-screen bg-black" />
})
const Recruitment = dynamic(() => import('../components/Recruitment'), {
    loading: () => <div className="h-screen bg-black" />
})
const Footer = dynamic(() => import('../components/Footer'), {
    loading: () => null
})

const GALLERY_TYPED_WORDS = [
    'Cloud Workshops',
    'Research Projects',
    'Tech Conferences',
    'Hackathons',
    'Industry Meetups',
    'Open Source Projects',
    'Paper Publications',
    'Tech Seminars',
    'Hands-on Labs'
]

export default function App() {
    return (
        <>
            <IntroFade />
            <Hero />
            
            <Suspense fallback={<div className="h-screen bg-black" />}>
                <Overview />
            </Suspense>
            
            <Suspense fallback={<div className="h-screen bg-black" />}>
                <Leadership />
            </Suspense>

            <Suspense fallback={<div className="h-screen bg-black" />}>
                <Technologies />
            </Suspense>

            <Suspense fallback={<div className="h-screen bg-black" />}>
                <About />
            </Suspense>

            <div className='w-full bg-gradient-to-b from-neutral-900 via-black to-black py-14'>
                <h1 className='title-main mx-auto text-3xl text-center sm:text-4xl font-extrabold text-white'>
                    <span className='text-shadow shadow-gray-700'>
                        Innovate with us through&nbsp;
                    </span>
                    <ReactTyped
                        strings={GALLERY_TYPED_WORDS}
                        typeSpeed={50}
                        backSpeed={75}
                        backDelay={3000}
                        loop
                        className='bg-gradient-to-t from-yellow-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(225,200,255,0.5)]'
                    ></ReactTyped>
                </h1>
            </div>

            <div className='w-full h-30' />

            <Suspense fallback={<div className="h-screen bg-black" />}>
                <Recruitment />
            </Suspense>

            <Suspense fallback={null}>
                <Footer />
            </Suspense>
        </>
    )
}
