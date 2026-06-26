import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;

try {
  await mongoose.connect(MONGO_URI);
  console.log('✅ connected to MongoDB');
} catch (error) {
  console.error('❌ MongoDB Connection error:', error);
  process.exit(1);
}
