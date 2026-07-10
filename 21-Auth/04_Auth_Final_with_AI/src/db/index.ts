import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;

try {
  await mongoose.connect(MONGO_URI);
  console.log('\x1b[33m✔️  connected to MongoDB\x1b[0m');
} catch (error) {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
}
