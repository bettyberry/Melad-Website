// models/User.ts
import { connectToDatabase } from '../lib/mongodb'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'

export interface User {
  _id?: ObjectId
  name: string
  email: string
  password: string
  role: 'user' | 'admin' | 'moderator'
  image?: string
  createdAt: Date
  updatedAt: Date
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const { db } = await connectToDatabase()
  return await db.collection<User>('users').findOne({ email: email.toLowerCase() })
}

export async function findUserById(id: string): Promise<User | null> {
  const { db } = await connectToDatabase()
  return await db.collection<User>('users').findOne({ _id: new ObjectId(id) })
}

export async function createUser(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  const { db } = await connectToDatabase()
  
  const user: User = {
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const result = await db.collection<User>('users').insertOne(user)
  user._id = result.insertedId
  return user
}

export async function validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

// Initialize admin user if doesn't exist
export async function initializeAdminUser() {
  const { db } = await connectToDatabase()
  
  const adminExists = await db.collection('users').findOne({ role: 'admin' })
  
  if (!adminExists && process.env.SUPER_ADMIN_EMAIL && process.env.SUPER_ADMIN_PASSWORD) {
    const hashedPassword = await hashPassword(process.env.SUPER_ADMIN_PASSWORD)
    
    await db.collection('users').insertOne({
      name: 'System Administrator',
      email: process.env.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    
    console.log('✅ Admin user created:', process.env.SUPER_ADMIN_EMAIL)
  }
}