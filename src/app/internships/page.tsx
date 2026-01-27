'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Briefcase,
  LightbulbIcon,
  Users,
  Award,
  ExternalLink,
  Search,
  Filter,
  BookOpen,
  X
} from 'lucide-react'

// Define internship type
interface Internship {
  id: number
  title: string
  company: string
  location: string
  duration: string
  stipend: string
  category: string
  description: string
  applyLink: string
  logo: string
}

// Sample internship data
const internshipsData: Internship[] = [
  {
    id: 1,
    title: 'Summer of AI 2025',
    company: 'Swecha Telangana & Viswam.ai',
    location: 'Hybrid (Online + Offline Sessions)',
    duration: '1 Month (Starting May 15, 2025)',
    stipend: 'Official Certificate',
    category: 'AI & Machine Learning',
    description: 'A Nationwide AI Internship to Build the World\'s First Telugu Large Language Model (LLM). Get hands-on training in cutting-edge AI technologies while contributing to this groundbreaking project.',
    applyLink: 'https://viswam.ai/summer-of-ai',
    logo: '/assets/internships/soi_1.webp'
  }
]

const categoriesData: string[] = ['All', 'AI & Machine Learning', 'Software Development', 'Cloud Computing', 'Data Science', 'UI/UX Design', 'DevOps']

// Interface for the Lightbox component props
interface ImageLightboxProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

