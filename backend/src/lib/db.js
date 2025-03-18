import mongoose from 'mongoose';

export const connectDb = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error('MONGODB_URI is undefined. Check your .env file!');
    process.exit(1);
  }

  try {
    const connect = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
};
