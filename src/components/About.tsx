'use client'

import { useRef, useState } from 'react'
import { Element } from 'react-scroll'

import { motion, useInView } from 'framer-motion'
import { useSound } from 'use-sound'

import Image from 'next/image'
import { ReactTyped } from 'react-typed'

import { FcCollaboration, FcElectronics, FcIdea } from 'react-icons/fc'

const cardBaseClasses = 'hover:z-10 z-0 w-[350px] hover:w-[420px] h-[430px] active:!scale-100 hover:outline-[8px] outline-[3px] outline hover:outline-double transition-all duration-300 ease-out bg-gradient-to-t rounded-3xl'

const sfxClunk = '/assets/sound_fx/clunk.mp3'
const logo = '/assets/ccc_logo.png'

export default function About(): React.ReactNode {
    const [playSfx_clunk] = useSound(sfxClunk)

    const ref = useRef(null)
    const isInView = useInView(ref)

    const [card1Animating, setCard1Animating] = useState(false)
    const [card2Animating, setCard2Animating] = useState(false)
    const [card3Animating, setCard3Animating] = useState(false)

    return (
        <div ref={ref} className='w-full h-full bg-gradient-to-b from-black to-[#0a0a0a] text-gray-300 py-[24vh] mt-40 overflow-hidden'>
            <Element name='about' />

            <div className='w-full py-24 flex flex-col lg:flex-row justify-center items-center gap-x-20 gap-y-8 bg-[#030303]'>
                <div className='relative w-[85%] lg:w-[45%]'>
                {/* Reduced opacity in the top gradient */}
                <div className='absolute top-0 w-full h-[20%] bg-gradient-to-b from-[rgba(3,3,3,1)] to-transparent z-10' />
                {/* Reduced opacity in the bottom gradient */}
                <div className='z-0 absolute bottom-0 w-full h-[20%] bg-gradient-to-t from-[rgba(3,3,3,1)] to-transparent' />
                {/* Reduced opacity in the radial gradient */}
                <div className='absolute w-full h-full bg-[radial-gradient(50%_90%_at_50%_50%,rgba(255,255,255,0)_40%,rgba(3,3,3,1)_100%)]' />
    
                {/* Aerial view video */}
                <video
                        src='/assets/home/aerial.mp4'
                        className='outline-[#030303] outline outline-4 rounded-lg'
                        preload='auto'
                        autoPlay
                        playsInline
                        muted
                        loop
                    />
            </div>

            <div className='w-[80%] lg:w-[35%] text-sm xl:text-base'>
                <ReactTyped
                    className='title-main text-base md:text-3xl font-bold text-white'
                    strings={['Cloud Community Club (C³)']}
                    typeSpeed={50}
                    startWhenVisible
                />
                <h2>🌐 A Student-Driven Tech Initiative</h2>
                <div className='w-full h-[1px] bg-white my-3'></div>
                <p className='my-2'>
                    As a newly established club, C³ aims to create a vibrant ecosystem where students can explore and excel in various domains of technology. We believe in bridging the gap between theoretical knowledge and practical application through hands-on experience.
                </p>
                <p className='my-2'>
                    Whether you're a beginner or experienced in any tech domain, our community welcomes everyone. We focus on collaborative learning, research opportunities, and real-world project experience to help you grow in your chosen field.
                </p>
                <p className='my-2'>
                    This is your platform to innovate, research, collaborate, and grow in the ever-evolving world of technology!
                </p>
            </div>
        
        </div>

        <div className='w-full h-[180px] bg-[#040404]'></div>

        <div className='flex flex-col'>
            <Image
                    src={logo}
                    className='z-10 hover:!scale-110 transition duration-300 ease-out mx-auto mb-6'
                    alt=''
                    width={250}
                    height={250}
                    unoptimized
            />

            <h1 className='title-main text-xl text-center sm:text-3xl font-extrabold text-white mb-10'>
                <span>Join us in Exploring the </span>
                <span className='text-yellow-300 animate-pulse drop-shadow-[0_0_10px_rgba(255,250,50,0.45)]'>
                    Future of Technology
                </span>
            </h1>

            <div className='flex flex-row overflow-x-scroll overflow-y-visible gap-10 py-[160px] px-[20px] my-[-160px] lg:justify-center no-scrollbar'>
                    {/* CARD: Cloud Innovation */}
                    <motion.div
                        ref={ref}
                        onAnimationComplete={() => {
                            setCard1Animating(false)
                        }}
                        onAnimationStart={() => {
                            setCard1Animating(true)
                        }}
                        onMouseEnter={() => {
                            playSfx_clunk()
                        }}
                        initial={{ opacity: 0, transform: 'translateX(-30%)' }}
                        animate={
                            isInView
                                ? { opacity: 1, transform: 'translateX(0%)' }
                                : ''
                        }
                        transition={{
                            duration: 1,
                            delay: 0.3,
                            ease: 'easeOut',
                        }}
                        className={`${card1Animating && 'pointer-events-none'} ${cardBaseClasses} outline-green-400 from-black via-[#073f1c] to-green-600 hover:drop-shadow-[0_15px_35px_rgba(50,255,100,0.35)] drop-shadow-[0_25px_25px_rgba(50,255,100,0.15)]`}
                    >
                        <div className='flex flex-col justify-center items-center w-[350px] h-full mx-auto'>
                            <motion.div
                                className='relative'
                                initial={{ transform: 'translateY(-4%)' }}
                                animate={{ transform: 'translateY(4%)' }}
                                transition={{
                                    repeat: Infinity,
                                    delay: 0.5,
                                    repeatType: 'mirror',
                                    type: 'tween',
                                    ease: 'backInOut',
                                    duration: 2,
                                }}
                            >
                                <FcElectronics
                                    className='w-[145px] h-[145px] drop-shadow-[0_25px_25px_rgba(0,0,0,1)]'
                                />
                            </motion.div>
                            <h1 className='title-main font-bold text-2xl text-center mt-7'>
                                Explore{' '}
                                <span className='text-green-300 drop-shadow-[0_0_10px_rgba(100,250,100,0.25)] animate-pulse'>
                                    Cloud Tech
                                </span>
                            </h1>
                            <p className='text-sm text-center py-2 px-8 leading-6'>
                                Dive into cutting-edge cloud technologies and platforms. Learn{' '}
                                <b>AWS, Azure, GCP</b>, and other emerging technologies. Get hands-on experience with{' '}
                                <b>containerization, serverless computing, and cloud architecture</b>.
                            </p>
                        </div>
                    </motion.div>

                    {/* CARD: Research & Innovation */}
                    <motion.div
                        ref={ref}
                        onAnimationComplete={() => {
                            setCard2Animating(false)
                        }}
                        onAnimationStart={() => {
                            setCard2Animating(true)
                        }}
                        onMouseEnter={() => {
                            playSfx_clunk()
                        }}
                        initial={{ opacity: 0, transform: 'translateY(30%)' }}
                        animate={
                            isInView
                                ? { opacity: 1, transform: 'translateY(0%)' }
                                : ''
                        }
                        transition={{
                            duration: 0.7,
                            delay: 0.6,
                            ease: 'easeOut',
                        }}
                        className={`${card2Animating && 'pointer-events-none'} ${cardBaseClasses} outline-blue-400 from-black via-blue-950 to-blue-600 hover:drop-shadow-[0_15px_35px_rgba(70,120,250,0.35)] drop-shadow-[0_25px_25px_rgba(70,120,250,0.15)]`}
                    >
                        <div className='flex flex-col justify-center items-center w-[350px] h-full mx-auto'>
                            <motion.div
                                className='relative'
                                initial={{ transform: 'translateY(-4%)' }}
                                animate={{ transform: 'translateY(4%)' }}
                                transition={{
                                    repeat: Infinity,
                                    delay: 1,
                                    repeatType: 'mirror',
                                    type: 'tween',
                                    ease: 'backInOut',
                                    duration: 2,
                                }}
                            >
                                <FcCollaboration
                                    className='w-[145px] h-[145px] drop-shadow-[0_25px_25px_rgba(0,0,0,1)]'
                                />
                            </motion.div>
                            <h1 className='title-main font-bold text-2xl text-center mt-7'>
                                Drive{' '}
                                <span className='text-blue-300 drop-shadow-[0_0_10px_rgba(125,100,250,0.25)] animate-pulse'>
                                    Innovation
                                </span>
                            </h1>
                            <p className='text-sm text-center py-2 px-8 leading-6'>
                                Engage in <b>research-driven activities</b> and contribute to{' '}
                                <b>open-source projects</b>. Collaborate on publishing papers and developing solutions for{' '}
                                <b>real-world challenges</b> in emerging tech.
                            </p>
                        </div>
                    </motion.div>

                    {/* CARD: Industry Connect */}
                    <motion.div
                        ref={ref}
                        onAnimationComplete={() => {
                            setCard3Animating(false)
                        }}
                        onAnimationStart={() => {
                            setCard3Animating(true)
                        }}
                        onMouseEnter={() => {
                            playSfx_clunk()
                        }}
                        initial={{ opacity: 0, transform: 'translateX(30%)' }}
                        animate={
                            isInView
                                ? { opacity: 1, transform: 'translateX(0%)' }
                                : ''
                        }
                        transition={{
                            duration: 1,
                            delay: 0.3,
                            ease: 'easeOut',
                        }}
                        className={`${card3Animating && 'pointer-events-none'} ${cardBaseClasses} outline-yellow-600 from-black via-yellow-950 to-yellow-600 hover:drop-shadow-[0_15px_35px_rgba(237,144,10,0.35)] drop-shadow-[0_25px_25px_rgba(237,144,10,0.15)]`}
                    >
                        <div className='flex flex-col justify-center items-center w-[350px] h-full mx-auto'>
                            <motion.div
                                className='relative'
                                initial={{ transform: 'translateY(-4%)' }}
                                animate={{ transform: 'translateY(4%)' }}
                                transition={{
                                    repeat: Infinity,
                                    delay: 1.5,
                                    repeatType: 'mirror',
                                    type: 'tween',
                                    ease: 'backInOut',
                                    duration: 2,
                                }}
                            >
                                <FcIdea
                                    className='w-[145px] h-[145px] drop-shadow-[0_25px_25px_rgba(0,0,0,1)]'
                                />
                            </motion.div>
                            <h1 className='title-main font-bold text-2xl text-center mt-7'>
                                Connect with{' '}
                                <span className='text-yellow-200 drop-shadow-[0_0_10px_rgba(255,250,100,0.25)] animate-pulse'>
                                    Industry
                                </span>
                            </h1>
                            <p className='text-sm text-center py-2 px-8 leading-6'>
                            Network with <b>industry leaders</b> and gain insights into the evolving tech landscape. Access{' '}
                            <b>mentorship opportunities</b> and build connections for your future career in{' '}
                            <b>cutting-edge innovation</b>.
                            </p>
                        </div>

                    </motion.div>
                </div>
                <p className='m-4 lg:hidden font-semibold text-neutral-400 animate-pulse'>drag to view cards →</p>
            </div>
        </div>
    )
}