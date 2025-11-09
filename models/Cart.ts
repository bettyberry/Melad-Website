import mongoose, { Schema, model, models, Document } from "mongoose"

interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
}

interface CartDocument extends Document {
  userId: string
  items: CartItem[]
}

const CartSchema = new Schema<CartDocument>({
  userId: { type: String, required: true },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
})

const Cart = models.Cart || model<CartDocument>("Cart", CartSchema)
export default Cart
export type { CartItem, CartDocument }
