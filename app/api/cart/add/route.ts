// app/api/cart/add/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const item = await request.json()

    // Validate the item
    if (!item.productId || !item.name || !item.price) {
      return NextResponse.json(
        { error: 'Invalid item data' },
        { status: 400 }
      )
    }

    // Here you would add the item to the user's cart in your database
    // For now, just return success
    console.log('🛒 Adding item to cart:', {
      user: session.user.email,
      item: item
    })

    return NextResponse.json({
      success: true,
      message: 'Item added to cart',
      item: item
    })

  } catch (error) {
    console.error('Cart add error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}