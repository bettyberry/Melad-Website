import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import Manuscript from "@/models/Manuscript";

export async function GET() {
  await dbConnect();

  const totalOrders = await Order.countDocuments();
  const revenueAgg = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
  const revenue = revenueAgg[0]?.total || 0;

  const totalManuscripts = await Manuscript.countDocuments();
  const pendingOrders = await Order.countDocuments({ status: "Processing" });

  return NextResponse.json({ totalOrders, revenue, totalManuscripts, pendingOrders });
}
