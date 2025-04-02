'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, MapPin, ExternalLink, ChevronRight, Users, Award, Tag } from 'lucide-react'

// Past Events Data
const pastEvents = [
    {
        id: 1,
        title: "AI Hack Day",
        date: "February 22, 2024",
        time: "9:00 AM - 4:00 PM",
        location: "Sreenidhi Institute of Science and Technology",
        description: "AI Hack Day 2025 is a national-level hackathon designed to inspire the brightest minds to harness the power of Artificial Intelligence to tackle real-world challenges. This event brings together students, industry experts, and cutting-edge AI tools in a collaborative space where innovation meets impact.",
        image: "/assets/events/ai-hack-day-main.jpeg",
        highlights: [
            "250+ Participants",
            "80+ Project Submissions",
            "4 Industry mentors"
        ],
        gallery: [
            "/assets/events/ai-hackday1.jpeg",
            "/assets/events/ai-hackday2.jpeg",
            "/assets/events/ai-hackday3.jpeg",
            "/assets/events/ai-hackday4.jpeg"
        ],
        tags: ["Hackathon", "AI", "Competition"]
    },
    {
        id: 2,
        title: "C³ Inaugural & Open Session",
        date: "March 10th, 2024",
        time: "1:30 PM - 3:30 PM",
        location: "Sreenidhi Institute of Science and Technology, Seminar hall-2",
        description: "The Cloud Community Club (C³) was officially inaugurated at SNIST with great enthusiasm. The event introduced students to our tech community focused on Open-source, Research, Institution-centric Projects, Deployment and cutting-edge technologies. Students learned about our community vision, upcoming activities, and how to become part of the C³ ecosystem.",
        image: "/assets/events/open-session-main.jpg",
        highlights: [
            "150+ Attendees",
            "Introduction to Project Schools",
            "Community Vision Presentation",
            "Interactive Q&A Session"
        ],
        gallery: [
            "/assets/events/open-session-main.jpg"
        ],
        tags: ["Inaugural", "Community", "Orientation"]
    }
]

// Upcoming Events Data
const upcomingEvents = [
    {
        id: 1,
        title: "Cloud Computing Workshop",
        date: "June 15th, 2024",
        time: "10:00 AM - 4:00 PM",
        location: "Sreenidhi Institute of Science and Technology, Computer Lab 3",
        description: "Join us for a hands-on workshop on cloud computing fundamentals. Learn about cloud architecture, deployment models, and get practical experience with major cloud platforms. This workshop is perfect for beginners looking to start their cloud journey.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        registrationLink: "/join-us",
        agenda: [
            "Introduction to Cloud Computing",
            "Cloud Service Models (IaaS, PaaS, SaaS)",
            "Hands-on with AWS/Azure/GCP",
            "Deploying Your First Cloud Application",
            "Best Practices & Security Considerations"
        ],
        tags: ["Workshop", "Cloud", "Hands-on"]
    },
    {
        id: 2,
        title: "Project Schools Kickoff",
        date: "July 5th, 2024",
        time: "2:00 PM - 5:00 PM",
        location: "Sreenidhi Institute of Science and Technology, Auditorium",
        description: "The official kickoff for our Project Schools initiative! Join us to learn about the exciting projects we'll be working on this semester, meet your project mentors, and form your teams. This is your chance to get involved in real-world tech projects that will enhance your portfolio.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
        registrationLink: "/join-us",
        agenda: [
            "Introduction to Project Schools",
            "Project Showcase & Descriptions",
            "Meet the Mentors",
            "Team Formation",
            "Timeline & Expectations"
        ],
        tags: ["Projects", "Teams", "Kickoff"]
    }
]

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
}

