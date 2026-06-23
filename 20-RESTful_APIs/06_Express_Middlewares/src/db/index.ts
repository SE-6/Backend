import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;

try {
  const connection = await mongoose.connect(MONGO_URI);
  console.log('✅ connected to MongoDB');
  console.log(`📂 using database: ${connection.connection.name}`);
} catch (error) {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
}