// Lightbox/Modal component for full-size image viewing
const ImageLightbox: React.FC<ImageLightboxProps> = ({ src, alt, isOpen, onClose }) => {
  // Handle clicking outside the image to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
    }

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="relative max-w-[90vw] max-h-[90vh]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 text-white z-10 hover:bg-gray-700 transition-colors"
              onClick={onClose}
            >
              <X size={24} />
            </button>
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={alt}
                width={1200}
                height={800}
                className="object-contain max-h-[90vh]"
                priority
                unoptimized
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function InternshipsPage() {
  // Initialize with empty values for SSR to prevent hydration mismatch
  const [isClient, setIsClient] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [internships, setInternships] = useState<Internship[]>([])
  const [categories, setCategories] = useState<string[]>([])

  // State for lightbox/modal
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState({ src: '', alt: '' })

  // Function to open the lightbox with a specific image
  const openLightbox = (src: string, alt: string) => {
    setLightboxImage({ src, alt })
    setLightboxOpen(true)
  }

  // Initialize client-side data after component mounts
  useEffect(() => {
    setIsClient(true)
    setInternships(internshipsData)
    setCategories(categoriesData)
  }, [])

  // Filter internships based on search and category - only run on client
  const filteredInternships = isClient
    ? internships.filter(internship => {
      const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === 'All' || internship.category === selectedCategory

      return matchesSearch && matchesCategory
    })
    : []

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Lightbox component */}
      <ImageLightbox
        src={lightboxImage.src}
        alt={lightboxImage.alt}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3"
            alt="Internships Hero"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black opacity-90 z-10"></div>

        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Internship Opportunities
          </motion.h1>
          <motion.p
            className="max-w-2xl text-lg md:text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Kickstart your career with hands-on experience in the tech industry. Explore our curated list of internships from leading companies.
          </motion.p>

          {isClient && (
            <motion.div
              className="flex flex-col md:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search internships..."
                  className="w-full md:w-80 px-10 py-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  className="w-full md:w-64 px-10 py-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Why Internships Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Internships?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Our internship program offers a unique opportunity to gain valuable experience and kickstart your career in the tech industry.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <LightbulbIcon className="text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-World Experience</h3>
            <p className="text-gray-400">Work on actual projects that matter and contribute to real business outcomes.</p>
          </motion.div>

          <motion.div
            className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Users className="text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mentorship</h3>
            <p className="text-gray-400">Learn from industry professionals who are passionate about helping you grow.</p>
          </motion.div>

          <motion.div
            className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <BookOpen className="text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Skill Development</h3>
            <p className="text-gray-400">Enhance your technical and soft skills through structured learning programs.</p>
          </motion.div>

          <motion.div
            className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-pink-500 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
              <Award className="text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Future Opportunities</h3>
            <p className="text-gray-400">Top performers may receive pre-placement offers and long-term career paths.</p>
          </motion.div>
        </div>
      </div>

      {/* Internship Listings */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Available Internships</h2>

        {!isClient ? (
          <div className="flex justify-center py-16">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredInternships.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-4 rounded-full bg-gray-800 mb-4">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">No internships found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or check back later for new opportunities.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInternships.map(internship => (
              <motion.div
                key={internship.id}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="relative h-48 overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(internship.logo, internship.company)}
                >
                  <Image
                    src={internship.logo}
                    alt={internship.company}
                    fill
                    className="object-cover transform hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black bg-opacity-50 rounded-full p-3">
                      <span className="text-white font-medium">Click to enlarge</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/80 text-white">
                      {internship.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{internship.title}</h3>
                  <p className="text-gray-300 font-medium mb-4">{internship.company}</p>

                  <div className="mb-4 text-gray-400 text-sm">
                    <div className="flex items-center mb-2">
                      <Briefcase size={16} className="mr-2" />
                      <span>{internship.duration}</span>
                    </div>
                    <p>{internship.description}</p>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <span className="text-green-400 font-semibold">{internship.stipend}</span>
                    <Link
                      href={internship.applyLink}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-300"
                    >
                      Apply <ExternalLink size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Summer of AI 2025 Detailed Section */}
      <div className="container mx-auto px-6 py-16 bg-gradient-to-r from-blue-900/10 to-purple-900/10 rounded-2xl mb-16">
        <div className="flex flex-col md:flex-row items-start gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Summer of AI 2025
            </h2>
            <p className="text-xl text-gray-200 mb-6 italic">
              A Nationwide AI Internship to Build the World's First Telugu LLM
            </p>

            <p className="text-gray-300 mb-6">
              Summer of AI 2025 is an AI internship program empowering students to contribute to the world's first Telugu Large Language Model (LLM) and get hands-on training in cutting-edge AI technologies.
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Program Highlights:</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <div className="bg-blue-500/20 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span><strong>Organizers:</strong> Swecha Telangana, Viswam.ai, IIIT Hyderabad, Meta, Ozonetel, TASK, HySEA</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-500/20 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span><strong>Duration:</strong> 1 Month (Starting May 15, 2025)</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-500/20 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span><strong>Mode:</strong> Hybrid (Online + Offline Sessions)</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-500/20 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span><strong>Target:</strong> Training 1 Lakh AI Engineers across Telangana and Andhra Pradesh</span>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-blue-300">What You Will Learn:</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <div className="bg-purple-500/20 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Foundations of AI and Machine Learning</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-500/20 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Data Collection & Preprocessing for LLMs</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-500/20 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Model Training & Fine-tuning</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-500/20 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>AI for Social Good Projects</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-500/20 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Hands-on contribution to the Telugu LLM Project</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div
              className="relative rounded-2xl overflow-hidden mb-8 cursor-pointer"
              onClick={() => openLightbox('/assets/internships/soi_2.webp', 'Summer of AI 2025')}
            >
              <Image
                src="/assets/internships/soi_2.webp"
                alt="Summer of AI 2025"
                width={600}
                height={400}
                className="w-full h-64 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black bg-opacity-50 rounded-full p-3">
                  <span className="text-white font-medium">Click to view full image</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="text-white text-xl font-bold">A Nationwide AI Internship</span>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-green-300">Perks:</h3>
              <ul className="space-y-3 text-gray-300 mb-6">
                <li className="flex items-start">
                  <div className="bg-green-500/20 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Official Internship Certificate (co-issued by IIIT-H, Meta, Ozonetel, TASK & Swecha)</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500/20 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Mentorship from industry experts and AI researchers</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500/20 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Opportunity to showcase your AI projects</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500/20 p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Network with 1 Lakh+ AI enthusiasts and practitioners</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-blue-300">Open for:</h3>
              <p className="text-gray-300 mb-6">All B.Tech / Engineering Students</p>

              <div className="mt-6">

                <p className="text-center mt-4 text-gray-400">Become a part of the AI revolution and help build India's first native-language LLM.</p>
                <Link
                  href="https://viswam.ai/summer-of-ai"
                  className="block w-full py-3 px-4 mt-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-center font-bold rounded-lg transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  👉 Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 