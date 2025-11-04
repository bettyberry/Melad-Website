import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/contact';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    await connectDB(); 

    const contact = await Contact.create({ name, email, message });

    return NextResponse.json({
      message: 'Message sent successfully!',
      id: contact._id,
    });
  } catch (err) {
    console.error('❌ Error saving contact:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
