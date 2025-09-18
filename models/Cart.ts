import mongoose, { Schema, model, models } from "mongoose"

const CartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId, // Or String if you store string IDs from NextAuth
      ref: "User",
      required: true,
    },
    items: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  { timestamps: true }
)

const Cart = models.Cart || model("Cart", CartSchema)

export default Cart
