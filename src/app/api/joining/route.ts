import { NextResponse } from 'next/server'
import { z } from 'zod'
import connectDB from '@/lib/mongodb'
import Candidate from '@/models/Candidate'


const candidateSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters'),
    email: z.string().email('Please enter a valid email address'),
    mobile: z
        .string()
        .min(10, 'Mobile number must be at least 10 digits')
        .regex(/^[\d+\-\s]+$/, 'Please enter a valid mobile number'),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const validatedData = candidateSchema.parse(body)

        await connectDB()


        const existingCandidate = await Candidate.findOne({
            email: validatedData.email,
        })

        if (existingCandidate) {
            return NextResponse.json({
                success: true,
                message: 'Welcome back! You are already registered.',
                data: {
                    name: existingCandidate.name,
                    email: existingCandidate.email,
                    mobile: existingCandidate.mobile,
                    isVerified: existingCandidate.isVerified,
                },
            })
        }

        const newCandidate = await Candidate.create({
            name: validatedData.name,
            email: validatedData.email,
            mobile: validatedData.mobile,
            isVerified: false,
        })

        return NextResponse.json(
            {
                success: true,
                message: 'Candidate registered successfully',
                data: {
                    name: newCandidate.name,
                    email: newCandidate.email,
                    mobile: newCandidate.mobile,
                    isVerified: newCandidate.isVerified,
                },
            },
            { status: 201 }
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Validation failed',
                    errors: error.issues.map((issue: z.ZodIssue) => ({
                        field: issue.path.join('.'),
                        message: issue.message,
                    })),
                },
                { status: 400 }
            )
        }

        if (
            error &&
            typeof error === 'object' &&
            'code' in error &&
            (error as { code: number }).code === 11000
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'A candidate with this email already exists.',
                },
                { status: 409 }
            )
        }

        console.error('Recruitment registration error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
