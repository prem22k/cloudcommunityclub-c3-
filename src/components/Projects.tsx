'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Rocket, Stars, Clock, ChevronDown, ChevronUp, Users, Target, Cpu, Code, Database, Zap, Smartphone, Server, ChevronRight } from 'lucide-react'
import { Element } from 'react-scroll'

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  outcome: string;
  mentors?: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AiXOS – AI Integrated Operating System",
    category: "Artificial Intelligence, Operating Systems",
    description: "AiXOS is an advanced AI-integrated operating system where artificial intelligence is embedded directly into the system's kernel rather than at the application layer. Unlike traditional AI assistants that operate as separate applications, AiXOS provides native AI functionalities at the core level, enabling intelligent process management, automated task scheduling, real-time system optimization, and deep user interaction.\n\nThe AI model embedded within the kernel enhances security, system performance, and user experience by intelligently managing resources, predicting system failures, automating maintenance, and optimizing CPU/GPU workloads based on real-time analysis. It also enables developers to interact with the AI through system calls, allowing seamless AI-assisted programming, debugging, and execution of complex operations without additional software layers.",
    outcome: "• A fully functional operating system with AI embedded at the kernel level.\n• Native AI-powered process management and system automation.\n• Intelligent system diagnostics and self-healing capabilities.\n• Optimized resource utilization and improved user experience.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Offline Payment Wallet for Remote Areas",
    category: "FinTech, Decentralized Applications",
    description: "This project aims to develop a decentralized payment system that allows users to send and receive money without requiring an internet connection. The payment transactions are facilitated through alternative communication protocols like Bluetooth, local WiFi, or a direct HTTP-based peer-to-peer (P2P) system.\n\nEach user's mobile device acts as a node in a distributed database, ensuring that transactions are recorded securely and synchronized whenever an internet connection is available. This approach enables financial transactions in rural or remote areas with limited or no internet access, providing a reliable and scalable offline payment ecosystem.\n\nThe system also ensures security through cryptographic methods, local consensus mechanisms, and delayed blockchain integration when internet access is restored. This guarantees transparency, security, and offline usability while maintaining compliance with financial regulations.",
    outcome: "• A decentralized mobile payment application that works without the internet.\n• Peer-to-peer money transfers via Bluetooth, local WiFi, or custom HTTP protocols.\n• A distributed ledger system that syncs data securely once connected to the internet.\n• Financial inclusion for users in remote and underdeveloped areas.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Virtual Labs – Web-based Experimentation Environment",
    category: "Education Technology, Software Development",
    description: "Virtual Labs is an all-in-one web-based sandbox environment for programming and engineering experiments. It provides a single platform where students and professionals can access various lab environments, such as Python and Java compilers, simulated hardware interactions, and engineering experiments.\n\nEach virtual lab consists of a guided theoretical section alongside a practical coding or simulation workspace, enabling hands-on learning. The system ensures an interactive experience where users can modify parameters, run experiments, and visualize outputs in real-time.\n\nThis platform reduces the dependency on physical labs, making learning more accessible and cost-effective. It also enables institutions to offer remote lab experiences, allowing students to conduct experiments anytime and anywhere.",
    outcome: "• A web-based platform providing virtual lab environments for various subjects.\n• Integrated programming sandboxes with real-time execution.\n• Interactive guided experiments for engineering and computer science students.\n• A cost-effective and scalable alternative to physical lab infrastructure.",
    mentors: "Sathwiik B",
    image: "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?q=80&w=2076&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Slim LLMs for Edge Hardware",
    category: "AI/ML, Embedded Systems",
    description: "This project focuses on developing and fine-tuning lightweight Large Language Models (LLMs) optimized for edge devices, such as smartwatches, Raspberry Pi, and other low-power digital systems. Unlike conventional LLMs, which require high-end GPUs and cloud-based processing, these slim LLMs are designed to run efficiently on resource-constrained devices.\n\nTechniques such as model quantization, pruning, and distillation will be used to reduce computational overhead while maintaining the intelligence and effectiveness of the model. These optimized models can be embedded into consumer electronics, IoT devices, and autonomous systems, enabling AI-powered functionalities in offline and constrained environments.",
    outcome: "• Fine-tuned LLMs capable of running on low-power devices.\n• AI-powered smartwatches, Raspberry Pi-based assistants, and embedded AI applications.\n• Efficient, low-latency, and privacy-focused AI models for edge computing.\n• Real-time AI processing on local hardware without dependency on cloud-based solutions.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Distributed Computing Cluster",
    category: "High-Performance Computing, AI/ML",
    description: "The Distributed Computing Cluster project aims to build a decentralized supercomputer by linking multiple low-power computers or devices into a single computing network. This system enables parallel processing and distributed workloads, making it ideal for tasks such as training AI models, large-scale simulations, and high-performance computing applications.\n\nBy coupling multiple nodes into a unified compute cluster, the system leverages collective processing power, reducing reliance on expensive cloud computing. The framework supports dynamic resource allocation, fault tolerance, and seamless scaling, ensuring efficient and cost-effective distributed computing.",
    outcome: "• A functional distributed computing system combining multiple devices into a single compute cluster.\n• Optimized workload distribution for AI model training and complex computations.\n• Scalable and cost-effective alternative to traditional high-performance computing setups.\n• Improved accessibility to powerful computing for research, AI, and large-scale data processing.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop"
  }
];

