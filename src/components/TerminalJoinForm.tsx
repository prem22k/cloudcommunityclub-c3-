'use client'

import React, { useState, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { GitBranch } from 'lucide-react'
import TerminalWindow from './TerminalWindow'

// Department enum values
const DEPARTMENTS = [
    'CSE',
    'CSE-AIML',
    'CSE-DS',
    'CSE-CS',
    'IT',
    'ECE',
    'EEE',
    'MECH',
    'CIVIL',
    'OTHER',
] as const

// Zod schema for the Join Club form
export const joinClubSchema = z.object({
    fullName: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters'),
    rollNumber: z
        .string()
        .min(10, 'Roll number must be at least 10 characters')
        .regex(/^[A-Z0-9]+$/i, 'Roll number must be alphanumeric'),
    email: z.string().email(),
    phone: z.string().min(10),
    department: z.enum(DEPARTMENTS),
    year: z.enum(['1', '2', '3', '4']),
    motivation: z.string().min(20).max(500),
})

export type JoinClubFormData = z.infer<typeof joinClubSchema>

type FieldName = keyof JoinClubFormData

interface FormStep {
    id: number
    title: string
    description: string
    fields: FieldName[]
    pathSegment: string
}

export const FORM_STEPS: FormStep[] = [
    {
        id: 0,
        title: 'Identity',
        description: 'Initialize user profile',
        fields: ['fullName', 'rollNumber'],
        pathSegment: 'identity',
    },
    {
        id: 1,
        title: 'Contact',
        description: 'Configure communication channels',
        fields: ['email', 'phone'],
        pathSegment: 'contact',
    },
    {
        id: 2,
        title: 'Academics',
        description: 'Select branch and year',
        fields: ['department', 'year'],
        pathSegment: 'academics',
    },
    {
        id: 3,
        title: 'Motivation',
        description: 'Define purpose function',
        fields: ['motivation'],
        pathSegment: 'motivation',
    },
]

// Terminal Progress Component - Enforcing h-6 grid
interface TerminalProgressProps {
    currentStep: number
    steps: FormStep[]
}

function TerminalProgress({ currentStep, steps }: TerminalProgressProps) {
    const totalSteps = steps.length
    const completedSteps = currentStep + 1
    const percentage = Math.round((completedSteps / totalSteps) * 100)

    const barLength = 20
    const filledLength = Math.round((completedSteps / totalSteps) * barLength)
    const emptyLength = barLength - filledLength
    const loadingBar = '█'.repeat(filledLength) + '░'.repeat(emptyLength)

    return (
        <div className="mb-6 border-b border-[#6272a4]/30 pb-0 select-none">
            {/* Line 1: Path - h-6 */}
            <div className="flex items-center gap-1 text-sm h-6 leading-6 font-mono">
                <span className="text-[#ff79c6]">➜</span>
                <span className="text-[#8be9fd]">~</span>
                <span className="text-[#6272a4]">/</span>
                {steps.map((step, idx) => (
                    <React.Fragment key={step.id}>
                        <span
                            className={
                                idx < currentStep
                                    ? 'text-[#6272a4]'
                                    : idx === currentStep
                                        ? 'text-[#ff79c6] font-bold'
                                        : 'text-[#44475a]'
                            }
                        >
                            {step.pathSegment}
                        </span>
                        {idx < steps.length - 1 && (
                            <span className="text-[#6272a4]">/</span>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Line 2: Progress Bar - h-6 */}
            <div className="flex items-center gap-3 text-xs h-6 leading-6 font-mono">
                <span className="text-[#6272a4]">Progress:</span>
                <span className="text-[#ff79c6]">[</span>
                <span className="text-[#50fa7b]">{loadingBar}</span>
                <span className="text-[#ff79c6]">]</span>
                <span className="text-[#50fa7b]">{percentage}%</span>
            </div>

            {/* Spacer Line to match grid */}
            <div className="h-6"></div>
        </div>
    )
}

const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
}

const terminalInputClass = `
    w-full bg-transparent border-none outline-none text-[#f1fa8c] 
    placeholder:text-[#6272a4] caret-transparent
    focus:ring-0 focus:outline-none font-mono h-6 leading-6 p-0
`

const terminalTextareaClass = `
    w-full bg-transparent border-none outline-none text-[#f1fa8c] 
    placeholder:text-[#6272a4] caret-transparent resize-none
    focus:ring-0 focus:outline-none font-mono leading-6 p-0
`

export default function TerminalJoinForm() {
    const [submissionLogs, setSubmissionLogs] = useState<string[]>([])
    const [currentStep, setCurrentStep] = useState(0)
    const [direction, setDirection] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [cursorPosition, setCursorPosition] = useState({ line: 1, col: 1 })
    const [activeBaseLine, setActiveBaseLine] = useState<number | null>(null)
    const [focusedField, setFocusedField] = useState<FieldName | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // Helper to reset cursor state on step change
    const updateCursorPosition = useCallback((element: HTMLInputElement | HTMLTextAreaElement) => {
        const text = element.value.substring(0, element.selectionStart || 0)
        const lines = text.split('\n')
        const line = lines.length
        const col = lines[lines.length - 1].length + 1
        setCursorPosition({ line, col })
    }, [])

    const autoExpandTextarea = useCallback((textarea: HTMLTextAreaElement) => {
        textarea.style.height = 'auto'
        const scrollHeight = textarea.scrollHeight
        const lines = Math.ceil(scrollHeight / 24)
        textarea.style.height = `${lines * 24}px`
    }, [])

    const handleInputEvents = (e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        updateCursorPosition(e.currentTarget)
        if (e.currentTarget instanceof HTMLTextAreaElement) {
            autoExpandTextarea(e.currentTarget)
        }
    }

    // Helper to reset cursor state on step change
    const updateStep = (newStep: number, dir: number) => {
        setDirection(dir)
        setCurrentStep(newStep)
        setCursorPosition({ line: 1, col: 1 }) // Reset cursor
        setActiveBaseLine(null)
        setFocusedField(null)
    }

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        getValues,
        watch
    } = useForm<JoinClubFormData>({
        resolver: zodResolver(joinClubSchema),
        mode: 'onBlur',
    })

    // Watch values to ensure cursor updates even on programmatic changes if needed
    watch()

    const currentStepConfig = FORM_STEPS[currentStep]
    const isFirstStep = currentStep === 0
    const isLastStep = currentStep === FORM_STEPS.length - 1

    const nextStep = async () => {
        const fieldsToValidate = currentStepConfig.fields
        const isValid = await trigger(fieldsToValidate)
        if (isValid) {
            if (isLastStep) {
                handleSubmit(onSubmit)()
            } else {
                updateStep(Math.min(currentStep + 1, FORM_STEPS.length - 1), 1)
            }
        }
    }

    const prevStep = () => {
        updateStep(Math.max(currentStep - 1, 0), -1)
    }

    const onSubmit = async (data: JoinClubFormData) => {
        setIsSubmitting(true)
        setSubmissionLogs([])

        // 1. Visual Sequence Promise
        const visualSequence = async () => {
            const sequence = [
                { msg: '> git add .', delay: 400 },
                { msg: '> git commit -m "feat: new member registration"', delay: 800 },
                { msg: '> git push -u origin main', delay: 1200 },
                { msg: 'remote: Resolving deltas: 100% (3/3), completed with 3 local objects.', delay: 1500 },
                { msg: 'remote: Compiling user profile...', delay: 800 },
                { msg: 'remote: Bundling assets...', delay: 800 },
                { msg: 'remote: Verifying integrity...', delay: 600 },
            ]

            for (const step of sequence) {
                setSubmissionLogs(prev => [...prev, step.msg])
                await new Promise(resolve => setTimeout(resolve, step.delay))
            }
        }

        // 2. API Request Promise
        const apiRequest = async () => {
            try {
                const response = await fetch('/api/join', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.message || 'Server rejected bundle')
                }
                return true
            } catch (error) {
                throw error
            }
        }

        try {
            // Run both in parallel. 
            // We wait for BOTH to finish. If API is fast, visuals keep playing. If API is slow, visuals wait at end.
            await Promise.all([visualSequence(), apiRequest()])

            setSubmissionLogs(prev => [...prev, 'remote: Deployment successful!'])
            await new Promise(resolve => setTimeout(resolve, 400))

            setSubmitSuccess(true)
        } catch (error) {
            console.error('Registration failed:', error)
            setSubmissionLogs(prev => [
                ...prev,
                `\n❌ ERROR: ${(error as Error).message}`,
                `> git reset --hard HEAD~1`
            ])
            // Do not set success, stay in submitting/error state or let user retry
            setIsSubmitting(false)
        }
    }


    // Base offset for all steps.
    // We calculate this dynamically based on DOM position to account for variable height (errors, etc)
    const calculateBaseLine = (element: HTMLElement) => {
        if (!containerRef.current) return

        const rect = element.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()

        // Relative top from the container
        const relativeTop = rect.top - containerRect.top

        // Convert pixels to lines (24px per line)
        // We round to nearest line index. 
        // Note: Line 1 starts physically at 0 relative to content area? 
        // In TerminalWindow, ActiveHighlight for line 1 is at top: 24px.
        // ContainerRef is the .relative parent.
        // If element is inside CodeArea (p-6 creates 24px pad), then first element is at 24px relativeTop.
        // 24px / 24 = 1. Perfect.

        const lineVal = Math.round(relativeTop / 24)
        setActiveBaseLine(lineVal)
    }

    const handleFocus = (visualLineOffset: number, fieldName: FieldName, e?: React.FocusEvent<any>) => {
        setFocusedField(fieldName)
        // Use the event target if available to calculate line
        if (e?.target) {
            calculateBaseLine(e.target as HTMLElement)
        } else {
            // Fallback or initial focus - trickier without event. 
            // We rely on the fact that most focus comes from interaction.
            // For programmatic focus (page load), we use a useEffect if needed, 
            // see below.
        }
    }

    // Recalculate position when errors change (layout shift)
    React.useEffect(() => {
        if (focusedField && document.activeElement) {
            const activeEl = document.activeElement as HTMLElement
            // Verify active element is actually one of our inputs
            if (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') {
                calculateBaseLine(activeEl)
            }
        }
    }, [errors, focusedField])

    // Handle Enter key for navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            nextStep()
        }
        handleInputEvents(e)
    }

    // Reuseable Cursor Component
    const BlinkingCursor = ({ colOffset = 0, style = {} }) => (
        <span
            className="absolute w-2 h-5 bg-gray-400 pointer-events-none animate-[pulse_1s_ease-in-out_infinite] z-20"
            style={{
                left: `calc(${(cursorPosition.col - 1 + colOffset)} * 1ch)`,
                top: '2px', // vertically center in h-6 (24px - 20px / 2 = 2px)
                ...style
            }}
        />
    )

    const renderField = (fieldName: FieldName) => {
        const error = errors[fieldName]

        // Dynamic input class based on error state
        const getInputClass = (baseClass: string) => `
            ${baseClass}
            ${error ? 'underline decoration-wavy decoration-[#ff5555] underline-offset-4' : ''}
        `

        const renderLine = (content: React.ReactNode, extraClass = "") => (
            <div className={`h-6 leading-6 flex items-center ${extraClass}`}>
                {content}
            </div>
        )

        // Compiler-style error message
        const renderError = (msg?: string) => msg ? renderLine(
            <span className="text-[#ff5555]/70 text-xs font-mono">
                <span className="text-[#ff5555] mr-2">^</span>
                Error: <span className="italic">{msg}</span>
            </span>,
            "pl-6"
        ) : null

        switch (fieldName) {
            case 'fullName':
                return (
                    <div key={fieldName} className="mb-6 font-mono">
                        {renderLine(<span className="text-[#6272a4]">{'// Enter your full name'}</span>)}
                        <div className="flex items-center pl-4 border-l-2 border-[#6272a4]/30 ml-1 h-6 relative group">
                            <span className="text-[#ff79c6] mr-2">const</span>
                            <span className="text-[#8be9fd] mr-2">fullName</span>
                            <span className="text-[#ff79c6] mr-2">=</span>
                            <span className="text-[#f1fa8c] mr-1">"</span>
                            <div className="relative flex-1">
                                <input
                                    {...register('fullName')}
                                    className={getInputClass(terminalInputClass)}
                                    placeholder="Grace Hopper"
                                    autoComplete="off"
                                    onKeyUp={handleInputEvents}
                                    onKeyDown={handleKeyDown}
                                    onClick={handleInputEvents}
                                    onSelect={handleInputEvents}
                                    onChange={(e) => {
                                        register('fullName').onChange(e)
                                        handleInputEvents(e)
                                    }}
                                    onFocus={(e) => handleFocus(2, 'fullName', e)}
                                    autoFocus
                                />
                                {focusedField === 'fullName' && <BlinkingCursor />}
                            </div>
                            <span className="text-[#f1fa8c]">"</span>
                            <span className="text-[#6272a4] ml-1">;</span>
                        </div>
                        {renderError(error?.message)}
                    </div>
                )

            case 'rollNumber':
                return (
                    <div key={fieldName} className="mb-6 font-mono">
                        {renderLine(<span className="text-[#6272a4]">{'// Enter your roll number'}</span>)}
                        <div className="flex items-center pl-4 border-l-2 border-[#6272a4]/30 ml-1 h-6 relative">
                            <span className="text-[#ff79c6] mr-2">const</span>
                            <span className="text-[#8be9fd] mr-2">rollNo</span>
                            <span className="text-[#ff79c6] mr-2">=</span>
                            <span className="text-[#f1fa8c] mr-1">"</span>
                            <div className="relative flex-1">
                                <input
                                    {...register('rollNumber')}
                                    className={`${getInputClass(terminalInputClass)} uppercase`}
                                    placeholder="21B01A0501"
                                    autoComplete="off"
                                    onKeyUp={handleInputEvents}
                                    onKeyDown={handleKeyDown}
                                    onClick={handleInputEvents}
                                    onSelect={handleInputEvents}
                                    onChange={(e) => {
                                        register('rollNumber').onChange(e)
                                        handleInputEvents(e)
                                    }}
                                    onFocus={(e) => handleFocus(5, 'rollNumber', e)}
                                />
                                {focusedField === 'rollNumber' && <BlinkingCursor />}
                            </div>
                            <span className="text-[#f1fa8c]">"</span>
                            <span className="text-[#6272a4] ml-1">;</span>
                        </div>
                        {renderError(error?.message)}
                    </div>
                )

            case 'email':
                return (
                    <div key={fieldName} className="mb-6 font-mono">
                        {renderLine(<span className="text-[#6272a4]">{'// Enter your email address'}</span>)}
                        <div className="flex items-center pl-4 border-l-2 border-[#6272a4]/30 ml-1 h-6">
                            <span className="text-[#ff79c6] mr-2">let</span>
                            <span className="text-[#8be9fd] mr-2">email</span>
                            <span className="text-[#ff79c6] mr-2">=</span>
                            <span className="text-[#f1fa8c] mr-1">"</span>
                            <div className="relative flex-1">
                                <input
                                    {...register('email')}
                                    className={getInputClass(terminalInputClass)}
                                    placeholder="grace@example.com"
                                    autoComplete="off"
                                    onKeyUp={handleInputEvents}
                                    onKeyDown={handleKeyDown}
                                    onClick={handleInputEvents}
                                    onSelect={handleInputEvents}
                                    onChange={(e) => {
                                        register('email').onChange(e)
                                        handleInputEvents(e)
                                    }}
                                    onFocus={(e) => handleFocus(5, 'email', e)}
                                    autoFocus
                                />
                                {focusedField === 'email' && <BlinkingCursor />}
                            </div>
                            <span className="text-[#f1fa8c]">"</span>
                            <span className="text-[#6272a4] ml-1">;</span>
                        </div>
                        {renderError(error?.message)}
                    </div>
                )

            case 'phone':
                return (
                    <div key={fieldName} className="mb-6 font-mono">
                        {renderLine(<span className="text-[#6272a4]">{'// Enter your phone number'}</span>)}
                        <div className="flex items-center pl-4 border-l-2 border-[#6272a4]/30 ml-1 h-6">
                            <span className="text-[#ff79c6] mr-2">let</span>
                            <span className="text-[#8be9fd] mr-2">phone</span>
                            <span className="text-[#ff79c6] mr-2">=</span>
                            <span className="text-[#f1fa8c] mr-1">"</span>
                            <div className="relative flex-1">
                                <input
                                    {...register('phone')}
                                    className={getInputClass(terminalInputClass)}
                                    placeholder="+91 9876543210"
                                    autoComplete="off"
                                    onKeyUp={handleInputEvents}
                                    onKeyDown={handleKeyDown}
                                    onClick={handleInputEvents}
                                    onSelect={handleInputEvents}
                                    onChange={(e) => {
                                        register('phone').onChange(e)
                                        handleInputEvents(e)
                                    }}
                                    onFocus={(e) => handleFocus(5, 'phone', e)}
                                />
                                {focusedField === 'phone' && <BlinkingCursor />}
                            </div>
                            <span className="text-[#f1fa8c]">"</span>
                            <span className="text-[#6272a4] ml-1">;</span>
                        </div>
                        {renderError(error?.message)}
                    </div>
                )

            case 'department':
                return (
                    <div key={fieldName} className="mb-6 font-mono">
                        {renderLine(<span className="text-[#6272a4]">{'// Select your department enum'}</span>)}
                        <div className="pl-4 border-l-2 border-[#6272a4]/30 ml-1">
                            <div className="flex items-center mb-0 h-6">
                                <span className="text-[#ff79c6] mr-2">const</span>
                                <span className="text-[#8be9fd] mr-2">dept</span>
                                <span className="text-[#ff79c6] mr-2">=</span>
                                <span className="text-[#bd93f9]">Department</span>
                                <span className="text-[#f8f8f2]">.</span>
                            </div>
                            {/* Departments grid - must be multiples of h-6 */}
                            <div className="pl-6 grid grid-cols-2 gap-y-0 gap-x-2">
                                {DEPARTMENTS.map((dept) => (
                                    <label
                                        key={dept}
                                        className="flex items-center gap-2 cursor-pointer hover:bg-[#44475a]/50 px-2 transition-colors group h-6"
                                    >
                                        <input
                                            {...register('department')}
                                            type="radio"
                                            value={dept}
                                            className="sr-only peer"
                                            onFocus={(e) => handleFocus(2, 'department', e)}
                                        />
                                        <span className="text-[#6272a4] peer-checked:text-[#50fa7b] group-hover:text-[#f8f8f2] transition-colors">
                                            {getValues('department') === dept ? '◉' : '○'}
                                        </span>
                                        <span className={`text-sm ${getValues('department') === dept ? 'text-[#f1fa8c] font-bold' : 'text-[#6272a4] group-hover:text-[#f8f8f2]'}`}>
                                            {dept}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        {renderError(error?.message)}
                    </div>
                )

            case 'year':
                return (
                    <div key={fieldName} className="mb-6 font-mono">
                        {renderLine(<span className="text-[#6272a4]">{'// Select your current year'}</span>)}
                        <div className="pl-4 border-l-2 border-[#6272a4]/30 ml-1">
                            <div className="flex items-center mb-2 h-6">
                                <span className="text-[#ff79c6] mr-2">let</span>
                                <span className="text-[#8be9fd] mr-2">year</span>
                                <span className="text-[#ff79c6] mr-2">=</span>
                            </div>
                            <div className="pl-6 flex gap-4">
                                {['1', '2', '3', '4'].map((yr) => (
                                    <label
                                        key={yr}
                                        className="flex items-center gap-2 cursor-pointer hover:bg-[#44475a]/50 px-2 transition-colors group h-6"
                                    >
                                        <input
                                            {...register('year')}
                                            type="radio"
                                            value={yr}
                                            className="sr-only peer"
                                            onFocus={(e) => handleFocus(2, 'year', e)}
                                        />
                                        <span className="text-[#6272a4] peer-checked:text-[#50fa7b] group-hover:text-[#f8f8f2] transition-colors">
                                            {getValues('year') === yr ? '◉' : '○'}
                                        </span>
                                        <span className={`text-sm ${getValues('year') === yr ? 'text-[#f1fa8c] font-bold' : 'text-[#6272a4] group-hover:text-[#f8f8f2]'}`}>
                                            {yr}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        {renderError(error?.message)}
                    </div>
                )

            case 'motivation':
                const { ref: motivationRef, ...motivationRegister } = register('motivation')
                return (
                    <div key={fieldName} className="mb-6 font-mono">
                        {renderLine(<span className="text-[#6272a4]">{'// Why do you want to join C³?'}</span>)}
                        <div className="pl-3 border-l-2 border-[#6272a4]/30 ml-1">
                            {renderLine(
                                <>
                                    <span className="text-[#ff79c6] mr-2">function</span>
                                    <span className="text-[#50fa7b] mr-2">getMotivation</span>
                                    <span className="text-[#f8f8f2]">()</span>
                                    <span className="text-[#f8f8f2] ml-2">{`{`}</span>
                                </>
                                , "pl-1")}

                            <div className="flex pl-4">
                                <div className="flex-1 relative">
                                    <span className="text-[#ff79c6] absolute -left-2 top-0 h-6 leading-6">return</span>
                                    <span className="text-[#f1fa8c] absolute left-10 top-0 h-6 leading-6">`</span>
                                    <textarea
                                        {...motivationRegister}
                                        ref={(e) => {
                                            motivationRef(e)
                                            if (e) (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = e
                                        }}
                                        className={`${terminalTextareaClass} min-h-[96px] pl-12 ${error ? 'underline decoration-wavy decoration-[#ff5555] underline-offset-4' : ''}`}
                                        placeholder="I want to learn..."
                                        onChange={(e) => {
                                            motivationRegister.onChange(e)
                                            handleInputEvents(e)
                                        }}
                                        onSelect={handleInputEvents}
                                        onClick={handleInputEvents}
                                        onKeyUp={handleInputEvents} // KeyUp to update cursor pos
                                        onKeyDown={handleKeyDown}  // KeyDown for nav
                                        onFocus={(e) => handleFocus(3, 'motivation', e)}
                                        autoFocus
                                    />
                                    {focusedField === 'motivation' && (
                                        <BlinkingCursor
                                            style={{
                                                left: `calc(3rem + ${(cursorPosition.col - 1)} * 1ch)`, // 3rem accounts for pl-12 (which is 3rem)
                                                top: `calc(${(cursorPosition.line - 1)} * 24px + 2px)`
                                            }}
                                        />
                                    )}

                                    <span className="text-[#f1fa8c] absolute bottom-0 h-6 leading-6">`</span>
                                    <span className="text-[#f8f8f2] absolute bottom-0 left-3 h-6 leading-6">;</span>
                                </div>
                            </div>
                            {renderLine(<span className="text-[#f8f8f2] ml-1">{`}`}</span>)}
                        </div>
                        {renderError(error?.message)}
                    </div>
                )

            default:
                return null
        }
    }

    if (submitSuccess) {
        return (
            <TerminalWindow title="user@c3-cloud:~/deploy">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-mono"
                >
                    {/* Build Summary Header */}
                    <div className="border-b border-[#6272a4]/30 pb-4 mb-4">
                        <h2 className="text-[#50fa7b] text-xl font-bold flex items-center gap-2">
                            <span>✓</span> BUILD PASSED
                        </h2>
                        <div className="flex gap-6 mt-2 text-xs text-[#6272a4]">
                            <div className="flex flex-col">
                                <span className="uppercase tracking-wider opacity-70">Build ID</span>
                                <span className="text-[#f8f8f2]">{Math.random().toString(36).substring(7).toUpperCase()}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="uppercase tracking-wider opacity-70">Duration</span>
                                <span className="text-[#f8f8f2]">4.2s</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="uppercase tracking-wider opacity-70">Status</span>
                                <span className="text-[#50fa7b]">Production Ready</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="uppercase tracking-wider opacity-70">Branch</span>
                                <span className="text-[#bd93f9]">main</span>
                            </div>
                        </div>
                    </div>

                    {/* Build Logs */}
                    <div className="space-y-1 mb-6 font-mono text-sm max-h-[300px] overflow-y-auto">
                        {submissionLogs.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className={`${log.startsWith('remote:') ? 'text-[#8be9fd]' : 'text-[#f8f8f2]'}`}
                            >
                                <span className="text-[#6272a4] mr-3 select-none">
                                    {(i + 1).toString().padStart(2, '0')}
                                </span>
                                {log}
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-[#50fa7b] mt-4"
                        >
                            <span className="text-[#6272a4] mr-3 select-none">09</span>
                            Done in 4.20s.
                        </motion.div>
                    </div>

                    <div className="bg-[#44475a]/20 p-4 rounded border border-[#6272a4]/30">
                        <div className="text-[#f1fa8c] mb-2 text-xs uppercase tracking-wider">Payload Preview</div>
                        <div className="h-6 leading-6 text-sm"><span className="text-[#ff79c6]">const</span> <span className="text-[#8be9fd]">newMember</span> <span className="text-[#ff79c6]">=</span> <span className="text-[#f8f8f2]">{`{`}</span></div>
                        <div className="h-6 leading-6 pl-4 text-sm">name: <span className="text-[#f1fa8c]">'{getValues('fullName')}'</span>,</div>
                        <div className="h-6 leading-6 pl-4 text-sm">role: <span className="text-[#f1fa8c]">'Cadet'</span>,</div>
                        <div className="h-6 leading-6 pl-4 text-sm">dept: <span className="text-[#bd93f9]">Department.{getValues('department')}</span>,</div>
                        <div className="h-6 leading-6 pl-4 text-sm">year: <span className="text-[#f1fa8c]">{getValues('year')}</span></div>
                        <div className="h-6 leading-6 text-sm"><span className="text-[#f8f8f2]">{`}`}</span></div>
                    </div>
                </motion.div>
            </TerminalWindow>
        )
    }

    if (isSubmitting) {
        return (
            <TerminalWindow
                title="user@c3-cloud:~/deploy"
                cursorLine={submissionLogs.length + 1}
                cursorCol={1}
            >
                <div className="font-mono text-sm space-y-1">
                    {submissionLogs.map((log, i) => (
                        <div key={i} className={`${log.startsWith('remote:') ? 'text-[#8be9fd]' : 'text-[#f8f8f2]'}`}>
                            <span className="text-[#6272a4] mr-3 select-none">
                                {(i + 1).toString().padStart(2, '0')}
                            </span>
                            {log}
                        </div>
                    ))}
                    <div className="flex items-center">
                        <span className="text-[#6272a4] mr-3 select-none">
                            {(submissionLogs.length + 1).toString().padStart(2, '0')}
                        </span>
                        <span className="animate-pulse bg-[#f8f8f2] w-2 h-4 inline-block align-middle" />
                    </div>
                </div>
            </TerminalWindow>
        )
    }

    return (
        <TerminalWindow
            title="user@c3-cloud:~/join"
            cursorLine={cursorPosition.line}
            cursorCol={cursorPosition.col}
            activeLine={activeBaseLine !== null ? activeBaseLine + (cursorPosition.line - 1) : undefined}
            containerRef={containerRef}
        >
            <TerminalProgress currentStep={currentStep} steps={FORM_STEPS} />

            <div className="mb-6 font-mono border-l-4 border-[#bd93f9] pl-3 py-0 bg-[#44475a]/20">
                <div className="h-6 leading-6 text-[#bd93f9] text-sm font-bold">
                    {`// Step ${currentStep + 1}: ${currentStepConfig.title}`}
                </div>
                <div className="h-6 leading-6 text-[#6272a4] text-xs italic">{`/* ${currentStepConfig.description} */`}</div>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="relative overflow-hidden min-h-[168px]"> {/* 168 = 7 * 24px lines roughly */}
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentStep}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                        >
                            {currentStepConfig.fields.map(renderField)}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex justify-between mt-6 pt-0 border-t-0">
                    {/* Navigation buttons in their own row */}
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={isFirstStep}
                        className={`h-6 leading-6 px-4 font-mono text-sm ${isFirstStep ? 'invisible' : 'text-[#6272a4] hover:text-[#f8f8f2]'} transition-colors`}
                    >
                        {`<< prev`}
                    </button>

                    <button
                        type="button"
                        onClick={nextStep}
                        disabled={isSubmitting}
                        className={`h-6 leading-6 px-6 font-mono text-sm border rounded transition-all disabled:opacity-50 flex items-center gap-2
                            ${isSubmitting
                                ? 'bg-[#ffb86c]/20 text-[#ffb86c] border-[#ffb86c]/30 cursor-wait'
                                : 'bg-[#44475a]/50 hover:bg-[#bd93f9]/20 text-[#50fa7b] hover:text-[#bd93f9] border-[#50fa7b]/30 hover:border-[#bd93f9]/50'
                            }`}
                    >
                        {isSubmitting ? (
                            <span>
                                <span className="animate-spin inline-block mr-2">⟳</span>
                                processing...
                            </span>
                        ) : isLastStep ? (
                            <span className="flex items-center gap-2">
                                <GitBranch size={14} />
                                git push -u origin main
                            </span>
                        ) : (
                            'next();'
                        )}
                    </button>
                </div>
            </form>
        </TerminalWindow>
    )
}
