// app/api/cart/clear/route.ts
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

    await dbConnect();
    await Cart.findOneAndUpdate(
      { userId: session.user.id },
      { items: [] }
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Cart clear error:", error);
    return NextResponse.json(
      { error: "Failed to clear cart" },
      { status: 500 }
    );
  }
}