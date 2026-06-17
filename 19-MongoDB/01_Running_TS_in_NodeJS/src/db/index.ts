import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;

try {
  const con = await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');
  console.log(`📂 Using DB: ${con.connection.name}`);
} catch (error) {
  console.error('❌ MongoDB connection error', error);
  process.exit(1);
}