export default function Events() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black">
            {/* Hero Section */}
            <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/assets/events/events_bg.jpg"
                        alt="Events Hero"
                        fill
                        className="object-cover opacity-90"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
                </div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 text-center px-4 max-w-4xl mx-auto"
                >
                    <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                        Our Events
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
                        Join us in our journey of learning, innovation, and community building
                    </p>
                </motion.div>
            </div>

            {/* Upcoming Events Section */}
            <section className="max-w-7xl mx-auto px-4 py-24">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="flex items-center justify-between mb-16"
                >
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                        Upcoming Events
                    </h2>
                    <div className="h-px flex-grow bg-gradient-to-r from-transparent via-blue-700/30 to-transparent ml-8" />
                </motion.div>

                {upcomingEvents.length === 0 ? (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="text-center py-16"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-900/20 flex items-center justify-center">
                            <Calendar className="w-10 h-10 text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-4">No Upcoming Events</h3>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            We're currently planning our next events. Check back soon or join our Discord to be the first to know!
                        </p>
                        <a 
                            href="https://discord.gg/dBNXWDKhrD"
                            className="inline-flex items-center mt-6 px-6 py-3 bg-blue-800/30 hover:bg-blue-800/50 text-white rounded-lg transition-all duration-300"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Join Our Discord
                            <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="grid grid-cols-1 gap-12"
                    >
                        {upcomingEvents.map((event) => (
                            <motion.div
                                key={event.id}
                                variants={fadeInUp}
                                className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
                            >
                                <div className="md:flex">
                                    <div className="md:w-1/3 relative h-64 md:h-auto overflow-hidden">
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
                                        
                                        {/* Event tags */}
                                        <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end">
                                            {event.tags && event.tags.map((tag, index) => (
                                                <span 
                                                    key={index} 
                                                    className="px-3 py-1 bg-blue-500/80 text-white text-xs font-medium rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
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

                                        <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                                            {event.description}
                                        </p>

                                        <div className="mb-8 bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                                            <h4 className="text-white font-semibold mb-4 flex items-center">
                                                <ChevronRight className="w-5 h-5 mr-2 text-blue-400" />
                                                Event Agenda
                                            </h4>
                                            <ul className="space-y-3 text-gray-300">
                                                {event.agenda.map((item, index) => (
                                                    <li key={index} className="flex items-center">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-3" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <Link 
                                            href={event.registrationLink}
                                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg shadow-blue-500/25"
                                        >
                                            Register Now
                                            <ExternalLink className="w-5 h-5 ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </section>

            {/* Past Events Section */}
            <section className="max-w-7xl mx-auto px-4 pb-24">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="flex items-center justify-between mb-16"
                >
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                        Past Events
                    </h2>
                    <div className="h-px flex-grow bg-gradient-to-r from-transparent via-purple-700/30 to-transparent ml-8" />
                </motion.div>

                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="grid grid-cols-1 gap-16"
                >
                    {pastEvents.map((event) => (
                        <motion.div
                            key={event.id}
                            variants={fadeInUp}
                            className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
                        >
                            <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black flex items-end">
                                    <div className="p-8 w-full">
                                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                                            {event.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-4 md:gap-6 text-gray-300">
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
                                        
                                        {/* Event tags */}
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {event.tags && event.tags.map((tag, index) => (
                                                <span 
                                                    key={index} 
                                                    className="px-3 py-1 bg-purple-500/80 text-white text-xs font-medium rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 md:p-10">
                                <p className="text-gray-300 mb-12 text-lg leading-relaxed">
                                    {event.description}
                                </p>

                                <div className="mb-12">
                                    <h4 className="text-white font-semibold mb-8 text-xl flex items-center">
                                        <Award className="w-5 h-5 mr-2 text-purple-400" />
                                        Event Highlights
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {event.highlights.map((highlight, index) => (
                                            <div 
                                                key={index}
                                                className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 text-center text-gray-300 hover:bg-gray-800/50 transition-all duration-300 border border-gray-700 hover:border-purple-500/50 group/highlight"
                                            >
                                                {highlight}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-white font-semibold mb-8 text-xl flex items-center">
                                        <Users className="w-5 h-5 mr-2 text-purple-400" />
                                        Event Gallery
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {event.gallery.map((image, index) => (
                                            <div 
                                                key={index} 
                                                className="relative aspect-[4/3] rounded-lg overflow-hidden group/image"
                                            >
                                                <Image
                                                    src={image}
                                                    alt={`${event.title} gallery image ${index + 1}`}
                                                    fill
                                                    className="object-cover group-hover/image:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    )
} 