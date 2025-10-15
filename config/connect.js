import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.MONGO_URI 

const connectDB = async () => {
  try {
    await mongoose.connect(PORT);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;


