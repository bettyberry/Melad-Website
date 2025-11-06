import mongoose from 'mongoose'

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1
  },
  name: String,
  price: Number,
  image: String
})

const CartSchema = new mongoose.Schema({
  userEmail: {  // Changed from userId to userEmail to match your route
    type: String,
    required: true,
    unique: true
  },
  items: [CartItemSchema]
}, {
  timestamps: true
})

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema)