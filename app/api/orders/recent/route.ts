import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET() {
  await dbConnect();
  const orders = await Order.find().sort({ date: -1 }).limit(5);
  return NextResponse.json(orders);
}
