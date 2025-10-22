// File: src/infrastructure/persistence/UserRepositoryImpl.ts
// ==============================================
// Purpose:
//   - Implements UserRepository interface
//   - Handles real database operations for users
// ==============================================

import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { UUID } from '../../domain/value-objects/UUID';

export class UserRepositoryImpl implements UserRepository {
  private users: User[] = []; // Example in-memory storage

  async findById(id: UUID): Promise<User | null> {
    return this.users.find(u => u.getId().equals(id)) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.getEmail().getValue() === email) || null;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex(u => u.getId().equals(user.getId()));
    if (index >= 0) this.users[index] = user;
  }

  async delete(id: UUID): Promise<void> {
    this.users = this.users.filter(u => !u.getId().equals(id));
  }

  async list(filter?: Partial<{ email: string; status: string }>): Promise<User[]> {
    let result = [...this.users];
    if (filter?.email) result = result.filter(u => u.getEmail().getValue() === filter.email);
    if (filter?.status) result = result.filter(u => u.getStatus() === filter.status);
    return result;
  }
}
