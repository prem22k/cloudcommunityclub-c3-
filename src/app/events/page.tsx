'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, MapPin, ExternalLink, ChevronRight, Users, Award, Tag, AlertCircle, ArrowRight, Camera, X, Check } from 'lucide-react'

// Event Types
interface AgendaItem {
    time: string;
    activity: string;
}

interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    image: string;
    highlights?: string[];
    gallery?: string[];
    tags?: string[];
    registrationLink?: string;
    registrationDeadline?: string;
    agenda?: AgendaItem[];
}

// Past Events Data
const pastEvents: Event[] = [
    {
        id: "1",
        title: "AI Hack Day 2025",
        date: "February 22, 2025",
        time: "9:00 AM - 4:00 PM",
        location: "Sreenidhi Institute of Science and Technology",
        description: "Experience the future of technology at AI Hack Day 2025, where innovation meets artificial intelligence. This groundbreaking national hackathon brought together brilliant minds from across the country to tackle real-world challenges using cutting-edge AI solutions. In collaboration with Swecha Telangana, Visam.ai, and IIIT Hyderabad, this event created an ecosystem where students and industry experts collaborated to push the boundaries of what's possible with AI.",
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
        id: "2",
        title: "C³ Inaugural & Open Session",
        date: "March 10th, 2025",
        time: "1:30 PM - 3:30 PM",
        location: "Sreenidhi Institute of Science and Technology, CET Lab-3",
        description: "A milestone moment in our journey - the official launch of the Cloud Community Club (C³) at SNIST. This inaugural event marked the beginning of an exciting chapter in our tech community's story. Students discovered a vibrant ecosystem dedicated to Open-source development, cutting-edge Research, Institution-centric Projects, and real-world Deployment experiences. Through engaging presentations and interactive sessions, attendees gained insights into our community's vision and learned how to become an integral part of the C³ ecosystem.",
        image: "/assets/events/open-session-main.jpg",
        highlights: [
            "150+ Attendees",
            "Introduction to Project Schools",
            "Community Vision Presentation",
            "Interactive Q&A Session",
            "Introduction to Research & Development",
            "Announced Event Calendar"
        ],
        gallery: [
            "/assets/events/open-session-main.jpg"
        ],
        tags: ["Inaugural", "Community", "Orientation"]
    }
]

// Upcoming Events Data
const upcomingEvents: Event[] = [
    {
        id: "1",
        title: "Cloud 101",
        date: "June 16th & 17th, 2025",
        time: "10:00 AM - 3:30 PM",
        location: "Vaughn Seminar Hall, Sreenidhi Institute of Science and Technology",
        description: "Join us for a hands-on workshop on cloud computing and DevOps. Learn cloud architecture, deployment models, get started with Linux, and explore DevOps concepts with practical experience on popular tools. This workshop is perfect for beginners looking to start their cloud journey.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        registrationLink: "https://www.tickettailor.com/events/cloudcommunityclub/1739658",
        agenda: [
            { time: "TBD", activity: "Introduction to Cloud Computing" },
            { time: "TBD", activity: "Cloud Service Models (IaaS, PaaS, SaaS)" },
            { time: "TBD", activity: "Hands-on with AWS/Azure/GCP" },
            { time: "TBD", activity: "Deploying Your First Cloud Application" },
            { time: "TBD", activity: "Best Practices & Security Considerations" }
        ],
        tags: ["Workshop", "Cloud", "Hands-on"]
    },
]

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
}

