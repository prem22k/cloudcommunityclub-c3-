'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Rocket, Stars, Clock, ChevronDown, ChevronUp, Users, Target, Cpu } from 'lucide-react'
import { Element } from 'react-scroll'

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  outcome: string;
  mentors?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AiXOS – AI Integrated Operating System",
    category: "Artificial Intelligence, Operating Systems",
    description: "AiXOS is an advanced AI-integrated operating system where artificial intelligence is embedded directly into the system's kernel rather than at the application layer. Unlike traditional AI assistants that operate as separate applications, AiXOS provides native AI functionalities at the core level, enabling intelligent process management, automated task scheduling, real-time system optimization, and deep user interaction.\n\nThe AI model embedded within the kernel enhances security, system performance, and user experience by intelligently managing resources, predicting system failures, automating maintenance, and optimizing CPU/GPU workloads based on real-time analysis. It also enables developers to interact with the AI through system calls, allowing seamless AI-assisted programming, debugging, and execution of complex operations without additional software layers.",
    outcome: "• A fully functional operating system with AI embedded at the kernel level.\n• Native AI-powered process management and system automation.\n• Intelligent system diagnostics and self-healing capabilities.\n• Optimized resource utilization and improved user experience."
  },
  {
    id: 2,
    title: "Offline Payment Wallet for Remote Areas",
    category: "FinTech, Decentralized Applications",
    description: "This project aims to develop a decentralized payment system that allows users to send and receive money without requiring an internet connection. The payment transactions are facilitated through alternative communication protocols like Bluetooth, local WiFi, or a direct HTTP-based peer-to-peer (P2P) system.\n\nEach user's mobile device acts as a node in a distributed database, ensuring that transactions are recorded securely and synchronized whenever an internet connection is available. This approach enables financial transactions in rural or remote areas with limited or no internet access, providing a reliable and scalable offline payment ecosystem.\n\nThe system also ensures security through cryptographic methods, local consensus mechanisms, and delayed blockchain integration when internet access is restored. This guarantees transparency, security, and offline usability while maintaining compliance with financial regulations.",
    outcome: "• A decentralized mobile payment application that works without the internet.\n• Peer-to-peer money transfers via Bluetooth, local WiFi, or custom HTTP protocols.\n• A distributed ledger system that syncs data securely once connected to the internet.\n• Financial inclusion for users in remote and underdeveloped areas."
  },
  {
    id: 3,
    title: "Virtual Labs – Web-based Experimentation Environment",
    category: "Education Technology, Software Development",
    description: "Virtual Labs is an all-in-one web-based sandbox environment for programming and engineering experiments. It provides a single platform where students and professionals can access various lab environments, such as Python and Java compilers, simulated hardware interactions, and engineering experiments.\n\nEach virtual lab consists of a guided theoretical section alongside a practical coding or simulation workspace, enabling hands-on learning. The system ensures an interactive experience where users can modify parameters, run experiments, and visualize outputs in real-time.\n\nThis platform reduces the dependency on physical labs, making learning more accessible and cost-effective. It also enables institutions to offer remote lab experiences, allowing students to conduct experiments anytime and anywhere.",
    outcome: "• A web-based platform providing virtual lab environments for various subjects.\n• Integrated programming sandboxes with real-time execution.\n• Interactive guided experiments for engineering and computer science students.\n• A cost-effective and scalable alternative to physical lab infrastructure.",
    mentors: "Sathwiik B"
  },
  {
    id: 4,
    title: "Slim LLMs for Edge Hardware",
    category: "AI/ML, Embedded Systems",
    description: "This project focuses on developing and fine-tuning lightweight Large Language Models (LLMs) optimized for edge devices, such as smartwatches, Raspberry Pi, and other low-power digital systems. Unlike conventional LLMs, which require high-end GPUs and cloud-based processing, these slim LLMs are designed to run efficiently on resource-constrained devices.\n\nTechniques such as model quantization, pruning, and distillation will be used to reduce computational overhead while maintaining the intelligence and effectiveness of the model. These optimized models can be embedded into consumer electronics, IoT devices, and autonomous systems, enabling AI-powered functionalities in offline and constrained environments.",
    outcome: "• Fine-tuned LLMs capable of running on low-power devices.\n• AI-powered smartwatches, Raspberry Pi-based assistants, and embedded AI applications.\n• Efficient, low-latency, and privacy-focused AI models for edge computing.\n• Real-time AI processing on local hardware without dependency on cloud-based solutions."
  },
  {
    id: 5,
    title: "Distributed Computing Cluster",
    category: "High-Performance Computing, AI/ML",
    description: "The Distributed Computing Cluster project aims to build a decentralized supercomputer by linking multiple low-power computers or devices into a single computing network. This system enables parallel processing and distributed workloads, making it ideal for tasks such as training AI models, large-scale simulations, and high-performance computing applications.\n\nBy coupling multiple nodes into a unified compute cluster, the system leverages collective processing power, reducing reliance on expensive cloud computing. The framework supports dynamic resource allocation, fault tolerance, and seamless scaling, ensuring efficient and cost-effective distributed computing.",
    outcome: "• A functional distributed computing system combining multiple devices into a single compute cluster.\n• Optimized workload distribution for AI model training and complex computations.\n• Scalable and cost-effective alternative to traditional high-performance computing setups.\n• Improved accessibility to powerful computing for research, AI, and large-scale data processing."
  }
];

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
    const [expandedProject, setExpandedProject] = useState<number | null>(null);

    const toggleProject = (id: number) => {
        setExpandedProject(expandedProject === id ? null : id);
    };

    return (
        <div className="relative min-h-screen bg-black flex flex-col items-center justify-start overflow-hidden pt-16 sm:pt-0">
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
            <div className="relative z-10 w-full px-4 py-16 max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariants}
                    className="space-y-8 text-center"
                >
                    {/* Main Title */}
                    <motion.h1 
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 px-2 mb-4"
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
                    className="mt-20 space-y-6"
                >
                    <motion.h2 
                        variants={itemVariants}
                        className="text-3xl font-bold text-white text-center mb-8"
                    >
                        Current Projects
                    </motion.h2>
                    
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 shadow-lg hover:border-gray-700 transition-colors duration-300"
                        >
                            <div 
                                className="p-6 cursor-pointer flex justify-between items-center"
                                onClick={() => toggleProject(project.id)}
                            >
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white">{project.title}</h3>
                                    <p className="text-blue-400 text-sm mt-1">{project.category}</p>
                                </div>
                                <div className="text-gray-400">
                                    {expandedProject === project.id ? (
                                        <ChevronUp className="w-6 h-6" />
                                    ) : (
                                        <ChevronDown className="w-6 h-6" />
                                    )}
                                </div>
                            </div>
                            
                            <AnimatePresence mode="wait">
                                {expandedProject === project.id && (
                                    <motion.div 
                                        key={`content-${project.id}`}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ 
                                            opacity: 1, 
                                            height: "auto",
                                            transition: {
                                                height: { 
                                                    duration: 0.35,
                                                    ease: [0.04, 0.62, 0.23, 0.98]
                                                },
                                                opacity: { 
                                                    duration: 0.25,
                                                    delay: 0.05 
                                                }
                                            }
                                        }}
                                        exit={{ 
                                            opacity: 0, 
                                            height: 0,
                                            transition: {
                                                height: { 
                                                    duration: 0.25,
                                                    ease: [0.04, 0.62, 0.23, 0.98]
                                                },
                                                opacity: { 
                                                    duration: 0.2 
                                                }
                                            }
                                        }}
                                        className="px-6 pb-6 pt-2 border-t border-gray-800 overflow-hidden"
                                    >
                                        <div className="mb-4">
                                            <h4 className="text-lg font-semibold text-gray-300 mb-2">Description</h4>
                                            <p className="text-gray-400 whitespace-pre-line">{project.description}</p>
                                        </div>
                                        
                                        <div className="mb-4">
                                            <h4 className="text-lg font-semibold text-gray-300 mb-2">Expected Outcomes</h4>
                                            <p className="text-gray-400 whitespace-pre-line">{project.outcome}</p>
                                        </div>
                                        
                                        {project.mentors && (
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-300 mb-2">Mentors</h4>
                                                <p className="text-gray-400">{project.mentors}</p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        delay: 0.8, 
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                    }}
                    className="mt-16 text-center"
                >
                    <h3 className="text-2xl font-bold text-white mb-6">Ready to join Project Schools?</h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.a
                            href="/join-us"
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 text-lg font-medium"
                            whileHover={{ 
                                scale: 1.03, 
                                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5), 0 8px 10px -6px rgba(124, 58, 237, 0.5)" 
                            }}
                            whileTap={{ scale: 0.97 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17
                            }}
                        >
                            Apply Now
                        </motion.a>
                        <motion.a
                            href="https://discord.gg/dBNXWDKhrD"
                            className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 text-lg font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Join Discord
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}