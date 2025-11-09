import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("meladDB");
    const manuscripts = await db.collection("manuscripts").find().toArray();
    return NextResponse.json(manuscripts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch manuscripts" }, { status: 500 });
  }
}
