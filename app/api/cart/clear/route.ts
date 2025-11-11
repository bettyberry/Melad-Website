// app/api/cart/clear/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Here you would clear the user's cart in your database
    console.log('🗑️ Clearing cart for user:', session.user.email)

    return NextResponse.json({
      success: true,
      message: 'Cart cleared successfully'
    })

  } catch (error) {
    console.error('Cart clear error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}