const cardHover = {
    rest: { scale: 1 },
    hover: {
        scale: 1.02,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
}

// Component to display countdown timer
const CountdownTimer = ({ deadline }: { deadline: string }) => {
    const calculateTimeLeft = () => {
        const difference = new Date(deadline).getTime() - new Date().getTime();
        if (difference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                expired: true
            };
        }
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
            expired: false
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    if (timeLeft.expired) {
        return (
            <div className="flex items-center text-amber-500 mt-2 mb-4 bg-amber-500/10 px-4 py-2 rounded-lg border border-amber-500/20">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Registration deadline has passed</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col mt-2 mb-4">
            <div className="text-sm text-gray-400 mb-2 font-medium">Registration closes in:</div>
            <div className="flex space-x-3 text-sm font-mono">
                <div className="bg-blue-900/40 px-3 py-2 rounded-lg border border-blue-500/20 shadow-lg shadow-blue-900/20">
                    <span className="text-white font-bold text-lg">{timeLeft.days}</span>
                    <span className="text-blue-300 ml-1 text-xs">days</span>
                </div>
                <div className="bg-blue-900/40 px-3 py-2 rounded-lg border border-blue-500/20 shadow-lg shadow-blue-900/20">
                    <span className="text-white font-bold text-lg">{timeLeft.hours}</span>
                    <span className="text-blue-300 ml-1 text-xs">hours</span>
                </div>
                <div className="bg-blue-900/40 px-3 py-2 rounded-lg border border-blue-500/20 shadow-lg shadow-blue-900/20">
                    <span className="text-white font-bold text-lg">{timeLeft.minutes}</span>
                    <span className="text-blue-300 ml-1 text-xs">min</span>
                </div>
                <div className="bg-blue-900/40 px-3 py-2 rounded-lg border border-blue-500/20 shadow-lg shadow-blue-900/20">
                    <span className="text-white font-bold text-lg">{timeLeft.seconds}</span>
                    <span className="text-blue-300 ml-1 text-xs">sec</span>
                </div>
            </div>
        </div>
    );
};

// Image Gallery Modal Component
interface ImageGalleryProps {
    images: string[];
    isOpen: boolean;
    onClose: () => void;
    currentEventTitle: string;
}

const ImageGallery = ({ images, isOpen, onClose, currentEventTitle }: ImageGalleryProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") setCurrentImageIndex(prev => (prev + 1) % images.length);
            if (e.key === "ArrowLeft") setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, images, onClose]);

    if (!isOpen) return null;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
            <div className="relative w-full max-w-5xl h-[80vh] flex flex-col">
                <div className="absolute top-0 right-0 p-4 z-10">
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-300 transition-colors p-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div className="text-center mb-4">
                    <h3 className="text-white text-xl">{currentEventTitle}</h3>
                    <p className="text-gray-400 text-sm">Image {currentImageIndex + 1} of {images.length}</p>
                </div>
                <div className="relative flex-grow overflow-hidden rounded-lg">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={images[currentImageIndex]}
                            alt={`Gallery image ${currentImageIndex + 1}`}
                            fill
                            className="object-contain"
                        />
                    </motion.div>
                </div>
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={() => setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length)}
                        className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button
                        onClick={() => setCurrentImageIndex(prev => (prev + 1) % images.length)}
                        className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

interface EventDetailsModalProps {
    event: Event;
    isOpen: boolean;
    onClose: () => void;
    onGalleryOpen: (images: string[], eventTitle: string) => void;
}

