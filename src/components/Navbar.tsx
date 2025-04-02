'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Link as ScrollLink, animateScroll } from 'react-scroll'
import Link from 'next/link'

import { HiOutlineCloud } from 'react-icons/hi2'
import { GoHome, GoCodeOfConduct } from 'react-icons/go'
import { FaBars, FaTimes } from 'react-icons/fa'
import { FiBook } from 'react-icons/fi'
import { MdOutlineEmojiEvents } from 'react-icons/md'
import { motion } from 'framer-motion'

const logo = '/assets/bits/sreenidhi-logo.png'

export default function Navbar(): React.ReactNode {
    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)

    return (
        <div className='z-50 flex flex-col fixed w-full'>
            {/* Top Bar */}
            <motion.div
                className='z-20 flex relative h-[64px] px-4 justify-between items-center text-gray-300 bg-gradient-to-b from-[#000] to-transparent'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
            >
                <Image
                    width={180}
                    height={180}
                    src={logo}
                    alt='Snist Logo'
                    className='my-auto'
                    unoptimized
                    priority
                />

                {/* Desktop Navigation */}
                <ul className='hidden md:flex text-[15px]'>
                    <li className='text-white font-semibold flex active:scale-90 hover:scale-105 transition duration-300 ease-out'>
                        <Link
                            href='/'
                            className='flex items-center'
                            onMouseUp={() => {
                                animateScroll.scrollToTop()
                            }}
                        >
                            <GoHome className='my-auto mr-2 text-xl' />
                            Home
                        </Link>
                    </li>

                    <li className='text-white font-semibold flex active:scale-90 hover:scale-105 transition duration-300 ease-out'>
                        <Link href='/projects' className='flex items-center'>
                            <HiOutlineCloud className='my-auto mr-2 text-xl' />
                            Project Schools
                        </Link>
                    </li>

                    <li className='text-white font-semibold flex active:scale-90 hover:scale-105 transition duration-300 ease-out'>
                        <Link href='/research' className='flex items-center'>
                            <FiBook className='my-auto mr-2 text-xl' />
                            Research
                        </Link>
                    </li>

                    <li className='text-white font-semibold flex active:scale-90 hover:scale-105 transition duration-300 ease-out'>
                        <Link href='/events' className='flex items-center'>
                            <MdOutlineEmojiEvents className='my-auto mr-2 text-xl' />
                            Events
                        </Link>
                    </li>

                    <li className='text-white font-semibold flex active:scale-90 hover:scale-105 transition duration-300 ease-out'>
                        <Link href='/join-us' className='flex items-center'>
                            <GoCodeOfConduct className='my-auto mr-2 text-xl' />
                            Join Us
                        </Link>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <div onClick={handleClick} className='md:hidden z-10'>
                    {!nav ? <FaBars /> : <FaTimes />}
                </div>

                {/* Mobile Menu */}
                <div
                    className={
                        !nav
                            ? 'hidden'
                            : 'absolute top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center'
                    }
                >
                    <div className='flex flex-col gap-4'>
                        <div className='text-2xl text-white font-semibold flex active:scale-90 hover:scale-105 transition duration-300 ease-out'>
                            <GoHome className='my-auto mr-2 text-2xl' />
                            <Link
                                href='/'
                                onMouseUp={() => {
                                    animateScroll.scrollToTop()
                                    handleClick()
                                }}
                            >
                                Home
                            </Link>
                        </div>

                        <div className='text-2xl text-white font-semibold flex active:scale-90 hover:scale-105 transition duration-300 ease-out'>
                            <HiOutlineCloud className='my-auto mr-2 text-2xl' />
                            <Link href='/projects' onClick={handleClick}>
                                Project Schools
                            </Link>
                        </div>

                        <div className='text-2xl text-white font-semibold flex active:scale-90 hover:scale-105 transition duration-300 ease-out'>
                            <FiBook className='my-auto mr-2 text-2xl' />
                            <Link href='/research' onClick={handleClick}>
                                Research
                            </Link>
                        </div>

                        <div className='text-2xl text-white font-semibold flex active:scale-90 hover:scale-105 transition duration-300 ease-out'>
                            <MdOutlineEmojiEvents className='my-auto mr-2 text-2xl' />
                            <Link href='/events' onClick={handleClick}>
                                Events
                            </Link>
                        </div>

                        <div className='text-2xl text-white font-semibold flex active:scale-90 hover:scale-105 transition duration-300 ease-out'>
                            <GoCodeOfConduct className='my-auto mr-2 text-2xl' />
                            <a
                                href='/join-us'
                                onMouseUp={handleClick}
                            >
                                Join Us!
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
