'use client'

import React from 'react'
import { Rocket, BookOpen, FlaskConical, Users, LucideIcon } from 'lucide-react'
import { ReactTyped } from 'react-typed'
import Link from 'next/link'
import { SiDiscord, SiLinkedin, SiInstagram, SiGithub } from 'react-icons/si'
import { FaXTwitter } from 'react-icons/fa6'

type Activity = {
  title: string;
  description: string;
  icon: LucideIcon;
  side: "left" | "right";
};

const activities: Activity[] = [
  {
    title: "Explore Cutting Edge Tech",
    description: "Come let's get ready with industry ready tools and stay ahead in the technology landscape",
    icon: Rocket,
    side: "left"
  },
  {
    title: "Open Source Contributions",
    description: "Let's contribute to free and open source projects and make a meaningful impact in the tech community",
    icon: BookOpen,
    side: "right"
  },
  {
    title: "Research Driven Activities",
    description: "Explore and advance in your field of interest through research papers and innovative projects",
    icon: FlaskConical,
    side: "left"
  },
  {
    title: "Networking",
    description: "Let's connect with like minded people, because networking is networth in the tech industry",
    icon: Users,
    side: "right"
  }
];

function ActivityItem({ title, description, icon: Icon, side }: Activity) {
  const isLeft = side === "left";
  
  return (
    <div className={`flex ${isLeft ? 'md:pr-12 pr-0' : 'md:pl-12 pl-0'}`}>
      <div className={`flex flex-col ${isLeft ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-center text-center w-full`}>
        <div className={`flex items-center gap-4 ${isLeft ? 'md:flex-row flex-col' : 'md:flex-row-reverse flex-col'}`}>
          <ReactTyped
            strings={[title]}
            typeSpeed={50}
            className="text-xl md:text-2xl font-bold text-[#e7e9ef] text-shadow shadow-gray-700"
          />
          <div className="p-2 md:p-3 bg-[#030303] outline outline-1 outline-white rounded-full hover:outline-2 hover:outline-white transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </div>
        </div>
        <p className="mt-3 text-base md:text-lg text-neutral-400 max-w-md">{description}</p>
        {/* Horizontal line with glow effect */}
        <div className={`w-full h-[1px] bg-gradient-to-${isLeft ? 'l' : 'r'} from-white to-transparent mt-6 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]`} />
      </div>
    </div>
  );
}

