'use client'

import React, { useState } from 'react'
import { Send } from 'lucide-react'
import SuccessAnimation from '../../components/SuccessAnimation'
import ErrorAnimation from '../../components/ErrorAnimation'
import Image from 'next/image'
import { motion } from 'framer-motion'

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

export default function JoinUs() {
    // Form state
    const [formData, setFormData] = useState<{
        name: string
        mobile: string
        email: string
        department: string
        interests: string[]
        expectations: string
    }>({
        name: '',
        mobile: '',
        email: '',
        department: '',
        interests: [],
        expectations: '',
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

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Simulate API call - replace with actual endpoint
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
                        interests: [],
                        expectations: '',
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
        const { name, mobile, email, department } = formData
        return (
            name.trim() !== '' &&
            mobile.trim() !== '' &&
            email.trim() !== '' &&
            isCollegeEmail(email) &&
            department.trim() !== '' &&
            formData.interests.length > 0
        )
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
                                    Open Session Registration Form
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

                                {/* Expectations Field */}
                                <div>
                                    <label
                                        htmlFor='expectations'
                                        className='block text-sm font-medium text-gray-300'
                                    >
                                        What are you expecting from us?
                                    </label>
                                    <textarea
                                        id='expectations'
                                        name='expectations'
                                        value={formData.expectations}
                                        onChange={handleChange}
                                        rows={3}
                                        className='mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white'
                                        placeholder='Tell us what you hope to gain from joining C3...'
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
            </div>
        </div>
    )
}
