import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import Cart from "@/models/Cart"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    const status: any = {
      user: session?.user ? {
        email: session.user.email,
        name: session.user.name
      } : null,
      localStorage: {
        cartItems: [],
        mergeFlag: null
      },
      database: {
        connected: false,
        userCart: null
      },
      timestamp: new Date().toISOString()
    }

    // Safely access localStorage (only on client side, but this is server-side)
    // For server-side, we can't access localStorage directly
    status.localStorage.cartItems = "Not available on server"
    status.localStorage.mergeFlag = "Not available on server"

    if (session?.user?.email) {
      try {
        await connectDB()
        status.database.connected = true
        
        const cart = await Cart.findOne({ userId: session.user.email })
        if (cart) {
          status.database.userCart = {
            itemsCount: cart.items.length,
            items: cart.items
          }
        }
      } catch (dbError) {
        status.database.connected = false
        status.database.error = dbError instanceof Error ? dbError.message : "Unknown database error"
      }
    }

    return NextResponse.json(status)
  } catch (error) {
    console.error("Status check error:", error)
    return NextResponse.json({
      error: "Status check failed",
      details: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}