'use client'

import React from 'react'
import { ReactTyped } from 'react-typed'
import { Element } from 'react-scroll'
import useSound from 'use-sound'
import { motion } from 'framer-motion'

import {
    SiAmazon,
    SiGooglecloud,
    SiDocker,
    SiKubernetes,
    SiTerraform,
    SiGitlab,
    SiJenkins,
    SiGrafana,
    SiPrometheus,
    SiRedis,
    SiPython,
    SiGo,
    SiRust,
    SiLinux,
    SiTypescript,
} from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'

const SECTION_TYPED_KEYWORDS = [
    'Cloud Platforms',
    'DevOps Tools',
    'Monitoring Solutions',
    'Databases',
    'Infrastructure as Code',
    'CI/CD Pipelines',
    'Cloud Native Apps',
    'Open Source Platforms',
]

const sfxClick = '/assets/sound_fx/click.mp3'
const conveyorFront = '/assets/home/conveyor_front.webp'
const cloudIcon = '/assets/ccc_logo.webp'

const TECH_TEXT_CLASSES = 'title-main my-auto mx-10 font-semibold text-xl md:text-2xl'
const TECH_ICON_CLASSES = 'my-auto w-[60px] md:w-[72px] h-full'
const TECH_ICON_SHADOW = { filter: 'drop-shadow(4px 4px 2px rgba(0, 0, 0, 1))' }

const TECHNOLOGIES: { [key: string]: JSX.Element } = {
    'AWS': (
        <SiAmazon
            color='#FF9900'
            className={TECH_ICON_CLASSES}
            style={TECH_ICON_SHADOW}
        />
    ),
    'Google Cloud': (
        <SiGooglecloud
            color='#4285F4'
            className={TECH_ICON_CLASSES}
            style={TECH_ICON_SHADOW}
        />
    ),
    'Azure': (
        <VscAzure
            color='#0089D6'
            className={TECH_ICON_CLASSES}
            style={TECH_ICON_SHADOW}
        />
    ),
    'Docker': (
        <SiDocker
            color='#2496ED'
            className={TECH_ICON_CLASSES}
            style={TECH_ICON_SHADOW}
        />
    ),
    'Kubernetes': (
        <SiKubernetes
            color='#326CE5'
            className={TECH_ICON_CLASSES}
            style={TECH_ICON_SHADOW}
        />
    ),
    'Terraform': (
        <SiTerraform
            color='#7B42BC'
            className={TECH_ICON_CLASSES}
            style={TECH_ICON_SHADOW}
        />
    ),
    'Jenkins': (
        <SiJenkins
            color='#D24939'
            className={TECH_ICON_CLASSES}
            style={TECH_ICON_SHADOW}
        />
    ),
    'Gitlab': (
        <SiGitlab
            color='#FC6D26'
            className={TECH_ICON_CLASSES}
            style={TECH_ICON_SHADOW}
        />
    ),
    'Grafana': (
        <SiGrafana
            color='#F46800'
            className={TECH_ICON_CLASSES}
            style={TECH_ICON_SHADOW}
        />
    ),
    'Prometheus': (
        <SiPrometheus
            color='#E6522C'
            className={TECH_ICON_CLASSES}
            style={TECH_ICON_SHADOW}
        />
    ),
    'Redis': (
        <SiRedis
            color='#DC382D'
            className={TECH_ICON_CLASSES}
            style={TECH_ICON_SHADOW}
        />
    ),
    'Python': (
        <SiPython
            color='#3776AB'
            className={TECH_ICON_CLASSES}
            style={TECH_ICON_SHADOW}
        />
    ),
    'Go': (
        <SiGo
            color='#00ADD8'
            className={TECH_ICON_CLASSES}
            style={TECH_ICON_SHADOW}
        />
    ),
    'TypeScript': (
        <SiTypescript
            color='#3178C6'
            className={TECH_ICON_CLASSES}
            style={TECH_ICON_SHADOW}
        />
    ),
    'Rust': (
        <SiRust
            color='#DEA584' // Rust logo color
            className={TECH_ICON_CLASSES}
            style={TECH_ICON_SHADOW}
        />
    ),
    'Linux': (
        <SiLinux
            color='#F7F7F7' // Linux logo color (light grey)
            className={TECH_ICON_CLASSES}
            style={TECH_ICON_SHADOW}
        />
    ),
}

export default function Technologies(): React.ReactNode {
    const [playSfx_Click] = useSound(sfxClick)

    return (
        <div className='w-full h-full mt-60 text-gray-300 overflow-hidden'>
            <Element name='tech' />

            <motion.img
                width={250}
                height={250}
                src={cloudIcon}
                alt="Cloud icon"
                className='mx-auto my-4 md:my-10 hover:!scale-105 transition duration-300 ease-out'
                initial={{ transform: 'translateY(-10%)' }}
                animate={{ transform: 'translateY(10%)' }}
                transition={{
                    repeat: Infinity,
                    repeatType: 'mirror',
                    type: 'tween',
                    ease: 'linear',
                    duration: 2,
                }}
            />

            <h1 className='title-main mx-auto p-4 text-3xl text-center sm:text-[40px] font-extrabold text-[#e7e9ef]'>
                <span className='text-shadow shadow-gray-700'>
                    Explore Cloud{' '}
                </span>
                <ReactTyped
                    strings={SECTION_TYPED_KEYWORDS}
                    typeSpeed={50}
                    backSpeed={75}
                    backDelay={5000}
                    loop
                    className='bg-gradient-to-t from-blue-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(50,150,255,0.7)]'
                ></ReactTyped>
            </h1>

            <div className='relative'>
                <div className='z-10 absolute bg-gradient-to-r from-black to-transparent left-0 h-full w-[28vw] pointer-events-none'></div>
                <div className='z-10 absolute bg-gradient-to-l from-black to-transparent right-0 h-full w-[28vw] pointer-events-none'></div>
                <div
                    className='flex my-10 h-[160px] bg-repeat-x bg-bottom'
                    style={{ backgroundImage: `url(${conveyorFront})` }}
                >
                    <motion.div
                        className='flex h-full'
                        initial={{ transform: 'translateX(-100%)' }}
                        animate={{ transform: 'translateX(100vw)' }}
                        transition={{
                            repeat: Infinity,
                            type: 'tween',
                            ease: 'linear',
                            duration: 36,
                        }}
                    >
                        {Object.entries(TECHNOLOGIES).map(
                            ([technology_name]) => {
                                return (
                                    <div
                                        onMouseEnter={() => playSfx_Click()}
                                        key={technology_name}
                                        className='flex h-[90px] md:h-[110px] mt-[22px] md:mt-0 mx-5 hover:mx-7 hover:scale-110 duration-300 bg-[#000000bb] outline outline-1 outline-white text-white rounded-xl pl-6'
                                    >
                                        {TECHNOLOGIES[technology_name]}
                                        <ReactTyped
                                            strings={[technology_name]}
                                            className={TECH_TEXT_CLASSES}
                                        ></ReactTyped>
                                    </div>
                                )
                            }
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
