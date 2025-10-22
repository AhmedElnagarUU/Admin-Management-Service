// File: src/infrastructure/persistence/UserTokenRepositoryImpl.ts
// ==============================================
// Purpose:
//   - Implements UserTokenRepository interface
//   - Handles database operations for user tokens
// ==============================================

import { UserTokenRepository } from '../../domain/repositories/UserTokenRepository';
import { UserToken } from '../../domain/entities/UserToken';
import { UUID } from '../../domain/value-objects/UUID';

export class UserTokenRepositoryImpl implements UserTokenRepository {
  private tokens: UserToken[] = [];

  async findByToken(token: string): Promise<UserToken | null> {
    return this.tokens.find(t => t.getTokenHash() === token) || null;
  }

  async save(token: UserToken): Promise<void> {
    this.tokens.push(token);
  }

  async update(token: UserToken): Promise<void> {
    const index = this.tokens.findIndex(t => t.getId().equals(token.getId()));
    if (index >= 0) this.tokens[index] = token;
  }

  async delete(id: UUID): Promise<void> {
    this.tokens = this.tokens.filter(t => !t.getId().equals(id));
  }
}
