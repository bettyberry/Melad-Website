import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import CartItem from '@/models/CartItem';

type CartItemInput = {
  productId: string;
  name?: string;
  quantity: number;
  price?: number;
};

type MergeBody = {
  userId: string;
  items: CartItemInput[]; // The items from localStorage
};

export async function POST(request: Request) {
  await connectToDatabase();

  try {
    const { userId, items: localCartItems } = (await request.json()) as MergeBody;

    if (!userId || !Array.isArray(localCartItems)) {
      return NextResponse.json({ message: 'Invalid request data' }, { status: 400 });
    }

    // Prepare all merge operations
    const operations = localCartItems.map(localItem => {
      // Find the existing item or create a new one
      return CartItem.findOneAndUpdate(
        { userId, productId: localItem.productId },
        {
          $inc: { quantity: localItem.quantity },
          $setOnInsert: {
            name: localItem.name,
            price: localItem.price,
          },
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
        }
      );
    });

    await Promise.all(operations);

    return NextResponse.json({ message: 'Cart merged successfully' }, { status: 200 });

  } catch (error) {
    console.error('Mongoose Error merging cart:', error);
    return NextResponse.json({ message: 'Failed to merge cart' }, { status: 500 });
  }
}