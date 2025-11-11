import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import Cart from "@/models/Cart"
import mongoose from "mongoose"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    
    // Get user's cart
    const userCart = await Cart.findOne({ userId: session.user.email })

    // Get all carts for debugging
    const allCarts = await Cart.find({})

    // Get cart counts and stats
    const cartStats = {
      totalCarts: await Cart.countDocuments(),
      cartsWithItems: await Cart.countDocuments({ 'items.0': { $exists: true } }),
      totalItemsAcrossAllCarts: allCarts.reduce((sum, cart) => sum + cart.items.length, 0)
    }

    // Get MongoDB connection info
    const mongoConnection = mongoose.connection
    const dbInfo = {
      host: mongoConnection.host,
      port: mongoConnection.port,
      name: mongoConnection.name,
      readyState: mongoConnection.readyState,
      readyStateText: getReadyStateText(mongoConnection.readyState)
    }

    return NextResponse.json({ 
      user: {
        email: session.user.email,
        name: session.user.name
      },
      userCart: userCart ? {
        _id: userCart._id,
        userId: userCart.userId,
        items: userCart.items,
        itemsCount: userCart.items.length,
        createdAt: userCart.createdAt,
        updatedAt: userCart.updatedAt
      } : null,
      allCarts: allCarts.map(cart => ({
        _id: cart._id,
        userId: cart.userId,
        itemsCount: cart.items.length,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
        sampleItems: cart.items.slice(0, 2) // Show first 2 items as sample
      })),
      stats: cartStats,
      databaseInfo: {
        connected: mongoConnection.readyState === 1,
        connection: dbInfo,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error("❌ Debug error:", error)
    return NextResponse.json(
      { 
        error: "Debug failed", 
        details: error instanceof Error ? error.message : "Unknown error",
        databaseConnected: false,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// Helper function to get connection state text
function getReadyStateText(readyState: number): string {
  switch (readyState) {
    case 0: return 'disconnected'
    case 1: return 'connected'
    case 2: return 'connecting'
    case 3: return 'disconnecting'
    default: return 'unknown'
  }
}