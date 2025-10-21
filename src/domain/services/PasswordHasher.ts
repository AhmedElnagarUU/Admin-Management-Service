// src/domain/services/PasswordHasher.ts
/**
 * PasswordHasher
 * -------------------
 * Domain-level contract for hashing and verifying passwords.
 * Implementation (e.g., bcrypt, argon2) will be in infrastructure layer.
 */
export interface PasswordHasher {
  /**
   * Hash a plain-text password
   */
  hash(password: string): Promise<string>;

  /**
   * Compare plain-text password with hashed password
   */
  compare(password: string, hashed: string): Promise<boolean>;
}
