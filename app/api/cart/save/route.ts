// app/api/cart/save/route.ts
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import CartItem from '@/models/CartItem';

type CartItemInput = {
  productId: string;
  name?: string;
  quantity: number; // The amount to add (e.g., 1)
  price?: number;
};

type SaveBody = {
  userId: string;
  product: CartItemInput;
};

export async function POST(request: Request) {
  await connectToDatabase();

  try {
    const { userId, product } = (await request.json()) as SaveBody;

    if (!userId || !product?.productId || typeof product.quantity !== 'number') {
      return NextResponse.json({ message: 'Invalid request data' }, { status: 400 });
    }

    // Use findOneAndUpdate with upsert: true and $inc for professional, atomic update/insert
    const result = await CartItem.findOneAndUpdate(
      { userId, productId: product.productId }, // Query: Find by userId and productId
      {
        $inc: { quantity: product.quantity }, // Operation: Increment quantity by the added amount
        $setOnInsert: { // Fields only set on a new insertion
          name: product.name,
          price: product.price,
        },
      },
      {
        upsert: true,         // If no document is found, create a new one
        new: true,            // Return the updated document
        runValidators: true,  // Run Mongoose validators
      }
    );

    return NextResponse.json({ 
      message: 'Cart item saved/updated successfully',
      item: result 
    }, { status: 200 });

  } catch (error) {
    console.error('Mongoose Error saving cart item:', error);
    return NextResponse.json({ message: 'Failed to save cart item' }, { status: 500 });
  }
}