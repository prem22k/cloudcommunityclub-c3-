'use client'

import React, { useState } from 'react'
import { Send } from 'lucide-react'
import SuccessAnimation from '../../components/SuccessAnimation'
import ErrorAnimation from '../../components/ErrorAnimation'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Define types for form data and errors
interface FormData {
    name: string;
    mobile: string;
    email: string;
    department: string;
    year: string;
    interests: string[];
    expectations: string;
    rollNumber: string;
    experience: string;
    referral: string;
}

// Interest options for the form
const interestOptions = [
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'backend', name: 'Backend' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'devops', name: 'DevOps' },
    { id: 'cloud', name: 'Cloud Computing' },
    { id: 'cybersecurity', name: 'Cybersecurity' },
    { id: 'linux', name: 'Linux' },
    { id: 'docker', name: 'Docker' },
    { id: 'jenkins', name: 'Jenkins' },
    { id: 'aws', name: 'AWS' },
    { id: 'kubernetes', name: 'Kubernetes' },
    { id: 'java', name: 'Java' },
    { id: 'python', name: 'Python' },
    { id: 'aiml', name: 'AI/ML' },
]

const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year']

export default function JoinUs() {
    // Form state
    const [formData, setFormData] = useState<FormData>({
        name: '',
        mobile: '',
        email: '',
        department: '',
        year: '',
        interests: [],
        expectations: '',
        rollNumber: '',
        experience: '',
        referral: '',
    })

    // UI state
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<
        'idle' | 'success' | 'error'
    >('idle')

    // Handle form input changes
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Handle interest selection
    const toggleInterest = (interestName: string) => {
        setFormData((prev) => {
            const isSelected = prev.interests.includes(interestName)
            return {
                ...prev,
                interests: isSelected
                    ? prev.interests.filter((i) => i !== interestName)
                    : [...prev.interests, interestName],
            }
        })
    }

    // Email validation for college email
    const isCollegeEmail = (email: string) => {
        return (
            email.endsWith('.edu') ||
            email.includes('ac.in') ||
            email.includes('edu.')
        )
    }

    // Form validation
    const isFormValid = () => {
        const { name, mobile, email, department, year, rollNumber } = formData
        return (
            name.trim() !== '' &&
            mobile.trim() !== '' &&
            email.trim() !== '' &&
            isCollegeEmail(email) &&
            department.trim() !== '' &&
            year.trim() !== '' &&
            rollNumber.trim() !== '' &&
            formData.interests.length > 0
        )
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Actual API call
            const response = await fetch('https://c3-backend-cnhr.onrender.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const result = await response.json()
            if (result.message === 'success') {
                setSubmitStatus('success')
                // Reset form after successful submission
                setTimeout(() => {
                    setFormData({
                        name: '',
                        mobile: '',
                        email: '',
                        department: '',
                        year: '',
                        interests: [],
                        expectations: '',
                        rollNumber: '',
                        experience: '',
                        referral: '',
                    })
                }, 2000)
            } else {
                setSubmitStatus('error')
            }
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
            // Reset status after animation
            setTimeout(() => {
                setSubmitStatus('idle')
            }, 5000)
        }
    }

    return (
        <div className="min-h-screen relative">
            {/* Background Image with Overlay */}
            <div className="fixed inset-0 -z-10">
                <Image
                    src="/assets/join_us/join_us.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full py-12 flex flex-col items-center justify-center">
                {/* Logo Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full flex justify-center mb-8"
                >
                    <div className="relative w-48 h-48 md:w-56 md:h-56">
                        <Image
                            src="/assets/ccc_logo.png"
                            alt="Cloud Community Club Logo"
                            fill
                            className="object-contain hover:scale-105 transition-transform duration-300"
                            priority
                        />
                    </div>
                </motion.div>

                {/* Title Section with enhanced styling */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center mb-8 px-4"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                        Join Cloud Community Club
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Be part of an innovative community dedicated to cloud computing and technology
                    </p>
                </motion.div>

                {/* Status Animations */}
                {submitStatus === 'success' && <SuccessAnimation />}
                {submitStatus === 'error' && <ErrorAnimation />}

                {/* Form Section with enhanced styling */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-full max-w-2xl mx-auto px-4"
                >
                    <div className="backdrop-blur-md bg-gray-800/90 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
                        <div className="p-8">
                            <div className="flex items-center mb-8 justify-center">
                                <h2 className="text-2xl font-bold text-white text-center">
                                    Membership Application
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label
                                        htmlFor='name'
                                        className='block text-sm font-medium text-gray-300'
                                    >
                                        Full Name *
                                    </label>
                                    <input
                                        type='text'
                                        id='name'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className='mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white'
                                        placeholder='Enter your full name'
                                    />
                                </div>

                                {/* Roll Number Field */}
                                <div>
                                    <label
                                        htmlFor='rollNumber'
                                        className='block text-sm font-medium text-gray-300'
                                    >
                                        Roll Number *
                                    </label>
                                    <input
                                        type='text'
                                        id='rollNumber'
                                        name='rollNumber'
                                        value={formData.rollNumber}
                                        onChange={handleChange}
                                        required
                                        className='mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white'
                                        placeholder='Enter your roll number'
                                    />
                                </div>

                                {/* Mobile Field */}
                                <div>
                                    <label
                                        htmlFor='mobile'
                                        className='block text-sm font-medium text-gray-300'
                                    >
                                        Mobile Number *
                                    </label>
                                    <input
                                        type='tel'
                                        id='mobile'
                                        name='mobile'
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required
                                        pattern='[0-9]{10}'
                                        className='mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white'
                                        placeholder='10-digit mobile number'
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-300'
                                    >
                                        College Email *
                                    </label>
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className={`mt-1 block w-full px-3 py-2 bg-gray-700 border ${
                                            formData.email &&
                                            !isCollegeEmail(formData.email)
                                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-600 focus:ring-indigo-500 focus:border-indigo-500'
                                        } rounded-md shadow-sm focus:outline-none text-white`}
                                        placeholder='Your college email address'
                                    />
                                    {formData.email &&
                                        !isCollegeEmail(formData.email) && (
                                            <p className='mt-1 text-sm text-red-400'>
                                                Please enter a valid college email
                                                address
                                            </p>
                                        )}
                                </div>

                                {/* Department Field */}
                                <div>
                                    <label
                                        htmlFor='department'
                                        className='block text-sm font-medium text-gray-300'
                                    >
                                        Department *
                                    </label>
                                    <select
                                        id='department'
                                        name='department'
                                        value={formData.department}
                                        onChange={handleChange}
                                        required
                                        className='mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white'
                                    >
                                        <option value='' disabled>
                                            Select your department
                                        </option>
                                        <option value='Computer Science'>
                                            Computer Science and Engineering(CSE)
                                        </option>
                                        <option value='Information Technology'>
                                            Information Technology(IT)
                                        </option>
                                        <option value='Electronics'>
                                            Electronics and Communications Engineering(ECE)
                                        </option>
                                        <option value='Electrical'>
                                            Electrical and Electronics Engineering(EEE)
                                        </option>
                                        <option value='CyberSec'>
                                            Computer Science and
                                            Engineering(Cybersecurity)
                                        </option>
                                        <option value='AI-ML'>
                                            Computer Science and
                                            Engineering(AI-ML)
                                        </option>
                                        <option value='iot'>
                                            Computer Science and
                                            Engineering(IOT)
                                        </option>
                                        <option value='datascience'>
                                            Computer Science and
                                            Engineering(Data Science)
                                        </option>
                                        <option value='ecm'>
                                            Electronics and Computer Engineering(ECM)
                                        </option>
                                        <option value='Mechanical'>
                                            Mechanical Engineering(ME)
                                        </option>
                                        <option value='Civil'>Civil Engineering</option>
                                        <option value='Other'>Other</option>
                                    </select>
                                </div>
                                
                                {/* Year of Study Field */}
                                <div>
                                    <label
                                        htmlFor='year'
                                        className='block text-sm font-medium text-gray-300'
                                    >
                                        Year of Study *
                                    </label>
                                    <select
                                        id='year'
                                        name='year'
                                        value={formData.year}
                                        onChange={handleChange}
                                        required
                                        className='mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white'
                                    >
                                        <option value='' disabled>
                                            Select your year
                                        </option>
                                        {yearOptions.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                {/* Interests Field */}
                                <div>
                                    <span className='block text-sm font-medium text-gray-300 mb-3'>
                                        Areas of Interest *
                                    </span>
                                    <div className='flex flex-wrap gap-2'>
                                        {interestOptions.map((interest) => (
                                            <div
                                                key={interest.id}
                                                onClick={() =>
                                                    toggleInterest(interest.name)
                                                }
                                                className={`
                                                    px-4 py-2 rounded-full cursor-pointer transition-all
                                                    ${
                                                        formData.interests.includes(interest.name)
                                                            ? 'bg-white text-gray-800 shadow-md'
                                                            : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
                                                    }
                                                `}
                                            >
                                                {interest.name}
                                            </div>
                                        ))}
                                    </div>
                                    {formData.interests.length === 0 && (
                                        <p className='mt-1 text-sm text-red-400'>
                                            Please select at least one area of interest
                                        </p>
                                    )}
                                </div>

                                {/* Previous Experience Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Previous Experience
                                    </label>
                                    <textarea
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        rows={3}
                                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
                                        placeholder="Briefly describe any relevant experience or projects you've worked on"
                                    />
                                </div>

                                {/* Expectations Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        What do you expect to gain from joining our club?
                                    </label>
                                    <textarea
                                        name="expectations"
                                        value={formData.expectations}
                                        onChange={handleChange}
                                        rows={3}
                                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
                                        placeholder="Tell us what you hope to learn or achieve by joining Cloud Community Club"
                                    />
                                </div>

                                {/* Referral Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        How did you hear about us?
                                    </label>
                                    <input
                                        type="text"
                                        name="referral"
                                        value={formData.referral}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
                                        placeholder="Friend, social media, event, etc."
                                    />
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type='submit'
                                        disabled={!isFormValid() || isSubmitting}
                                        className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                            !isFormValid() || isSubmitting
                                                ? 'bg-indigo-700 opacity-60 cursor-not-allowed'
                                                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500'
                                        }`}
                                    >
                                        {isSubmitting ? (
                                            <svg
                                                className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                            >
                                                <circle
                                                    className='opacity-25'
                                                    cx='12'
                                                    cy='12'
                                                    r='10'
                                                    stroke='currentColor'
                                                    strokeWidth='4'
                                                ></circle>
                                                <path
                                                    className='opacity-75'
                                                    fill='currentColor'
                                                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                                ></path>
                                            </svg>
                                        ) : (
                                            <Send className='h-4 w-4 mr-2' />
                                        )}
                                        {isSubmitting
                                            ? 'Submitting...'
                                            : 'Submit Registration'}
                                    </button>
                                </div>
                            </form>

                            <p className="mt-4 text-xs text-gray-400 text-center">
                                * Required fields
                            </p>
                        </div>
                    </div>
                </motion.div>
                
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
        </div>
    )
}