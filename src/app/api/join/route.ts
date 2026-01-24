
import { NextResponse } from 'next/server'
import { z } from 'zod'

// Define the schema here or import it if shared
// For now, redefining briefly or importing would be ideal.
// To keep it simple and self-contained for this API route, let's redefine the validation shape
// that matches the frontend to ensure backend validation independent of frontend.

const joinClubSchema = z.object({
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
    department: z.string(), // accepting string for enum
    motivation: z.string().min(20).max(500),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validate the data
        const validatedData = joinClubSchema.parse(body)

        // LOG TO SERVER CONSOLE (The "Database")
        console.log('\n----------------------------------------')
        console.log('🚀 NEW MEMBER REGISTRATION RECEIVED')
        console.log('----------------------------------------')
        console.log(`Name:       ${validatedData.fullName}`)
        console.log(`Roll No:    ${validatedData.rollNumber}`)
        console.log(`Email:      ${validatedData.email}`)
        console.log(`Phone:      ${validatedData.phone}`)
        console.log(`Dept:       ${validatedData.department}`)
        console.log(`Motivation: ${validatedData.motivation.substring(0, 50)}...`)
        console.log('----------------------------------------\n')

        // Simulate a small delay to make it feel "real" if the network is too fast locally
        // await new Promise(resolve => setTimeout(resolve, 500))

        return NextResponse.json({ success: true, message: 'Registration successful' })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: (error as any).errors },
                { status: 400 }
            )
        }

        console.error('Registration error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
