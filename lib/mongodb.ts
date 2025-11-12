import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // Prevent Mongoose from creating indexes automatically at runtime.
    // In development this can cause race conditions / duplicate-key errors
    // if existing documents contain duplicate/NULL values for unique fields.
    mongoose.set('autoIndex', false)

    const opts = {
      bufferCommands: false,
      // useNewUrlParser and useUnifiedTopology are defaults in newer mongoose, but explicit is fine
      useNewUrlParser: true as any,
      useUnifiedTopology: true as any,
      autoIndex: false as any,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connected')
      return mongoose;
    }).catch((err) => {
      console.error('MongoDB connection error:', err)
      throw err
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;