// Get icon based on project category
const getProjectIcon = (category: string) => {
  if (category.includes("Artificial Intelligence") || category.includes("AI/ML")) {
    return <Zap className="w-8 h-8 text-blue-400" />;
  } else if (category.includes("FinTech") || category.includes("Decentralized")) {
    return <Database className="w-8 h-8 text-green-400" />;
  } else if (category.includes("Education") || category.includes("Software")) {
    return <Code className="w-8 h-8 text-purple-400" />;
  } else if (category.includes("Embedded")) {
    return <Smartphone className="w-8 h-8 text-orange-400" />;
  } else if (category.includes("Computing")) {
    return <Server className="w-8 h-8 text-cyan-400" />;
  }
  return <Cpu className="w-8 h-8 text-blue-400" />;
};

// Animation variants for smoother transitions
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.2,
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 80, 
      damping: 12,
      duration: 0.4
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 70, 
      damping: 14
    }
  },
  hover: { 
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 20 
    }
  }
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function Projects(): React.ReactNode {
    const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const toggleProject = (id: number) => {
        setExpandedProjects(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setSelectedProject(null);
            }
        };

        if (selectedProject !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedProject]);

    return (
        <div className="relative min-h-screen bg-black flex flex-col items-center justify-start overflow-hidden pt-16 sm:pt-24">
            <Element name="projects" />
            
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/assets/projects/coming_soon.webp"
                    alt="Background"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full px-4 py-8 sm:py-12 max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariants}
                    className="space-y-10 text-center mt-4 sm:mt-8 mb-8 sm:mb-12"
                >
                    {/* Main Title */}
                    <motion.h1 
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 px-2 mb-8"
                    >
                        Project Schools
                    </motion.h1>

                    {/* Description */}
                    <motion.p 
                        variants={itemVariants}
                        className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto"
                    >
                        We're launching Project Schools under C³, where we'll collaborate on exciting tech projects, 
                        learn new skills, and build something amazing together!
                    </motion.p>

                    {/* Features */}
                    <motion.div 
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="bg-gradient-to-br from-neutral-900/50 to-neutral-950/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
                            whileHover={{ scale: 1.03 }}
                        >
                            <div className="flex justify-center mb-4">
                                <Cpu className="w-12 h-12 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3 text-center">
                                Hands-on Learning
                            </h3>
                            <p className="text-gray-300 text-center">
                                Gain practical experience by working on real-world projects with cutting-edge technologies
                            </p>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="bg-gradient-to-br from-neutral-900/50 to-neutral-950/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:shadow-lg hover:shadow-purple-900/20 transition-all duration-300"
                            whileHover={{ scale: 1.03 }}
                        >
                            <div className="flex justify-center mb-4">
                                <Users className="w-12 h-12 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3 text-center">
                                Collaborative Environment
                            </h3>
                            <p className="text-gray-300 text-center">
                                Work alongside peers and mentors in a supportive community focused on growth
                            </p>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="bg-gradient-to-br from-neutral-900/50 to-neutral-950/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:shadow-lg hover:shadow-cyan-900/20 transition-all duration-300"
                            whileHover={{ scale: 1.03 }}
                        >
                            <div className="flex justify-center mb-4">
                                <Target className="w-12 h-12 text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3 text-center">
                                Portfolio Building
                            </h3>
                            <p className="text-gray-300 text-center">
                                Create impressive projects that showcase your skills to future employers
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Projects List */}
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="mt-20"
                >
                    <motion.h2 
                        variants={itemVariants}
                        className="text-3xl font-bold text-white text-center mb-12"
                    >
                        Current Projects
                    </motion.h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 shadow-lg hover:border-gray-700 transition-colors duration-300 flex flex-col"
                            >
                                {/* Project Image */}
                                <div className="relative aspect-square overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                                    
                                    {/* Project Icon */}
                                    <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm">
                                        {getProjectIcon(project.category)}
                                    </div>
                                    
                                    {/* Project Title */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-blue-400 text-sm">
                                            {project.category}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Project Card Footer */}
                                <div className="mt-auto border-t border-gray-800">
                                    <motion.button
                                        onClick={() => setSelectedProject(project.id)}
                                        className="w-full py-4 px-6 flex items-center justify-between text-gray-300 hover:bg-gray-800/30 transition-all duration-300"
                                        whileHover={{ backgroundColor: "rgba(31, 41, 55, 0.4)" }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="font-medium flex items-center">
                                            <motion.span
                                                className="mr-2 text-purple-400"
                                                animate={{ x: [0, 3, 0] }}
                                                transition={{ 
                                                    repeat: Infinity, 
                                                    repeatType: "mirror", 
                                                    duration: 1.5,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </motion.span>
                                            Explore Project
                                        </span>
                                        
                                        {/* Progress indicator dots */}
                                        <div className="flex space-x-1">
                                            {[...Array(3)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-1.5 h-1.5 rounded-full bg-blue-500"
                                                    animate={{
                                                        opacity: [0.3, 1, 0.3],
                                                        scale: [0.8, 1.2, 0.8]
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        delay: i * 0.2,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                

                {/* Project Details Modal */}
                <AnimatePresence>
                    {selectedProject !== null && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                                onClick={() => setSelectedProject(null)}
                            />
                            
                            {/* Modal */}
                            <motion.div
                                ref={modalRef}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ 
                                    type: "spring", 
                                    damping: 25, 
                                    stiffness: 300 
                                }}
                                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-none"
                            >
                                <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl border border-gray-800 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden pointer-events-auto">
                                    <div className="max-h-[90vh] overflow-y-auto">
                                        {projects.filter(p => p.id === selectedProject).map(project => (
                                            <div key={project.id} className="relative">
                                                {/* Close button */}
                                                <button 
                                                    onClick={() => setSelectedProject(null)}
                                                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors z-10"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                                
                                                {/* Header with image */}
                                                <div className="relative h-48 sm:h-64 overflow-hidden">
                                                    <Image
                                                        src={project.image}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                                                    
                                                    {/* Project Icon */}
                                                    <div className="absolute top-4 left-4 p-3 rounded-full bg-black/50 backdrop-blur-sm">
                                                        {getProjectIcon(project.category)}
                                                    </div>
                                                    
                                                    {/* Project Title */}
                                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                                            {project.title}
                                                        </h3>
                                                        <p className="text-blue-400 text-sm">
                                                            {project.category}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                {/* Content */}
                                                <div className="p-6 sm:p-8 space-y-8 relative">
                                                    {/* Decorative elements */}
                                                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -mr-24 -mt-24"></div>
                                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
                                                    
                                                    <div className="relative">
                                                        <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                                                            <span className="w-1 h-8 bg-blue-500 rounded-full mr-4"></span>
                                                            Description
                                                        </h4>
                                                        <p className="text-gray-300 whitespace-pre-line text-base leading-relaxed pl-5 border-l border-gray-800">
                                                            {project.description}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="relative">
                                                        <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                                                            <span className="w-1 h-8 bg-purple-500 rounded-full mr-4"></span>
                                                            Expected Outcomes
                                                        </h4>
                                                        <div className="text-gray-300 whitespace-pre-line text-base leading-relaxed pl-5 border-l border-gray-800">
                                                            {project.outcome.split('\n').map((item, index) => (
                                                                <div key={index} className="mb-3 flex items-start">
                                                                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3 flex-shrink-0"></div>
                                                                    <span>{item.replace('• ', '')}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    
                                                    {project.mentors && (
                                                        <div className="relative">
                                                            <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                                                                <span className="w-1 h-8 bg-green-500 rounded-full mr-4"></span>
                                                                Mentors
                                                            </h4>
                                                            <div className="flex items-center pl-5 border-l border-gray-800">
                                                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                                                                    {project.mentors.charAt(0)}
                                                                </div>
                                                                <p className="text-gray-300">{project.mentors}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Join Project Button */}
                                                    <div className="pt-4 flex justify-center">
                                                        <motion.a
                                                            href="/join-us"
                                                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 font-medium"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            View this project
                                                            <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                <path d="M19 12H4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </motion.a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}