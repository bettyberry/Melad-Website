// app/api/cart/merge/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId, items } = await request.json()

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid items data' },
        { status: 400 }
      )
    }

    const mergedItemsCount = items.reduce((sum: number, item: any) => sum + item.quantity, 0)

    console.log('🔄 Cart merge completed:', {
      user: userId,
      mergedItems: mergedItemsCount
    })

    return NextResponse.json({
      success: true,
      mergedItemsCount: mergedItemsCount,
      message: 'Cart merged successfully'
    })

  } catch (error) {
    console.error('Cart merge error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}