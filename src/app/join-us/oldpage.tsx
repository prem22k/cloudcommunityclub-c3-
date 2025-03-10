'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle, Send, Loader2 } from 'lucide-react'

// Define types for form data and errors
interface FormData {
    name: string;
    email: string;
    phone: string;
    rollNumber: string;
    branch: string;
    year: string;
    interests: string[];
    experience: string;
    expectations: string;
    referral: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    rollNumber?: string;
    branch?: string;
    year?: string;
    interests?: string;
}

export default function JoinUs() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        rollNumber: '',
        branch: '',
        year: '',
        interests: [],
        experience: '',
        expectations: '',
        referral: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})

    const interestOptions = [
        'Cloud Computing',
        'Web Development',
        'App Development',
        'Machine Learning',
        'DevOps',
        'UI/UX Design',
        'Open Source',
        'Blockchain',
        'Cybersecurity',
        'Research'
    ]

    const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year']
    
    const branchOptions = [
        'Computer Science Engineering',
        'Information Technology',
        'Electronics and Communication Engineering',
        'Electrical and Electronics Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Other'
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleInterestChange = (interest: string) => {
        setFormData(prev => {
            const interests = [...prev.interests]
            if (interests.includes(interest)) {
                return {
                    ...prev,
                    interests: interests.filter(i => i !== interest)
                }
            } else {
                return {
                    ...prev,
                    interests: [...interests, interest]
                }
            }
        })
    }

    const validateForm = () => {
        const newErrors: FormErrors = {}
        
        if (!formData.name.trim()) newErrors.name = 'Name is required'
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }
        
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required'
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be 10 digits'
        }
        
        if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required'
        if (!formData.branch) newErrors.branch = 'Branch is required'
        if (!formData.year) newErrors.year = 'Year is required'
        if (formData.interests.length === 0) newErrors.interests = 'Select at least one interest'
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (!validateForm()) return
        
        setIsSubmitting(true)
        
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSubmitted(true)
            
            // Reset form after submission
            setFormData({
                name: '',
                email: '',
                phone: '',
                rollNumber: '',
                branch: '',
                year: '',
                interests: [],
                experience: '',
                expectations: '',
                referral: ''
            })
        }, 2000)
        
        // In a real application, you would send the data to your backend:
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const data = await response.json()
            setIsSubmitting(false)
            setIsSubmitted(true)
        } catch (error) {
            setIsSubmitting(false)
            console.error('Error submitting form:', error)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black">
            {/* Hero Section */}
            <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/assets/events/events_bg.jpg"
                        alt="Join Us Hero"
                        fill
                        className="object-cover opacity-70"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
                </div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 text-center px-4 max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Join Cloud Community Club
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
                        Become a part of our growing tech community and unlock your potential
                    </p>
                </motion.div>
            </div>

            {/* Registration Form Section */}
            <section className="max-w-4xl mx-auto px-4 py-16">
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700 p-6 md:p-10">
                    {isSubmitted ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-16"
                        >
                            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                            <h2 className="text-3xl font-bold text-white mb-4">Application Submitted!</h2>
                            <p className="text-gray-300 text-lg max-w-md mx-auto">
                                Thank you for your interest in joining Cloud Community Club. We'll review your application and get back to you soon.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                            >
                                Submit Another Application
                            </button>
                        </motion.div>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold text-white mb-8 text-center">Membership Application</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Personal Information */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold text-blue-400 border-b border-gray-700 pb-2">Personal Information</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-300 mb-2">Full Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`w-full bg-gray-800/50 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                placeholder="Enter your full name"
                                            />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-gray-300 mb-2">Email Address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full bg-gray-800/50 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                placeholder="Enter your email address"
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-gray-300 mb-2">Phone Number *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={`w-full bg-gray-800/50 border ${errors.phone ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                placeholder="Enter your phone number"
                                            />
                                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-gray-300 mb-2">Roll Number *</label>
                                            <input
                                                type="text"
                                                name="rollNumber"
                                                value={formData.rollNumber}
                                                onChange={handleChange}
                                                className={`w-full bg-gray-800/50 border ${errors.rollNumber ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                placeholder="Enter your roll number"
                                            />
                                            {errors.rollNumber && <p className="text-red-500 text-sm mt-1">{errors.rollNumber}</p>}
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-300 mb-2">Branch *</label>
                                            <select
                                                name="branch"
                                                value={formData.branch}
                                                onChange={handleChange}
                                                className={`w-full bg-gray-800/50 border ${errors.branch ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            >
                                                <option value="">Select your branch</option>
                                                {branchOptions.map(branch => (
                                                    <option key={branch} value={branch}>{branch}</option>
                                                ))}
                                            </select>
                                            {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-gray-300 mb-2">Year of Study *</label>
                                            <select
                                                name="year"
                                                value={formData.year}
                                                onChange={handleChange}
                                                className={`w-full bg-gray-800/50 border ${errors.year ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            >
                                                <option value="">Select your year</option>
                                                {yearOptions.map(year => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                            {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Interests & Experience */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold text-blue-400 border-b border-gray-700 pb-2">Interests & Experience</h3>
                                    
                                    <div>
                                        <label className="block text-gray-300 mb-3">Areas of Interest *</label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                            {interestOptions.map(interest => (
                                                <div 
                                                    key={interest}
                                                    onClick={() => handleInterestChange(interest)}
                                                    className={`px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                                                        formData.interests.includes(interest)
                                                            ? 'bg-blue-600/30 border-blue-500 text-white'
                                                            : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50'
                                                    }`}
                                                >
                                                    {interest}
                                                </div>
                                            ))}
                                        </div>
                                        {errors.interests && <p className="text-red-500 text-sm mt-2">{errors.interests}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-gray-300 mb-2">Previous Experience</label>
                                        <textarea
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Briefly describe any relevant experience or projects you've worked on"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-gray-300 mb-2">What do you expect to gain from joining our club?</label>
                                        <textarea
                                            name="expectations"
                                            value={formData.expectations}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Tell us what you hope to learn or achieve by joining Cloud Community Club"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-gray-300 mb-2">How did you hear about us?</label>
                                        <input
                                            type="text"
                                            name="referral"
                                            value={formData.referral}
                                            onChange={handleChange}
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Friend, social media, event, etc."
                                        />
                                    </div>
                                </div>
                                
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5 mr-2" />
                                                Submit Application
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </section>
            
            {/* Benefits Section */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">Benefits of Joining</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700 p-6"
                    >
                        <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Skill Development</h3>
                        <p className="text-gray-300">
                            Gain hands-on experience with cutting-edge cloud technologies and develop in-demand skills through workshops, projects, and mentorship.
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700 p-6"
                    >
                        <div className="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Networking</h3>
                        <p className="text-gray-300">
                            Connect with like-minded peers, industry professionals, and potential employers through our events, hackathons, and community activities.
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700 p-6"
                    >
                        <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Career Opportunities</h3>
                        <p className="text-gray-300">
                            Get access to exclusive internship opportunities, job referrals, and career guidance from industry experts and alumni.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}