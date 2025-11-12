import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "@/lib/get-server-session";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Use existing connectDB helper (project convention)
    const mongoose = await connectDB();
    const db = (mongoose as any).connection.db;

    const totalOrders = await db.collection("orders").countDocuments();
    const revenueAgg = await db
      .collection("orders")
      .aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }])
      .toArray();
    const revenue = revenueAgg[0]?.total || 0;
    const totalManuscripts = await db.collection("manuscripts").countDocuments();
    const pendingOrders = await db.collection("orders").countDocuments({ status: "Processing" });

    return NextResponse.json({ totalOrders, revenue, totalManuscripts, pendingOrders });
  } catch (err) {
    console.error("/api/admin/stats error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
