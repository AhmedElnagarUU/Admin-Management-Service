// =============================================================
// File: src/infrastructure/database/mongoose/repositories/MongooseUserTokenRepository.ts
// -------------------------------------------------------------
// MongooseUserTokenRepository
// - Handles creation and retrieval of user verification tokens
// - Implements UserTokenRepository interface using MongoDB
// =============================================================

import { UserTokenRepository } from '../../../../domain/repositories/UserTokenRepository';
import { UserToken } from '../../../../domain/entities/UserToken';
import { UserTokenModel } from '../models/UserTokenModel';

export class MongooseUserTokenRepository implements UserTokenRepository {
  /**
   * Save a new token to verify user email
   */
  async save(token: UserToken): Promise<void> {
    const tokenData = {
      token: token.getToken(),
      userId: token.getUserId().getValue(),
      expiresAt: token.getExpiresAt(),
    };

    await UserTokenModel.create(tokenData);
  }

  /**
   * Find token record by token string
   */
  async findByToken(token: string): Promise<UserToken | null> {
    const tokenDoc = await UserTokenModel.findOne({ token });
    if (!tokenDoc) return null;

    return UserToken.fromPrimitives({
      token: tokenDoc.token,
      userId: tokenDoc.userId.toString(),
      expiresAt: tokenDoc.expiresAt,
    });
  }

  /**
   * Delete a token (after successful verification)
   */
  async delete(token: string): Promise<void> {
    await UserTokenModel.deleteOne({ token });
  }
}
