// src/domain/repositories/UserRepository.ts
import { User } from '../entities/User';
import { UUID } from '../value-objects/UUID';

/**
 * UserRepository
 * -------------------
 * Defines the contract for user persistence.
 * The infrastructure layer (DB, ORM, etc.) will implement this.
 */
export interface UserRepository {
  /**
   * Find a user by their unique ID
   */
  findById(id: UUID): Promise<User | null>;

  /**
   * Find a user by their email
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Save a new user (insert)
   */
  save(user: User): Promise<void>;

  /**
   * Update an existing user
   */
  update(user: User): Promise<void>;

  /**
   * Delete a user by ID
   */
  delete(id: UUID): Promise<void>;

  /**
   * List all users (with optional filters)
   */
  list(filter?: Partial<{ email: string; status: string }>): Promise<User[]>;
}
