import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET /api/cart - fetch current user's cart
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const cart = await Cart.findOne({ userEmail: session.user.email });
    return NextResponse.json(cart || { items: [] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

// POST /api/cart - update cart
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { items } = body;

    await dbConnect();

    const cart = await Cart.findOneAndUpdate(
      { userEmail: session.user.email },
      { items },
      { new: true, upsert: true }
    );

    return NextResponse.json(cart);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}
