const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();