// app/api/cart/remove/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Cart from '@/models/Cart'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { productId } = await req.json()
    
    await connectDB()

    // Remove item from cart
    const cart = await Cart.findOneAndUpdate(
      { userId: session.user.id },
      { $pull: { items: { productId } } },
      { new: true }
    )

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Product removed from cart' })
  } catch (error) {
    console.error('Cart remove error:', error)
    return NextResponse.json(
      { error: 'Failed to remove product from cart' },
      { status: 500 }
    )
  }
}