'use client'

import React from 'react'

import { ReactTyped } from 'react-typed'


// components
import IntroFade from '../components/IntroFade'

import Overview from '../components/Overview'
import Hero from '../components/Hero'
import Technologies from '../components/Technologies'

import About from '../components/About'

import Leadership from '../components/Leadership'

import Recruitment from '../components/Recruitment'

import Footer from '../components/Footer'

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
            <Overview />
            
            <Leadership />

            <Technologies />

            <About />

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

            <Recruitment />

            <Footer />
        </>
    )
}
