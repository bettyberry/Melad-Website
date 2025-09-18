// app/api/cart/get/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Cart from '@/models/Cart'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    // Get user's cart
    const cart = await Cart.findOne({ userId: session.user.id })
      .populate('items.productId', 'name price images stock')
    
    // If no cart exists, create an empty one
    if (!cart) {
      const newCart = new Cart({
        userId: session.user.id,
        items: []
      })
      await newCart.save()
      return NextResponse.json([])
    }

    // Format the cart items
    const formattedItems = cart.items.map(item => ({
      id: item._id.toString(),
      productId: item.productId._id.toString(),
      title: item.name,
      price: item.price,
      image: item.image || (item.productId.images && item.productId.images[0]) || '/placeholder.svg',
      quantity: item.quantity,
      stock: item.productId.stock
    }))

    return NextResponse.json(formattedItems)
  } catch (error) {
    console.error('Cart get error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}