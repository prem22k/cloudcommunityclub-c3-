'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
  BookOpen
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
    title: 'Cloud Infrastructure Intern',
    company: 'CloudTech Solutions',
    location: 'Remote',
    duration: '3 months',
    stipend: '₹15,000/month',
    category: 'Cloud Computing',
    description: 'Work with our cloud infrastructure team to design, deploy and manage cloud-based solutions.',
    applyLink: '#',
    logo: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 2,
    title: 'Full Stack Developer Intern',
    company: 'WebDev Innovators',
    location: 'Hyderabad',
    duration: '6 months',
    stipend: '₹20,000/month',
    category: 'Software Development',
    description: 'Join our development team to build scalable web applications using modern technologies.',
    applyLink: '#',
    logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 3,
    title: 'Data Science Intern',
    company: 'DataMinds Analytics',
    location: 'Bangalore',
    duration: '4 months',
    stipend: '₹18,000/month',
    category: 'Data Science',
    description: 'Apply machine learning and statistical techniques to extract insights from large datasets.',
    applyLink: '#',
    logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 4,
    title: 'UI/UX Design Intern',
    company: 'Creative Interfaces',
    location: 'Remote',
    duration: '3 months',
    stipend: '₹12,000/month',
    category: 'UI/UX Design',
    description: 'Design intuitive and beautiful user interfaces for web and mobile applications.',
    applyLink: '#',
    logo: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 5,
    title: 'DevOps Engineering Intern',
    company: 'InfraOps Tech',
    location: 'Mumbai',
    duration: '6 months',
    stipend: '₹25,000/month',
    category: 'DevOps',
    description: 'Learn and implement CI/CD pipelines, containerization, and infrastructure automation.',
    applyLink: '#',
    logo: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 6,
    title: 'Backend Developer Intern',
    company: 'ServerSide Systems',
    location: 'Delhi',
    duration: '4 months',
    stipend: '₹17,000/month',
    category: 'Software Development',
    description: 'Develop robust backend services and APIs using Node.js, Python or Java.',
    applyLink: '#',
    logo: 'https://images.unsplash.com/photo-1565843708714-52ecf69ab81f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  }
]

const categoriesData: string[] = ['All', 'Software Development', 'Cloud Computing', 'Data Science', 'UI/UX Design', 'DevOps']

export default function InternshipsPage() {
  // Initialize with empty values for SSR to prevent hydration mismatch
  const [isClient, setIsClient] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [internships, setInternships] = useState<Internship[]>([])
  const [categories, setCategories] = useState<string[]>([])

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
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={internship.logo}
                    alt={internship.company}
                    fill
                    className="object-cover transform hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
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
      
      {/* Apply Process Section */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">How to Apply</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Listings</h3>
              <p className="text-gray-400">Explore our curated collection of internship opportunities across various tech fields.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply Online</h3>
              <p className="text-gray-400">Submit your application with your resume and a brief introduction about yourself.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-pink-500/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interview Process</h3>
              <p className="text-gray-400">Selected candidates will be contacted for interviews and technical assessments.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="#"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300"
            >
              Join Our Talent Pool
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 