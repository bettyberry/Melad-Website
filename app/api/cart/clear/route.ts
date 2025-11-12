// app/api/cart/clear/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Cart from '@/models/Cart'

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const userId = session.user.email
    await Cart.findOneAndUpdate({ userId }, { items: [] }, { upsert: true })

    return NextResponse.json({ success: true, message: 'Cart cleared' })

  } catch (error) {
    console.error('Cart clear error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}