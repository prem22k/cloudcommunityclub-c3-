'use client'

import React from 'react'
import { ReactTyped } from 'react-typed'
import { Element } from 'react-scroll'

import Image from 'next/image'

import { IoMdArrowRoundDown } from 'react-icons/io'
import { Link } from 'react-scroll'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TYPED_KEYWORDS = [
    'Cloud Compute',
    'Research',
    'Innovate',
    'AWS',
    'Azure',
    'GCP',
    'Containerize',
    'DevOps',
    'Serverless',
    'Microservices',
    'Open Source',
    'Collaborate',
    'Deploy',
    'Scale',
    'Python',
    'Linux',
    '$ terraform apply',
    '$ docker build',
]

const logo = '/assets/ccc_logo.png'
const backdrop = '/assets/home/snist_backdrop.jpeg'
const heroOverlay = '/assets/home/hero_overlay_gray.gif'

export default function Hero(): React.ReactNode {
    const ref = useRef(null)
    const isInView = useInView(ref)

    return (
        <div className='w-full h-screen bg-black'>
            <Element name='hero' />

            {/* Background Images */}
            <div className='absolute w-full h-full pointer-events-none overflow-hidden'>
                <motion.div
                    className='w-full h-full'
                    initial={{ transform: 'translateY(10%)', opacity: '0%' }}
                    animate={isInView ? { transform: 'translateY(0%)', opacity: '100%' } : { transform: 'translateY(10%)', opacity: '0%' }}
                    transition={{ duration: 3, ease: 'backOut' }}
                    ref={ref}
                >
                    {/* Backdrop with slightly increased darkness */}
                    <div className='absolute inset-0 bg-black bg-opacity-40' />
                    
                    <Image
                        width={1920}
                        height={1080}
                        className='absolute w-full h-full blur-[0px] object-cover opacity-60'
                        src={backdrop}
                        alt=''
                        unoptimized
                        priority
                    />
                    
                    <Image
                        width={1920}
                        height={1080}
                        src={heroOverlay}
                        className='absolute top-0 w-full h-full drop-shadow-lg opacity-5 sm:opacity-10'
                        alt=''
                        unoptimized
                        priority
                    />
                </motion.div>
            </div>


            {/* Content */}
            <div className='absolute w-full h-full mx-auto flex flex-col items-center justify-center pb-24'>
                {/* Logo with enhanced visibility */}
                <div className='relative mb-4'>
                    <div className='absolute inset-0 bg-black bg-opacity-30 rounded-full blur-2xl transform scale-110' />
                    <Image
                        width={250}
                        height={250}
                        src={logo}
                        alt=''
                        unoptimized
                        className='relative z-20 animate-heartbeat drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]'
                    />
                </div>

                 {/* Rest of the content with enhanced text visibility */}
                 <h1 className='z-20 title-main text-center text-[18px] sm:text-[32px] md:text-[38px] xl:text-[52px] text-shadow shadow-black font-bold text-white mx-4 my-[2px] sm:my-[-8px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'>
                    Cloud Community Club (C³)
                </h1>

                <div className='z-20 title-main w-full text-white text-center text-shadow shadow-black text-lg sm:text-xl'>
                    <p className='drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'>#Development2Deployment🚀</p>
                    <h1 className='title-main font-bold sm:text-[24px] text-2xl sm:pt-[10px]'>
                        {'>'} Let's{' '}
                        <ReactTyped
                            className='text-[#00A0DC] drop-shadow-[0_0_12px_rgba(0,160,220,0.5)]'
                            strings={TYPED_KEYWORDS}
                            typeSpeed={120}
                            backSpeed={80}
                            backDelay={2000}
                            fadeOut={true}
                            loop
                        />{' '}
                        {'<'}
                    </h1>
                </div>

                <Link
                    to='about'
                    smooth={true}
                    offset={-140}
                    duration={1500}
                    className='z-20 mt-2 relative group w-[230px] active:scale-95 duration-150 hover:border-blue-900 border-white rounded-2xl hover:outline hover:outline-[4px] active:outline-4 text-white text-lg title-main drop-shadow-[0_16px_20px_rgba(0,0,0,0.7)] overflow-hidden'
                >
                    <IoMdArrowRoundDown className='absolute w-full h-full group-hover:translate-y-0 -translate-y-[100%] duration-300 bg-gradient-to-t from-[#00A0DC] to-[#ffffff91] pointer-events-none' />
                    <button className='flex w-full justify-center p-2 font-semibold text-shadow-lg shadow-black hover:bg-blue-600 bg-neutral-900 bg-opacity-50 duration-300 hover:border-blue-300 overflow-hidden'>
                        <p className='text-center'>Join the Community</p>
                    </button>
                </Link>
            </div>

            {/* Subtle gradient overlays */}
            <div>
                <div className='absolute top-0 w-full h-[15%] bg-gradient-to-b from-black via-black to-transparent opacity-70' />
                <div className='absolute bottom-0 w-full h-[20%] bg-gradient-to-t from-black via-black to-transparent opacity-70' />
                <div className='absolute top-0 left-0 w-[50%] h-screen bg-gradient-to-r from-black to-transparent opacity-30' />
                <div className='absolute top-0 right-0 w-[50%] h-screen bg-gradient-to-l from-black to-transparent opacity-30' />
            </div>
        </div>
    )
}