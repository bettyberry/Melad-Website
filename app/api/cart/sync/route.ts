import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Cart from '@/models/Cart'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { items } = await req.json()
    
    await connectDB()

    // Find or create user's cart
    let cart = await Cart.findOne({ userId: session.user.email })
    
    if (!cart) {
      cart = new Cart({
        userId: session.user.email,
        items: []
      })
    }

    // Update cart items
    cart.items = items.map((item: any) => ({
      productId: item.productId,
      quantity: item.quantity,
      name: item.title,
      price: item.price,
      image: item.image
    }))

    await cart.save()

    return NextResponse.json({ 
      success: true,
      message: 'Cart synced successfully'
    })
  } catch (error) {
    console.error('Cart sync error:', error)
    return NextResponse.json(
      { error: 'Failed to sync cart' },
      { status: 500 }
    )
  }
}