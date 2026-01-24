
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
    year: z.string(),
    motivation: z.string().min(20).max(500),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validate the data
        const validatedData = joinClubSchema.parse(body)

        // Map to Backend Payload
        const backendPayload = {
            name: validatedData.fullName,
            email: validatedData.email,
            mobile: validatedData.phone,
            rollNumber: validatedData.rollNumber,
            department: validatedData.department,
            year: validatedData.year,
            interests: ["Cloud Computing"], // Default interest
            experience: validatedData.motivation, // Mapping motivation to experience
            expectations: "Join C3",
            referral: "Website"
        }

        try {
            const backendResponse = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(backendPayload)
            })

            const backendData = await backendResponse.json()

            if (!backendResponse.ok) {
                return NextResponse.json(
                    { success: false, message: backendData.error || 'Backend registration failed' },
                    { status: backendResponse.status }
                )
            }

            return NextResponse.json({ success: true, message: 'Registration successful', data: backendData })

        } catch (fetchError) {
            console.error('Backend connection error:', fetchError)
            return NextResponse.json(
                { success: false, message: 'Could not connect to registration server. Please try again later.' },
                { status: 503 }
            )
        }

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
