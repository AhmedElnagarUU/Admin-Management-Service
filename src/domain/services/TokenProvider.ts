// src/domain/services/TokenProvider.ts
/**
 * TokenProvider
 * -------------------
 * Domain-level contract for generating and verifying tokens.
 * Can be used for email verification, password reset, JWT, or any random tokens.
 */
export interface TokenProvider {
  /**
   * Generate a secure random token
   */
  generate(length?: number): Promise<string>;

  /**
   * Hash a token for storage
   */
  hash(token: string): Promise<string>;

  /**
   * Compare a plain token with its hashed version
   */
  compare(token: string, hashed: string): Promise<boolean>;
}
