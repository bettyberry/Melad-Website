import { NextRequest, NextResponse } from "next/server";

// Replace this with real DB/email logic
const saveContact = async (data: any) => {
  console.log("Contact form submitted:", data);
  // TODO: save to DB or send email
  return true;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body.email || !body.message || !body.inquiryType) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await saveContact(body);

    return NextResponse.json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
