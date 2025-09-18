import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Manuscript from "@/models/Manuscript";

export async function GET() {
  await dbConnect();
  const categories = await Manuscript.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } }
  ]);
  return NextResponse.json(categories);
}
