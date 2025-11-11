import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" });
    }

    await connectDB();

    // Get cart without any transformation
    const cart = await Cart.findOne({ userId: session.user.email });
    
    console.log('🔍 DEBUG - Raw cart from DB:', JSON.stringify(cart, null, 2));
    
    if (!cart) {
      return NextResponse.json({ 
        message: "No cart found",
        userId: session.user.email,
        itemsCount: 0
      });
    }

    return NextResponse.json({
      message: "Cart found",
      userId: session.user.email,
      itemsCount: cart.items.length,
      rawItems: cart.items,
      cart: {
        _id: cart._id,
        userId: cart.userId,
        items: cart.items.map((item: any) => ({
          _id: item._id,
          productId: item.productId?.toString?.(),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        }))
      }
    });

  } catch (error: any) {
    console.error("Debug API error:", error);
    return NextResponse.json({ error: error.message });
  }
}