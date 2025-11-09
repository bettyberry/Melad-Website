// /models/CartItem.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the document structure in TypeScript
export interface ICartItem extends Document {
  userId: string;
  productId: string;
  name?: string;
  price?: number;
  quantity: number;
}

// Define the schema
const CartItemSchema: Schema = new Schema({
  userId: { 
    type: String, 
    required: true, 
    index: true 
  },
  productId: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: false 
  },
  price: { 
    type: Number, 
    required: false 
  },
  quantity: { 
    type: Number, 
    required: true, 
    default: 1 
  },
}, {
  timestamps: true,
});

// Important: Create a compound unique index to ensure a user only has one of each product
CartItemSchema.index({ userId: 1, productId: 1 }, { unique: true });

// Use existing model if it exists, otherwise create a new one
const CartItem: Model<ICartItem> = (mongoose.models.CartItem || mongoose.model<ICartItem>('CartItem', CartItemSchema)) as Model<ICartItem>;

export default CartItem;