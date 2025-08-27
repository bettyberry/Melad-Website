import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    // Parse JSON body
    const body = await request.json();

    // Validate input (adjust fields to your form)
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    //  Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("melad");
    const collection = db.collection("contacts");

    //  Insert document
    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(), 
    });

    return NextResponse.json(
      { message: "Contact saved!", id: result.insertedId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error saving contact:", error);

    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
