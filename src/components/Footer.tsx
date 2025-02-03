import Link from 'next/link'
import Image from 'next/image'
import { SiDiscord, SiLinkedin, SiGithub, SiInstagram } from 'react-icons/si'
import { FaXTwitter } from 'react-icons/fa6'
import { MdOutlineEmail } from 'react-icons/md'

export default function Footer() {
    return (
        <div className='w-full h-full bg-gradient-to-b from-neutral-800 dark:from-neutral-950 to-neutral-950 dark:to-black text-lg font-semibold pt-4 text-center'>
            
            <p className='font-semibold'>Connect with C³</p>

            <div className='flex flex-row flex-wrap gap-3 justify-center py-4 overflow-x-hidden'>
                <Link
                    href='https://discord.gg/dBNXWDKhrD'
                    target='_blank'
                >
                    <button className='flex group w-full justify-center bg-neutral-700 dark:bg-neutral-900 bg-opacity-80 rounded-md gap-2 py-2 px-4 active:scale-95 hover:bg-[#5865F2] hover:outline-4 hover:text-white active:outline-2 hover:outline-double outline-white border-[1px] border-neutral-800 hover:outline-[#5865F2] active:outline-neutral-200 duration-200 active:duration-200'>
                        <SiDiscord className='my-auto group-hover:text-white' />
                        Discord
                    </button>
                </Link>

                <Link
                    href='https://www.instagram.com/c3.snist/'
                    target='_blank'
                >
                    <button className='flex group w-full justify-center bg-neutral-700 dark:bg-neutral-900 bg-opacity-80 rounded-md gap-2 py-2 px-4 active:scale-95 hover:bg-[#E4405F] hover:outline-4 hover:text-white active:outline-2 hover:outline-double outline-white border-[1px] border-neutral-800 hover:outline-[#E4405F] active:outline-neutral-200 duration-200 active:duration-200'>
                        <SiInstagram className='my-auto group-hover:text-white' />
                        Instagram
                    </button>
                </Link>

                <Link
                    href='https://www.linkedin.com/company/cloud-community-club'
                    target='_blank'
                >
                    <button className='flex group w-full justify-center bg-neutral-700 dark:bg-neutral-900 bg-opacity-80 rounded-md gap-2 py-2 px-4 active:scale-95 hover:bg-[#0A66C2] hover:outline-4 hover:text-white active:outline-2 hover:outline-double outline-white border-[1px] border-neutral-800 hover:outline-[#0A66C2] active:outline-neutral-200 duration-200 active:duration-200'>
                        <SiLinkedin className='my-auto group-hover:text-white' />
                        LinkedIn
                    </button>
                </Link>

                <Link
                    href='https://github.com/your-org'
                    target='_blank'
                >
                    <button className='flex group w-full justify-center bg-neutral-700 dark:bg-neutral-900 bg-opacity-80 rounded-md gap-1 py-2 px-4 active:scale-95 hover:bg-[#24292e] hover:outline-4 hover:text-white active:outline-2 hover:outline-double outline-white border-[1px] border-neutral-800 hover:outline-[#24292e] active:outline-neutral-200 duration-200 active:duration-200'>
                        <SiGithub className='my-auto group-hover:text-white' />
                        GitHub
                    </button>
                </Link>

                <Link href='https://twitter.com/c3club' target='_blank'>
                    <button className='flex group w-full justify-center bg-neutral-700 dark:bg-neutral-900 bg-opacity-80 rounded-md gap-2 py-2 px-4 active:scale-95 hover:bg-black hover:outline-4 hover:text-white active:outline-2 hover:outline-double outline-white border-[1px] border-neutral-800 hover:outline-neutral-700 active:outline-neutral-200 duration-200 active:duration-200'>
                        <FaXTwitter className='my-auto group-hover:text-white' />
                        X
                    </button>
                </Link>

                <Link href='mailto:C3@snist.cloudcommunityclub.in'>
                    <button className='flex group w-full justify-center bg-neutral-700 dark:bg-neutral-900 bg-opacity-80 rounded-md gap-2 py-2 px-4 active:scale-95 hover:bg-[#EA4335] hover:outline-4 hover:text-white active:outline-2 hover:outline-double outline-white border-[1px] border-neutral-800 hover:outline-[#EA4335] active:outline-neutral-200 duration-200 active:duration-200'>
                        <MdOutlineEmail className='my-auto group-hover:text-white' />
                        Email
                    </button>
                </Link>
            </div>

            <div className='flex flex-row items-center justify-center gap-4 py-2 w-full'>
                <Link href='https://sreenidhi.edu.in/' target='_blank'>
                    <Image
                        src='/assets/bits/sreenidhi-logo.png'  // Add your college logo
                        width={250}
                        height={250}
                        alt='College Logo'
                        unoptimized
                    />
                </Link>
            </div>

            <div className='pt-4 pb-10'>
                <Link href='https://github.com/your-org/website' target='_blank'>
                    <p className='text-blue-500 text-sm sm:text-lg'>
                        Built with 💙 by C³ members
                    </p>
                </Link>
                <p className='text-neutral-500 text-sm sm:text-lg'>
                    Copyright ©️ Cloud Community Club (C³) 2024
                </p>
            </div>
        </div>
    )
}