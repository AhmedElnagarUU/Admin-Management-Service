// ==============================================
// File: src/infrastructure/database/models/UserTokenModel.ts
// ----------------------------------------------
// UserToken Schema for MongoDB using Mongoose
// Used for email verification & password reset
// ==============================================

import mongoose, { Schema, Document } from 'mongoose';

export interface IUserTokenDocument extends Document {
  id: string;
  userId: string;
  tokenHash: string;
  type: string;
  createdAt: Date;
  expiresAt: Date;
  usedAt?: Date;
}

const UserTokenSchema = new Schema<IUserTokenDocument>({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  tokenHash: { type: String, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
  usedAt: { type: Date },
});

export const UserTokenModel = mongoose.model<IUserTokenDocument>(
  'UserToken',
  UserTokenSchema
);
