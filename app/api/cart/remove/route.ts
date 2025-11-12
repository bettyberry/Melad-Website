// app/api/cart/remove/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Cart from '@/models/Cart'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { productId } = await request.json()

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    await connectDB()
    const userId = session.user.email
    const cart = await Cart.findOne({ userId })
    if (cart) {
      cart.items = cart.items.filter((i: any) => i.productId !== productId)
      await cart.save()
    }

    return NextResponse.json({
      success: true,
      message: 'Item removed from cart',
      items: cart ? cart.items : []
    })

  } catch (error) {
    console.error('Cart remove error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}