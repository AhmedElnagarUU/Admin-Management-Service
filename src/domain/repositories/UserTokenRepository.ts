// src/domain/repositories/UserTokenRepository.ts
import { UserToken } from '../entities/UserToken';
import { UUID } from '../value-objects/UUID';

export interface UserTokenRepository {
  /**
   * Find token by ID
   */
  findById(id: UUID): Promise<UserToken | null>;

  /**
   * Find a token by the actual token string
   */
  findByToken(token: string): Promise<UserToken | null>;

  /**
   * Save a new token
   */
  save(token: UserToken): Promise<void>;

  /**
   * Update an existing token
   */
  update(token: UserToken): Promise<void>;

  /**
   * Delete a token by ID
   */
  delete(id: UUID): Promise<void>;
}
