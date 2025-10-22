// ==============================================
// File: src/infrastructure/database/mongoose.ts
// ----------------------------------------------
// MongoDB Connection (Mongoose)
// Handles initialization and connection logic
// ==============================================

import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/clean_auth';

  try {
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
};
