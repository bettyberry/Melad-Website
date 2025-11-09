import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Cart from "@/models/Cart"

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId")
  if (!userId) return NextResponse.json({ items: [] })

  await dbConnect()
  const cart = await Cart.findOne({ userId })
  return NextResponse.json({ items: cart?.items || [] })
}
