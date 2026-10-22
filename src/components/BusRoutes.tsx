'use client'

import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Route, Phone, User, Clock } from 'lucide-react'
import busRoutesData from '@/data/bus-routes.json'

type BusStop = {
    stopOrder: number
    boardingPoint: string
    pickupTime: string | null
}

type BusRouteItem = {
    routeNo: number
    routeManager: string
    phone: string
    destination: string
    stops: BusStop[]
}

const routes = busRoutesData as BusRouteItem[]

export default function BusRoutes(): React.ReactNode {
    const [query, setQuery] = useState('')
    const [expandedRoutes, setExpandedRoutes] = useState<Set<number>>(new Set())

    const filteredRoutes = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()
        if (!normalizedQuery) return routes

        // Search by route number, destination, or any boarding point.
        return routes.filter((route) => {
            const matchRouteNumber = String(route.routeNo).includes(normalizedQuery)
            const matchDestination = route.destination.toLowerCase().includes(normalizedQuery)
            const matchBoardingPoint = route.stops.some((stop) =>
                stop.boardingPoint.toLowerCase().includes(normalizedQuery)
            )

            return matchRouteNumber || matchDestination || matchBoardingPoint
        })
    }, [query])

    const toggleExpanded = (routeNo: number) => {
        setExpandedRoutes((prev) => {
            const next = new Set(prev)
            if (next.has(routeNo)) {
                next.delete(routeNo)
            } else {
                next.add(routeNo)
            }
            return next
        })
    }

    return (
        <section className='min-h-screen bg-gradient-to-b from-black via-[#0a0f1f] to-black pt-28 pb-16 px-4 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-7xl'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='mb-8'
                >
                    <h1 className='title-main text-3xl sm:text-4xl md:text-5xl font-bold text-white'>
                        Bus Routes
                    </h1>
                    <p className='mt-3 text-sm sm:text-base text-zinc-300 max-w-3xl'>
                        Find your route by boarding point, route number, or destination.
                        Expand a route card to view all stops and pickup times.
                    </p>
                </motion.div>

                <div className='relative mb-8'>
                    <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400' size={18} />
                    <input
                        type='text'
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder='Search by boarding point, route number, or destination'
                        className='w-full rounded-xl border border-zinc-700 bg-zinc-900/70 pl-10 pr-4 py-3 text-sm sm:text-base text-white placeholder-zinc-500 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                    />
                </div>

                <div className='mb-6 text-xs sm:text-sm text-zinc-400'>
                    Showing {filteredRoutes.length} of {routes.length} routes
                </div>

                {filteredRoutes.length === 0 ? (
                    <div className='rounded-2xl border border-zinc-700 bg-zinc-900/40 p-8 text-center text-zinc-300'>
                        No routes found for your search.
                    </div>
                ) : (
                    <div className='grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2'>
                        {filteredRoutes.map((route) => {
                            const isExpanded = expandedRoutes.has(route.routeNo)
                            const visibleStops = isExpanded ? route.stops : route.stops.slice(0, 4)

                            return (
                                <motion.article
                                    key={route.routeNo}
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className='min-w-0 rounded-2xl border border-zinc-700 bg-gradient-to-b from-zinc-900/80 to-black/90 p-5 shadow-[0_12px_36px_rgba(0,0,0,0.28)]'
                                >
                                    <div className='flex items-start justify-between gap-3'>
                                        <div className='min-w-0'>
                                            <div className='inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-300'>
                                                <Route size={14} className='mr-1.5' /> Route {route.routeNo}
                                            </div>
                                            <h2 className='mt-3 text-lg sm:text-xl font-semibold text-white break-words'>
                                                Destination: {route.destination}
                                            </h2>
                                        </div>
                                        <div className='shrink-0 text-[11px] sm:text-xs text-zinc-400'>
                                            {route.stops.length} stops
                                        </div>
                                    </div>

                                    <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm'>
                                        <p className='text-zinc-200 flex items-start gap-2 min-w-0'>
                                            <User size={15} className='mt-0.5 shrink-0 text-zinc-400' />
                                            <span className='min-w-0 break-words'>
                                                <span className='font-medium'>Manager:</span> {route.routeManager}
                                            </span>
                                        </p>
                                        <p className='text-zinc-200 flex items-start gap-2 min-w-0'>
                                            <Phone size={15} className='mt-0.5 shrink-0 text-zinc-400' />
                                            <span className='min-w-0 break-words'>
                                                <span className='font-medium'>Phone:</span> {route.phone}
                                            </span>
                                        </p>
                                    </div>

                                    <div className='mt-5 max-w-full overflow-x-auto rounded-xl border border-zinc-800'>
                                        <div className='grid grid-cols-[56px_minmax(0,1fr)_96px] bg-zinc-900/80 px-3 py-2 text-[11px] sm:text-xs uppercase tracking-wide text-zinc-400'>
                                            <span>#</span>
                                            <span className='min-w-0 break-words'>Boarding Point</span>
                                            <span className='whitespace-nowrap'>Time</span>
                                        </div>

                                        {visibleStops.map((stop) => (
                                            <div
                                                key={`${route.routeNo}-${stop.stopOrder}`}
                                                className='grid grid-cols-[56px_minmax(0,1fr)_96px] items-start gap-2 px-3 py-2.5 text-sm border-t border-zinc-800/80'
                                            >
                                                <span className='text-zinc-400'>{stop.stopOrder}</span>
                                                <span className='text-zinc-100 flex min-w-0 items-start gap-1.5'>
                                                    <MapPin size={14} className='mt-0.5 shrink-0 text-zinc-500' />
                                                    <span className='min-w-0 break-words'>{stop.boardingPoint}</span>
                                                </span>
                                                <span className='text-zinc-300 inline-flex shrink-0 items-center gap-1 whitespace-nowrap'>
                                                    <Clock size={13} className='text-zinc-500' />
                                                    {stop.pickupTime ?? '--'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {route.stops.length > 4 ? (
                                        <button
                                            type='button'
                                            className='mt-4 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors'
                                            onClick={() => toggleExpanded(route.routeNo)}
                                        >
                                            {isExpanded ? 'Show Less' : 'View Full Route'}
                                        </button>
                                    ) : null}
                                </motion.article>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}
