// ============================================================
// src/application/use-cases/user/CreateUserToken.ts
// ============================================================
// Use Case: CreateUserToken
//
// Purpose:
// Handles generating a token for a user for purposes like:
// - Email verification
// - Password reset
//
// Responsibilities:
// 1. Validate that the user exists
// 2. Generate a secure token (random string for now)
// 3. Set token expiry
// 4. Persist the token in the repository
// 5. Return the created UserToken entity
// ============================================================

import { UserTokenRepository } from '../../../domain/repositories/UserTokenRepository';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UUID } from '../../../domain/value-objects/UUID';
import { UserToken, UserTokenType } from '../../../domain/entities/UserToken';
import { DomainException } from '../../../domain/common/DomainException';

/**
 * Input request for creating a user token
 */
interface CreateUserTokenRequest {
  userId: string;             // User ID as raw string (will be converted to UUID)
  type: UserTokenType;        // Token type: EMAIL_VERIFICATION | PASSWORD_RESET
  expiresInMinutes?: number;  // Optional expiration time in minutes, default 60
}

/**
 * Use case class
 * This encapsulates all logic for creating a user token.
 */
export class CreateUserToken {
  constructor(
    private userRepo: UserRepository,         // User repository interface
    private tokenRepo: UserTokenRepository    // Token repository interface
  ) {}

  /**
   * Executes the use case
   * @param request CreateUserTokenRequest
   * @returns UserToken entity
   */
  public async execute(request: CreateUserTokenRequest): Promise<UserToken> {
    // -------------------------------
    // Step 1: Convert userId to UUID
    // -------------------------------
    const userIdVO = UUID.create(() => request.userId);

    // -------------------------------
    // Step 2: Check if user exists
    // -------------------------------
    const user = await this.userRepo.findById(userIdVO);
    if (!user) {
      throw new DomainException('User not found', 'USER_NOT_FOUND');
    }

    // -------------------------------
    // Step 3: Generate a random token
    // -------------------------------
    // For demo purposes, using a simple random string.
    // In production, you may want to hash it or use a secure generator.
    const token = Math.random().toString(36).substring(2, 15) +
                  Math.random().toString(36).substring(2, 15);

    // -------------------------------
    // Step 4: Set expiration date
    // -------------------------------
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + (request.expiresInMinutes ?? 60));

    // -------------------------------
    // Step 5: Create UserToken entity
    // -------------------------------
    const userToken = new UserToken({
      userId: user.getId(),
      tokenHash: token,
      type: request.type,
      expiresAt,
    });

    // -------------------------------
    // Step 6: Persist the token
    // -------------------------------
    await this.tokenRepo.save(userToken);

    // -------------------------------
    // Step 7: Return the created token
    // -------------------------------
    return userToken;
  }
}
