// ==============================================
// File: src/infrastructure/database/models/UserModel.ts
// ----------------------------------------------
// User Schema for MongoDB using Mongoose
// Mirrors the domain User entity
// ==============================================

import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDocument extends Document {
  id: string;
  email: string;
  password: string;
  status: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
  emailVerifiedAt?: Date;
}

const UserSchema = new Schema<IUserDocument>({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, required: true },
  roles: [{ type: String }],
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  emailVerifiedAt: { type: Date },
});

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
