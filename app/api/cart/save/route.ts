import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Cart from "@/models/Cart";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { items } = await req.json();
  await connectDB();

  await Cart.findOneAndUpdate(
    { userEmail: session.user.email },
    { items },
    { upsert: true, new: true }
  );

  return NextResponse.json({ success: true });
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ items: [] }, { status: 401 });
  }

  await connectDB();

  const cart = await Cart.findOne({ userEmail: session.user.email });
  return NextResponse.json({ items: cart?.items || [] });
}
