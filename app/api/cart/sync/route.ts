import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import connectDB from '@/lib/mongodb'
import Cart from '@/models/Cart'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const session = await getServerSession()
    const { items } = await req.json()

    if (!session?.user?.email) {
      return NextResponse.json({ success: true })
    }

    await Cart.findOneAndUpdate(
      { userId: session.user.email },
      { 
        $set: { 
          items: items,
          updatedAt: new Date()
        } 
      },
      { upsert: true, new: true }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to sync cart:', error)
    return NextResponse.json(
      { error: 'Failed to sync cart' },
      { status: 500 }
    )
  }
}