import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("meladDB");

    const totalOrders = await db.collection("orders").countDocuments();
    const totalManuscripts = await db.collection("manuscripts").countDocuments();
    const pendingOrders = await db.collection("orders").countDocuments({ status: "Processing" });

    const revenueAgg = await db.collection("orders").aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]).toArray();
    const revenue = revenueAgg[0]?.total || 0;

    return NextResponse.json({
      totalOrders,
      totalManuscripts,
      pendingOrders,
      revenue,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
