import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const totalOrders = await db.collection("orders").countDocuments();
    const revenueData = await db.collection("orders").aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]).toArray();
    const revenue = revenueData[0]?.total || 0;
    const totalManuscripts = await db.collection("manuscripts").countDocuments();
    const pendingOrders = await db.collection("orders").countDocuments({ status: "Processing" });

    return NextResponse.json({ totalOrders, revenue, totalManuscripts, pendingOrders });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
