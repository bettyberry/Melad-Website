// app/api/cart/get/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/get-server-session";
import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json([], { status: 200 });
    }

    await dbConnect();
    let cart = await Cart.findOne({ userId: session.user.id });
    
    if (!cart) {
      cart = await Cart.create({ userId: session.user.id, items: [] });
    }

    return NextResponse.json(cart.items, { status: 200 });
  } catch (error) {
    console.error("Cart fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}