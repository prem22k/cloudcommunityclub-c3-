import mongoose from 'mongoose'

const MONGODB_URI =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/c3-recruitment'

if (!MONGODB_URI) {
    throw new Error('Please define a MONGODB_URI environment variable')
}


interface MongooseCache {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
}

declare global {
    // eslint-disable-next-line no-var
    var _mongooseCache: MongooseCache | undefined
}

const cached: MongooseCache = global._mongooseCache ?? {
    conn: null,
    promise: null,
}

if (!global._mongooseCache) {
    global._mongooseCache = cached
}

async function connectDB() {
    if (cached.conn) return cached.conn

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((m) => {
            console.log('✅ Connected to MongoDB')
            return m
        })
    }

    cached.conn = await cached.promise
    return cached.conn
}

export default connectDB
