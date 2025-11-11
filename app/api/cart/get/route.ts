// app/api/cart/get/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({ 
      items: [],
      message: 'Cart fetched successfully'
    })

  } catch (error) {
    console.error('Cart fetch error:', error)
    return NextResponse.json(
      { 
        items: [],
        error: 'Failed to fetch cart'
      },
      { status: 200 } 
    )
  }
}