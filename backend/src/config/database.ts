import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://tech2c-mongodb:27017/tech2c');
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
};