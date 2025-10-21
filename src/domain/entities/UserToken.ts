// src/domain/entities/UserToken.ts
// ==============================================
// UserToken Entity
// Handles Password Reset or Email Verification tokens
// ==============================================

import { UUID } from '../value-objects/UUID';

export enum UserTokenType {
  PASSWORD_RESET = 'PASSWORD_RESET',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
}

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

  // Getters
  public getId(): UUID {
    return this.id;
  }

  public getUserId(): UUID {
    return this.userId;
  }

  public getTokenHash(): string {
    return this.tokenHash;
  }

  public getType(): UserTokenType {
    return this.type;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getExpiresAt(): Date {
    return this.expiresAt;
  }

  public getUsedAt(): Date | undefined {
    return this.usedAt;
  }

  // Behaviors
  public markUsed(): void {
    this.usedAt = new Date();
  }

  public isExpired(): boolean {
    return this.expiresAt <= new Date();
  }

  public isActive(): boolean {
    return !this.usedAt && !this.isExpired();
  }
}
