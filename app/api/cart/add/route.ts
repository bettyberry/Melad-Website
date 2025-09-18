// app/api/cart/add/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Cart from '@/models/Cart'
import Product from '@/models/Product'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { productId, quantity = 1 } = await req.json()
    
    await connectDB()

    // Get product details
    const product = await Product.findById(productId)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Find user's cart
    let cart = await Cart.findOne({ userId: session.user.id })
    
    // If cart doesn't exist, create one
    if (!cart) {
      cart = new Cart({
        userId: session.user.id,
        items: []
      })
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    )

    if (existingItemIndex > -1) {
      // Update quantity if product exists
      cart.items[existingItemIndex].quantity += quantity
    } else {
      // Add new item to cart
      cart.items.push({
        productId,
        quantity,
        name: product.name,
        price: product.price,
        image: product.images && product.images[0]
      })
    }

    await cart.save()

    return NextResponse.json({ message: 'Product added to cart' })
  } catch (error) {
    console.error('Cart add error:', error)
    return NextResponse.json(
      { error: 'Failed to add product to cart' },
      { status: 500 }
    )
  }
}