const EventDetailsModal = ({ event, isOpen, onClose, onGalleryOpen }: EventDetailsModalProps) => {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl border border-gray-800"
                onClick={e => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Event header image */}
                <div className="relative h-64 md:h-80">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h2 className="text-3xl font-bold text-white mb-2">{event.title}</h2>
                        <div className="flex flex-wrap gap-4 text-gray-300">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                                {event.date}
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-blue-400" />
                                {event.time}
                            </div>
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                                {event.location}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {/* Event tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {event.tags && event.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-600/20 text-blue-400 text-sm font-medium rounded-full border border-blue-500/30"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-white mb-4">About the Event</h3>
                        <p className="text-gray-300 leading-relaxed">{event.description}</p>
                    </div>

                    {/* Highlights */}
                    {event.highlights && event.highlights.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-white mb-4">Highlights</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {event.highlights.map((highlight, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-3 p-4 bg-gray-800/30 rounded-lg border border-gray-700"
                                    >
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                                            <Check className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <p className="text-gray-300">{highlight}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Agenda */}
                    {event.agenda && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-white mb-4">Agenda</h3>
                            <div className="space-y-4">
                                {event.agenda.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700"
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                            <span className="text-blue-400 font-medium">{index + 1}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium mb-1">{item.time}</h4>
                                            <p className="text-gray-300">{item.activity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Gallery */}
                    {event.gallery && event.gallery.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-white mb-4">Gallery</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {event.gallery.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                                        onClick={() => onGalleryOpen(event.gallery || [], event.title)}
                                    >
                                        <Image
                                            src={image}
                                            alt={`Gallery image ${index + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                                        {/* Action buttons */}
                    <div className="flex flex-wrap gap-4 mt-8">
                        {event.registrationLink && (
                            isRegistrationOpen ? (
                                <a
                                    href={event.registrationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-blue-900/30"
                                >
                                    Register Now
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </a>
                            ) : (
                                <button
                                    disabled
                                    className="inline-flex items-center px-6 py-3 bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed"
                                >
                                    Registration Closed
                                </button>
                            )
                        )}
                        <button
                            onClick={onClose}
                            className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300"
                        >
                            Close
                            <X className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function Events() {
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [currentEventTitle, setCurrentEventTitle] = useState("");
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const openGallery = (images: string[], eventTitle: string) => {
        setGalleryImages(images);
        setCurrentEventTitle(eventTitle);
        setGalleryOpen(true);
    };

    const openEventDetails = (event: Event) => {
        setSelectedEvent(event);
    };

    // Smooth scroll function
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black">
            {/* Hero Section */}
            <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/assets/events/events_bg.jpg"
                        alt="Events Hero"
                        fill
                        className="object-cover opacity-70"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black" />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 text-center px-4 max-w-4xl mx-auto"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-6xl font-bold text-white mb-4"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                            C³ Events
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light"
                    >
                        Join us in our journey of learning, innovation, and community building
                    </motion.p>
                </motion.div>
            </div>

            {/* Tab Navigation */}
            <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-gray-800 py-4 shadow-lg shadow-black/20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`px-6 py-2 rounded-lg transition-all duration-300 flex items-center ${activeTab === 'upcoming'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                                }`}
                        >
                            <Calendar className="w-5 h-5 mr-2" />
                            Upcoming Events
                        </button>
                        <button
                            onClick={() => setActiveTab('past')}
                            className={`px-6 py-2 rounded-lg transition-all duration-300 flex items-center ${activeTab === 'past'
                                ? 'bg-gray-700 text-white shadow-lg shadow-gray-900/30'
                                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                                }`}
                        >
                            <Clock className="w-5 h-5 mr-2" />
                            Past Events
                        </button>
                    </div>
                </div>
            </div>

            {/* Events Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Upcoming Events */}
                {activeTab === 'upcoming' && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        {upcomingEvents.length === 0 ? (
                            <motion.div
                                variants={fadeInUp}
                                className="text-center py-16 bg-gray-900/30 rounded-xl border border-gray-800 backdrop-blur-sm"
                            >
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-900/20 flex items-center justify-center">
                                    <Calendar className="w-10 h-10 text-blue-400" />
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-4">No Upcoming Events</h3>
                                <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                                    We're currently planning our next events. Check back soon or join our Discord to be the first to know!
                                </p>
                                <a
                                    href="https://discord.gg/dBNXWDKhrD"
                                    className="inline-flex items-center px-6 py-3 bg-blue-800/30 hover:bg-blue-800/50 text-white rounded-lg transition-all duration-300"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Join Our Discord
                                    <ExternalLink className="w-4 h-4 ml-2" />
                                </a>
                            </motion.div>
                        ) : (
                            upcomingEvents.map((event) => {
                                const isRegistrationOpen = event.registrationDeadline ? new Date(event.registrationDeadline) > new Date() : true;

                                return (
                                    <motion.div
                                        key={event.id}
                                        variants={fadeInUp}
                                        initial="rest"
                                        whileHover="hover"
                                        className="group bg-gradient-to-br from-gray-900/80 to-black backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
                                    >
                                        <motion.div className="md:flex" variants={cardHover}>
                                            <div className="md:w-2/5 lg:w-1/3 relative h-64 md:h-auto overflow-hidden">
                                                <Image
                                                    src={event.image}
                                                    alt={event.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

                                                {/* Event tags */}
                                                <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end">
                                                    {event.tags && event.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1 bg-blue-600/90 text-white text-xs font-medium rounded-full shadow-lg shadow-blue-900/30"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Event date overlay */}
                                                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-500/30 shadow-lg shadow-black/30">
                                                    <div className="text-lg font-bold text-white">{event.date.split(' ')[1]}</div>
                                                    <div className="text-xs text-blue-300">{event.date.split(' ')[0]}</div>
                                                </div>
                                            </div>
                                            <div className="p-6 md:w-3/5 lg:w-2/3">
                                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                                    {event.title}
                                                </h3>

                                                <div className="flex flex-wrap gap-4 mb-4 text-gray-300 text-sm">
                                                    <div className="flex items-center">
                                                        <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                                                        {event.date}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Clock className="w-4 h-4 mr-2 text-blue-400" />
                                                        {event.time}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                                                        {event.location}
                                                    </div>
                                                </div>

                                                <p className="text-gray-300 mb-4">
                                                    {event.description}
                                                </p>

                                                {/* Timer */}
                                                {event.registrationDeadline && (
                                                    <CountdownTimer deadline={event.registrationDeadline} />
                                                )}

                                                <div className="flex flex-wrap gap-4 mt-4">
                                                    {event.registrationLink && (
                                                        isRegistrationOpen ? (
                                                            <a
                                                                href={event.registrationLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-blue-900/30"
                                                            >
                                                                Register Now
                                                                <ArrowRight className="w-4 h-4 ml-2" />
                                                            </a>
                                                        ) : (
                                                            <button
                                                                disabled
                                                                className="inline-flex items-center px-6 py-3 bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed"
                                                            >
                                                                Registration Closed
                                                            </button>
                                                        )
                                                    )}
                                                    <button
                                                        onClick={() => openEventDetails(event)}
                                                        className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300"
                                                    >
                                                        View Details
                                                        <ChevronRight className="w-4 h-4 ml-2" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )
                            })
                        )}
                    </motion.div>
                )}

                {/* Past Events */}
                {activeTab === 'past' && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {pastEvents.map((event) => (
                            <motion.div
                                key={event.id}
                                variants={fadeInUp}
                                initial="rest"
                                whileHover="hover"
                                className="group bg-gradient-to-br from-gray-900/70 to-black backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-800 hover:border-gray-600 transition-all duration-300"
                            >
                                <motion.div variants={cardHover}>
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

                                        {/* Event tags */}
                                        <div className="absolute top-3 right-3 flex flex-wrap gap-2 justify-end">
                                            {event.tags && event.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-gray-800/90 text-white text-xs font-medium rounded-full shadow-lg shadow-black/30"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gray-200 transition-colors">
                                                {event.title}
                                            </h3>
                                            <div className="flex items-center text-gray-300 text-sm">
                                                <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                                                {event.date}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <div className="flex flex-wrap gap-3 mb-3 text-gray-400 text-xs">
                                            <div className="flex items-center">
                                                <Clock className="w-3 h-3 mr-1 text-gray-500" />
                                                {event.time}
                                            </div>
                                            <div className="flex items-center">
                                                <MapPin className="w-3 h-3 mr-1 text-gray-500" />
                                                {event.location}
                                            </div>
                                        </div>

                                        <p className="text-gray-400 mb-4 text-sm line-clamp-2">
                                            {event.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {event.highlights && event.highlights.slice(0, 2).map((highlight, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-900/50 px-2 py-1 rounded text-gray-400 text-xs border border-gray-800"
                                                >
                                                    {highlight}
                                                </div>
                                            ))}
                                            {event.highlights && event.highlights.length > 2 && (
                                                <div className="bg-gray-900/50 px-2 py-1 rounded text-gray-400 text-xs border border-gray-800">
                                                    +{event.highlights.length - 2} more
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-center">
                                            {event.gallery && event.gallery.length > 0 && (
                                                <button
                                                    onClick={() => openGallery(event.gallery || [], event.title)}
                                                    className="flex items-center text-blue-400 hover:text-blue-300 text-sm"
                                                >
                                                    <Camera className="w-4 h-4 mr-1" />
                                                    View Gallery
                                                </button>
                                            )}

                                            <button
                                                onClick={() => openEventDetails(event)}
                                                className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 text-sm"
                                            >
                                                Details
                                                <ChevronRight className="w-3 h-3 ml-1" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Gallery Modal */}
            <ImageGallery
                images={galleryImages}
                isOpen={galleryOpen}
                onClose={() => setGalleryOpen(false)}
                currentEventTitle={currentEventTitle}
            />

            {/* EventDetailsModal */}
            {selectedEvent && (
                <EventDetailsModal
                    event={selectedEvent}
                    isOpen={!!selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    onGalleryOpen={openGallery}
                />
            )}
        </div>
    )
}
