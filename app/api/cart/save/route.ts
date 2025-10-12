// app/api/cart/save/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/get-server-session";
import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { items } = await req.json();
    await dbConnect();

    // Update or create cart
    await Cart.findOneAndUpdate(
      { userId: session.user.id },
      { items, userId: session.user.id },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Cart save error:", error);
    return NextResponse.json(
      { error: "Failed to save cart" },
      { status: 500 }
    );
  }
}