import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("melad");
    const collection = db.collection("newsletter");

    // Optional: Prevent duplicate subscriptions
    const existing = await collection.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "This email is already subscribed." },
        { status: 409 }
      );
    }

    await collection.insertOne({
      email,
      subscribedAt: new Date(),
    });

    return NextResponse.json(
      { message: "Subscribed successfully!" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }}