import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const manuscripts = await db.collection("manuscripts").find().sort({ date: -1 }).toArray();
    return NextResponse.json(manuscripts);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch manuscripts" }, { status: 500 });
  }
}
