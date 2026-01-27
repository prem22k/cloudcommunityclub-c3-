'use client'

import Image from 'next/image'

const logo = '/assets/Designer.webp'

export default function Recruitment(): React.ReactNode {
    return (
        <div className='w-full h-[220vh] relative overflow-hidden'>
            {/* top gradient */}
            <div className='absolute top-0 w-full h-[15%] bg-gradient-to-b from-black to-transparent' />
            {/* bottom gradient */}
            <div className='absolute bottom-0 w-full h-[30%] bg-gradient-to-t from-[#0a0a0a] to-transparent' />

            <Image
                src='/assets/home/spaces.webp'
                width={1600}
                height={1600}
                alt='space background'
                className='-z-10 object-cover aspect-auto absolute w-full h-full opacity-[50%]'
                loading="lazy"
                quality={75}
                sizes="100vw"
            />

            <div className='w-full h-[110vh] flex absolute bottom-[12rem] flex-col gap-4 justify-center items-center'>

                <Image
                    src={logo}
                    width={200}
                    height={200}
                    alt=''
                    className='z-10 hover:!scale-105 transition duration-300 ease-out'
                    unoptimized
                />

                <div className='pt-4 pb-10'>
                    <h1 className='title-main w-full text-center text-4xl font-semibold'>
                        <span className='text-blue-400 drop-shadow-[0_0_10px_rgba(50,150,250,0.45)]'>
                            Join C³.{' '}
                        </span>
                        <span className='text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.45)]'>
                            Cloud Community Club.
                        </span>
                    </h1>
                    <h1 className='title-main w-full text-center text-3xl md:text-5xl font-semibold mt-4 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]'>
                        Building the Future of Technology.
                    </h1>
                </div>

                {/* Community Section */}
                <div className='w-[75%]'>
                    <h2 className='title-main text-center text-2xl font-semibold mb-4 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]'>
                        Join Our Community
                    </h2>

                    {/* Discord Widget */}
                    <iframe
                        src="https://e.widgetbot.io/channels/1316108296075218944/1316108302404550658"
                        title="WidgetBot Discord Chat"
                        allow="clipboard-write; fullscreen"
                        height="600"
                        className='rounded-2xl drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]'
                        width="100%"
                        loading="lazy"
                    >
                    </iframe>

                    <a href='https://discord.gg/dBNXWDKhrD' target='_blank' className='w-[75%] h-[72px] hover:scale-[101%] hover:animate-pulse transition-all opacity-70 hover:opacity-85 duration-300'>
                        <iframe
                            title='Discord Widget'
                            src='https://ptb.discord.com/widget?id=1316108296075218944&theme=dark'
                            width='100%'
                            height='72'
                            className='rounded-2xl pointer-events-none'
                            sandbox='allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts'
                            loading="lazy"
                        ></iframe>
                        <p className='font-semibold mt-2 ml-2'>👉 Click to join us!</p>
                    </a>

                </div>
            </div>
        </div>
    )
}
