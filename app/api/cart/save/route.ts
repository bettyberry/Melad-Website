// app/api/cart/save/route.ts
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

    const { items } = await req.json()
    
    await connectDB()

    // Update or create cart for user
    const cart = await Cart.findOneAndUpdate(
      { userId: session.user.id },
      { 
        userId: session.user.id,
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          name: item.title,
          price: item.price,
          image: item.image
        }))
      },
      { upsert: true, new: true }
    )

    return NextResponse.json({ message: 'Cart saved successfully' })
  } catch (error) {
    console.error('Cart save error:', error)
    return NextResponse.json(
      { error: 'Failed to save cart' },
      { status: 500 }
    )
  }
}