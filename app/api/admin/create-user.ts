// pages/api/admin/create-user.ts
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../lib/auth"
import { createUser, findUserByEmail, hashPassword } from "../../../models/User"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  
  // Only allow admins to create users
  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, password, role = 'user' } = req.body

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    // Validate role
    if (!['user', 'admin', 'moderator'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' })
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists with this email' })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user with specified role
    const user = await createUser({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role
    })

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    res.status(201).json(userWithoutPassword)

  } catch (error) {
    console.error('Create user error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}