// =====================================================
// File: src/infrastructure/database/mongoose/repositories/MongooseUserRepository.ts
// -----------------------------------------------------
// MongooseUserRepository
// - Implements UserRepository interface for MongoDB
// - Responsible for saving, finding, and updating users
// =====================================================

import { UserRepository } from '../../../../domain/repositories/UserRepository';
import { User } from '../../../../domain/entities/User';
import { UserModel } from '../models/UserModel';

export class MongooseUserRepository implements UserRepository {
  /**
   * Save a new user in MongoDB
   */
  async save(user: User): Promise<void> {
    const userData = {
      _id: user.getId().getValue(),
      email: user.getEmail().getValue(),
      password: user.getPassword().getValue(),
      status: user.getStatus(),
    };

    await UserModel.create(userData);
  }

  /**
   * Find a user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) return null;

    return User.fromPrimitives({
      id: userDoc._id.toString(),
      email: userDoc.email,
      password: userDoc.password,
      status: userDoc.status,
    });
  }

  /**
   * Find a user by ID
   */
  async findById(id: string): Promise<User | null> {
    const userDoc = await UserModel.findById(id);
    if (!userDoc) return null;

    return User.fromPrimitives({
      id: userDoc._id.toString(),
      email: userDoc.email,
      password: userDoc.password,
      status: userDoc.status,
    });
  }

  /**
   * Update user status (e.g., from PENDING → ACTIVE)
   */
  async updateStatus(id: string, status: string): Promise<void> {
    await UserModel.updateOne({ _id: id }, { status });
  }
}
