// src/domain/repositories/SessionRepository.ts
import { UUID } from '../value-objects/UUID';

/**
 * Session entity is not yet fully created in domain,
 * but we can define repository interface for refresh tokens / sessions
 */
export interface SessionRepository {
  /**
   * Create a new session
   */
  create(session: {
    id: UUID;
    userId: UUID;
    tokenHash: string;
    deviceInfo?: string;
    ipAddress?: string;
    expiresAt: Date;
    createdAt?: Date;
    revokedAt?: Date;
  }): Promise<void>;

  /**
   * Find session by ID
   */
  findById(id: UUID): Promise<any | null>; // Replace `any` with a proper Session entity later

  /**
   * Find active sessions for a user
   */
  findActiveByUser(userId: UUID): Promise<any[]>;

  /**
   * Revoke a session
   */
  revoke(sessionId: UUID): Promise<void>;

  /**
   * Revoke all sessions for a user
   */
  revokeAllForUser(userId: UUID): Promise<void>;
}