export default function Overview(): React.ReactNode {
    return (
        <div className='py-16 md:py-72 flex flex-col justify-center items-center bg-gradient-to-b from-black to-[#000000]'>
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                        <ReactTyped
                            strings={['What We Do']}
                            typeSpeed={50}
                            className="text-shadow shadow-gray-700 text-[#e7e9ef]"
                        />
                    </h2>
                    <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto px-4">
                        Join us in our journey to explore, contribute, research, and network in the world of technology.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center Line with glow */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white to-transparent transform -translate-x-1/2 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
                    {/* Activities */}
                    <div className="relative space-y-16 md:space-y-24">
                        {activities.map((activity, index) => (
                            <div key={index} className="flex">
                                {activity.side === "left" ? (
                                    <>
                                        <div className="md:w-1/2 w-full">
                                            <ActivityItem {...activity} />
                                        </div>
                                        <div className="md:w-1/2 hidden md:block" />
                                    </>
                                ) : (
                                    <>
                                        <div className="md:w-1/2 hidden md:block" />
                                        <div className="md:w-1/2 w-full">
                                            <ActivityItem {...activity} />
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="mt-16 md:mt-24"></div>

            <div className='border-t-[1px] border-gradient-to-r from-transparent via-white to-transparent py-8 px-4 text-center w-full'>
                <p className='text-lg'>🤝</p>
                <p className='title-main font-semibold text-xl'>Connect with C³</p>
                <p className='title-main text-neutral-500 font-semibold'>Join our Community</p>

                <div className='flex flex-row flex-wrap gap-3 justify-center py-4'>
                    <Link href='https://discord.gg/dBNXWDKhrD' target='_blank'>
                        <button className='flex group w-[140px] sm:w-[160px] md:w-[180px] md:hover:w-[200px] justify-center bg-neutral-700 dark:bg-neutral-900 bg-opacity-80 rounded-md gap-2 py-2 md:py-3 active:scale-95 hover:bg-[#5865F2] hover:outline-4 hover:text-white text-lg md:text-xl font-bold active:outline-2 hover:outline-double outline-white border-[1px] border-neutral-800 hover:outline-[#5865F2] active:outline-neutral-200 duration-200 active:duration-200'>
                            <SiDiscord className='my-auto group-hover:text-white group-hover:text-xl md:group-hover:text-2xl transition-all duration-300' />
                            Discord
                        </button>
                    </Link>

                    <Link href='https://www.linkedin.com/company/cloudcommunityclub' target='_blank'>
                        <button className='flex group w-[140px] sm:w-[160px] md:w-[180px] md:hover:w-[200px] justify-center bg-neutral-700 dark:bg-neutral-900 bg-opacity-80 rounded-md gap-2 py-2 md:py-3 active:scale-95 hover:bg-blue-600 hover:outline-4 hover:text-white text-lg md:text-xl font-bold active:outline-2 hover:outline-double outline-white border-[1px] border-neutral-800 hover:outline-blue-400 active:outline-neutral-200 duration-200 active:duration-200'>
                            <SiLinkedin className='my-auto group-hover:text-white group-hover:text-xl md:group-hover:text-2xl transition-all duration-300' />
                            LinkedIn
                        </button>
                    </Link>

                    <Link href='https://www.instagram.com/c3.snist/' target='_blank'>
                        <button className='flex group w-[140px] sm:w-[160px] md:w-[180px] md:hover:w-[200px] justify-center bg-neutral-700 dark:bg-neutral-900 bg-opacity-80 rounded-md gap-2 py-2 md:py-3 active:scale-95 hover:bg-[#E4405F] hover:outline-4 hover:text-white text-lg md:text-xl font-bold active:outline-2 hover:outline-double outline-white border-[1px] border-neutral-800 hover:outline-[#E4405F] active:outline-neutral-200 duration-200 active:duration-200'>
                            <SiInstagram className='my-auto group-hover:text-white group-hover:text-xl md:group-hover:text-2xl transition-all duration-300' />
                            Instagram
                        </button>
                    </Link>

                    <Link href='https://github.com/CloudCommunityClub' target='_blank'>
                        <button className='flex group w-[140px] sm:w-[160px] md:w-[180px] md:hover:w-[200px] justify-center bg-neutral-700 dark:bg-neutral-900 bg-opacity-80 rounded-md gap-2 py-2 md:py-3 active:scale-95 hover:bg-neutral-800 hover:outline-4 hover:text-white text-lg md:text-xl font-bold active:outline-2 hover:outline-double outline-white border-[1px] border-neutral-800 hover:outline-neutral-700 active:outline-neutral-200 duration-200 active:duration-200'>
                            <SiGithub className='my-auto group-hover:text-white group-hover:text-xl md:group-hover:text-2xl transition-all duration-300' />
                            GitHub
                        </button>
                    </Link>

                    <Link href='https://twitter.com/c3club' target='_blank'>
                        <button className='flex group w-[140px] sm:w-[160px] md:w-[180px] md:hover:w-[200px] justify-center bg-neutral-700 dark:bg-neutral-900 bg-opacity-80 rounded-md gap-2 py-2 md:py-3 active:scale-95 hover:bg-black hover:outline-4 hover:text-white text-lg md:text-xl font-bold active:outline-2 hover:outline-double outline-white border-[1px] border-neutral-800 hover:outline-neutral-700 active:outline-neutral-200 duration-200 active:duration-200'>
                            <FaXTwitter className='my-auto group-hover:text-white group-hover:text-xl md:group-hover:text-2xl transition-all duration-300' />
                            Twitter
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}