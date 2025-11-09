import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage for demo - replace with your database
let cartStorage: Record<string, { items: any[] }> = {}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID required' }, { status: 400 })
  }

  // Return user's cart or empty cart if not found
  const userCart = cartStorage[userId] || { items: [] }
  return NextResponse.json(userCart)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, items } = body

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Save or update user's cart
    cartStorage[userId] = { items: items || [] }

    return NextResponse.json({ success: true, items: items || [] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save cart' }, { status: 500 })
  }
}