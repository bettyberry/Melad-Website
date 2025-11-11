// scripts/test-cart.js
const { connectDB } = require('../lib/mongodb');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

async function testCart() {
  try {
    await connectDB();
    
    // Check if products exist
    const products = await Product.find({});
    console.log('📦 Products in database:', products.length);
    products.forEach(p => console.log(`   - ${p.name} (${p._id})`));
    
    // Check carts
    const carts = await Cart.find({}).populate('items.productId');
    console.log('🛒 Carts in database:', carts.length);
    carts.forEach(cart => {
      console.log(`   - User: ${cart.userId}, Items: ${cart.items.length}`);
      cart.items.forEach(item => {
        console.log(`     * ${item.name} (Qty: ${item.quantity})`);
      });
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

testCart();