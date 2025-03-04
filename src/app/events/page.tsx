'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, MapPin, ExternalLink, ChevronRight } from 'lucide-react'

// Past Events Data
const pastEvents = [
    {
        id: 1,
        title: "AI Hack Day",
        date: "March 16, 2024",
        time: "9:00 AM - 6:00 PM",
        location: "Sreenidhi Institute of Science and Technology",
        description: "A one-day hackathon focused on AI/ML innovations. Students developed creative solutions using artificial intelligence and machine learning.",
        image: "/assets/events/ai-hack-day.jpg",
        highlights: [
            "100+ Participants",
            "20+ Project Submissions",
            "5 Expert Judges",
            "Prizes worth ₹50,000"
        ],
        gallery: [
            "/assets/events/ai-hack-1.jpg",
            "/assets/events/ai-hack-2.jpg",
            "/assets/events/ai-hack-3.jpg"
        ]
    }
]

// Upcoming Events Data
const upcomingEvents = [
    {
        id: 1,
        title: "C³ Open Session",
        date: "April 6, 2024",
        time: "2:00 PM - 4:00 PM",
        location: "Sreenidhi Institute of Science and Technology",
        description: "Join us for an interactive session about cloud computing and modern technology. Learn about our community, upcoming activities, and how you can be part of C³.",
        image: "/assets/events/open-session.jpg",
        registrationLink: "/join-us",
        agenda: [
            "Introduction to Cloud Community Club",
            "Overview of Cloud Technologies",
            "Community Activities & Benefits",
            "Q&A Session",
            "Registration Process"
        ]
    }
]

export default function Events() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black">
            {/* Hero Section */}
            <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/assets/events/events-hero.jpg"
                        alt="Events Hero"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black" />
                </div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 text-center px-4"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        Our Events
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Join us in our journey of learning, innovation, and community building
                    </p>
                </motion.div>
            </div>

            {/* Upcoming Events Section */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-12"
                >
                    <h2 className="text-4xl font-bold text-white">Upcoming Events</h2>
                    <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-700 to-transparent ml-8" />
                </motion.div>

                <div className="grid grid-cols-1 gap-8">
                    {upcomingEvents.map((event) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                        >
                            <div className="md:flex">
                                <div className="md:w-1/3 relative h-64 md:h-auto overflow-hidden">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
                                </div>
                                <div className="p-8 md:w-2/3">
                                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                                        {event.title}
                                    </h3>
                                    
                                    <div className="flex flex-wrap gap-6 mb-6 text-gray-300">
                                        <div className="flex items-center">
                                            <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                                            {event.date}
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="w-5 h-5 mr-2 text-blue-400" />
                                            {event.time}
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                                            {event.location}
                                        </div>
                                    </div>

                                    <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                                        {event.description}
                                    </p>

                                    <div className="mb-8 bg-gray-800/50 rounded-lg p-6">
                                        <h4 className="text-white font-semibold mb-4 flex items-center">
                                            <ChevronRight className="w-5 h-5 mr-2 text-blue-400" />
                                            Event Agenda
                                        </h4>
                                        <ul className="space-y-2 text-gray-300">
                                            {event.agenda.map((item, index) => (
                                                <li key={index} className="flex items-center">
                                                    <div className="w-2 h-2 rounded-full bg-blue-400 mr-3" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Link 
                                        href={event.registrationLink}
                                        className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
                                    >
                                        Register Now
                                        <ExternalLink className="w-5 h-5 ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Past Events Section */}
            <section className="max-w-7xl mx-auto px-4 pb-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-12"
                >
                    <h2 className="text-4xl font-bold text-white">Past Events</h2>
                    <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-700 to-transparent ml-8" />
                </motion.div>

                <div className="grid grid-cols-1 gap-12">
                    {pastEvents.map((event) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                        >
                            <div className="relative h-[50vh]">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 flex items-end">
                                    <div className="p-8">
                                        <h3 className="text-4xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                                            {event.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-6 text-gray-300">
                                            <div className="flex items-center">
                                                <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                                                {event.date}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="w-5 h-5 mr-2 text-purple-400" />
                                                {event.time}
                                            </div>
                                            <div className="flex items-center">
                                                <MapPin className="w-5 h-5 mr-2 text-purple-400" />
                                                {event.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                                    {event.description}
                                </p>

                                <div className="mb-8">
                                    <h4 className="text-white font-semibold mb-6 text-xl">Event Highlights</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {event.highlights.map((highlight, index) => (
                                            <div 
                                                key={index}
                                                className="bg-gray-800/50 rounded-lg p-6 text-center text-gray-300 hover:bg-gray-800 transition-colors"
                                            >
                                                {highlight}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {event.gallery.map((image, index) => (
                                        <div 
                                            key={index} 
                                            className="relative h-64 rounded-lg overflow-hidden group/image"
                                        >
                                            <Image
                                                src={image}
                                                alt={`${event.title} gallery image ${index + 1}`}
                                                fill
                                                className="object-cover group-hover/image:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/image:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
} 