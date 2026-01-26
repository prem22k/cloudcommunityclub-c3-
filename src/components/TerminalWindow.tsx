'use client'

import React from 'react'

import { GitBranch } from 'lucide-react'

interface TerminalWindowProps {
    children?: React.ReactNode
    title?: string
    cursorLine?: number
    cursorCol?: number
    activeLine?: number
    containerRef?: React.RefObject<HTMLDivElement | null>
}

export default function TerminalWindow({
    children,
    title = 'user@c3-cloud:~',
    cursorLine = 1,
    cursorCol = 1,
    activeLine,
    containerRef
}: TerminalWindowProps) {
    return (
        <div className="flex items-center justify-center w-full p-4">
            <div className="w-full max-w-3xl rounded-xl overflow-hidden border border-[#6272a4]/30 shadow-2xl shadow-black/50 bg-[#282a36]">
                {/* Title Bar */}
                <div className="flex items-center px-4 py-3 bg-[#282a36] border-b border-[#6272a4]/30">
                    {/* Traffic Lights */}
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5555] hover:bg-[#ff5555]/80 transition-colors cursor-pointer" />
                        <div className="w-3 h-3 rounded-full bg-[#f1fa8c] hover:bg-[#f1fa8c]/80 transition-colors cursor-pointer" />
                        <div className="w-3 h-3 rounded-full bg-[#50fa7b] hover:bg-[#50fa7b]/80 transition-colors cursor-pointer" />
                    </div>

                    {/* Title */}
                    <div className="flex-1 text-center">
                        <span className="font-mono text-sm text-[#f8f8f2]/60">
                            {title}
                        </span>
                    </div>

                    {/* Spacer to balance the traffic lights */}
                    <div className="w-[52px]" />
                </div>

                {/* Terminal Content */}
                <div ref={containerRef} className="bg-[#282a36]/95 backdrop-blur-md flex min-h-[300px] font-mono text-sm overflow-hidden relative">
                    {/* Active Line Highlight */}
                    {activeLine && (
                        <div
                            className="absolute left-0 w-full h-6 bg-white/5 border-l-2 border-[#bd93f9] pointer-events-none z-0 transition-all duration-75"
                            style={{ top: `${(activeLine - 1) * 24 + 24}px` }}
                        />
                    )}

                    {/* Gutter / Line Numbers */}
                    <div className="flex flex-col items-end px-3 py-6 text-[#6272a4] border-r border-[#6272a4]/30 select-none bg-[#282a36] min-w-[3rem] z-10 relative">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className={`leading-6 text-xs transition-colors ${activeLine === i + 1 ? 'text-[#f8f8f2] font-bold' : 'opacity-50'}`}>
                                {i + 1}
                            </div>
                        ))}
                    </div>

                    {/* Code Area */}
                    <div className="flex-1 p-6 text-[#f8f8f2] leading-6 relative z-10">
                        {children || (
                            <>
                                <p className="text-[#6272a4]">{'// Welcome to Cloud Community Club v1.0.0'}</p>
                                <p className="mt-0">
                                    <span className="text-[#ff79c6]">➜</span> <span className="text-[#8be9fd]">~</span> <span className="text-[#f1fa8c]">init_sequence.sh</span>
                                </p>
                                <p className="mt-6 flex items-center">
                                    <span className="text-[#50fa7b]">✔</span>
                                    <span className="ml-2 text-[#f8f8f2] mb-1">System ready...</span>
                                    <span className="ml-2 w-2 h-4 bg-[#50fa7b] animate-pulse" />
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* Status Bar */}
                <div className="h-8 bg-[#191622] border-t border-[#6272a4]/30 flex items-center px-4 justify-between font-mono text-xs select-none">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-[#ff79c6] hover:bg-[#ff79c6]/10 px-2 py-0.5 rounded cursor-pointer transition-colors">
                            <GitBranch size={14} />
                            <span>main*</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#6272a4]">
                            <span className="hover:text-[#f8f8f2] cursor-pointer transition-colors">0 errors</span>
                            <span className="hover:text-[#f8f8f2] cursor-pointer transition-colors">0 warnings</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-[#f8f8f2]">
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-[#6272a4]/20 px-2 py-0.5 rounded transition-colors text-[#8be9fd]">
                            <span>Ln {cursorLine}, Col {cursorCol}</span>
                        </div>
                        <div className="cursor-pointer hover:text-[#50fa7b] transition-colors hidden sm:block">Spaces: 4</div>
                        <div className="cursor-pointer hover:text-[#50fa7b] transition-colors hidden sm:block">UTF-8</div>
                        <div className="flex items-center gap-1 cursor-pointer hover:text-[#bd93f9] transition-colors">
                            <span className="text-[#bd93f9]">{`{ }`}</span>
                            <span>TypeScript JSX</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

