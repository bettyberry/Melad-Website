// app/api/admin/stats/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const totalOrders = await db.collection("orders").countDocuments();
    const revenueAgg = await db.collection("orders").aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]).toArray();
    const revenue = revenueAgg[0]?.total || 0;

    const totalManuscripts = await db.collection("manuscripts").countDocuments();
    const pendingOrders = await db.collection("orders").countDocuments({ status: "Processing" });

    return NextResponse.json({
      totalOrders,
      revenue,
      totalManuscripts,
      pendingOrders,
    });
  } catch (error) {
    console.error("Error in /api/admin/stats:", error);
    return NextResponse.json({ error: "Failed to fetch admin stats" }, { status: 500 });
  }
}
