// ==============================================
// File: src/domain/entities/UserToken.ts
// ----------------------------------------------
// UserToken Entity
// ----------------------------------------------
// Represents a temporary, single-use token used for:
// - Email verification
// - Password reset
//
// This entity belongs to the domain layer and encapsulates
// domain logic related to token validity, expiration, and usage.
//
// NOTE: The token stored here is typically a HASH — not the plain token string
// sent to users, for better security.
// ==============================================

import { UUID } from '../value-objects/UUID';

/**
 * Enumeration of token purposes (types)
 */
export enum UserTokenType {
  PASSWORD_RESET = 'PASSWORD_RESET',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
}

/**
 * UserToken entity definition
 */
export class UserToken {
  private readonly id: UUID;
  private readonly userId: UUID;
  private readonly tokenHash: string;
  private readonly type: UserTokenType;
  private readonly createdAt: Date;
  private readonly expiresAt: Date;
  private usedAt?: Date;

  constructor(params: {
    userId: UUID;
    tokenHash: string;
    type: UserTokenType;
    expiresAt: Date;
    id?: UUID;
    createdAt?: Date;
  }) {
    this.id = params.id ?? UUID.create();
    this.userId = params.userId;
    this.tokenHash = params.tokenHash;
    this.type = params.type;
    this.expiresAt = params.expiresAt;
    this.createdAt = params.createdAt ?? new Date();
  }

  // ------------------------
  // Getters
  // ------------------------

  /** Unique token ID */
  public getId(): UUID {
    return this.id;
  }

  /** User ID associated with this token */
  public getUserId(): UUID {
    return this.userId;
  }

  /** Returns the token hash value (safe for persistence) */
  public getTokenHash(): string {
    return this.tokenHash;
  }

  /** Alias for getTokenHash() — useful for cleaner use-case code */
  public getToken(): string {
    return this.tokenHash;
  }

  /** Type of token (password reset, email verification, etc.) */
  public getType(): UserTokenType {
    return this.type;
  }

  /** Creation timestamp */
  public getCreatedAt(): Date {
    return this.createdAt;
  }

  /** Expiration timestamp */
  public getExpiresAt(): Date {
    return this.expiresAt;
  }

  /** Date when the token was used, if applicable */
  public getUsedAt(): Date | undefined {
    return this.usedAt;
  }

  // ------------------------
  // Domain behaviors
  // ------------------------

  /** Mark this token as used */
  public markUsed(): void {
    this.usedAt = new Date();
  }

  /** Check if token has expired */
  public isExpired(): boolean {
    return this.expiresAt <= new Date();
  }

  /** Check if token is still valid and unused */
  public isActive(): boolean {
    return !this.usedAt && !this.isExpired();
  }
}
