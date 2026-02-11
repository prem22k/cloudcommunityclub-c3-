import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICandidate extends Document {
    name: string
    email: string
    mobile: string
    isVerified: boolean
    createdAt: Date
    updatedAt: Date
}

const CandidateSchema = new Schema<ICandidate>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: 2,
            maxlength: 100,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            unique: true,
        },
        mobile: {
            type: String,
            required: [true, 'Mobile number is required'],
            trim: true,
            minlength: 10,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

const Candidate: Model<ICandidate> =
    mongoose.models.Candidate ||
    mongoose.model<ICandidate>('Candidate', CandidateSchema)

export default Candidate
