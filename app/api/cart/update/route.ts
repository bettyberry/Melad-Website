import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity } = await req.json();

    if (!productId || quantity === undefined) {
      return NextResponse.json(
        { error: "Product ID and quantity are required" },
        { status: 400 }
      );
    }

    await connectDB();

    let cart = await Cart.findOne({ userId: session.user.email });

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = new Cart({
        userId: session.user.email,
        items: [],
      });
    }

    // Find the item in cart
    const itemIndex = cart.items.findIndex(
      (item: any) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
      
      // Remove item if quantity is 0
      if (quantity === 0) {
        cart.items.splice(itemIndex, 1);
      }
    }

    await cart.save();

    return NextResponse.json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error: any) {
    console.error("Cart update error:", error);
    return NextResponse.json(
      { error: "Failed to update cart", details: error.message },
      { status: 500 }
    );
  }
}