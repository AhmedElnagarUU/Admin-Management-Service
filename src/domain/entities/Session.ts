// src/domain/entities/Session.ts
// ==============================================
// Session Aggregate
// Represents a user session / refresh token
// ==============================================

import { UUID } from '../value-objects/UUID';

export class Session {
  private readonly id: UUID;
  private readonly userId: UUID;
  private readonly deviceInfo?: string;
  private readonly ipAddress?: string;
  private readonly createdAt: Date;
  private expiresAt: Date;
  private revokedAt?: Date;
  private tokenHash: string;

  constructor(params: {
    userId: UUID;
    tokenHash: string;
    expiresAt: Date;
    deviceInfo?: string;
    ipAddress?: string;
    id?: UUID;
    createdAt?: Date;
  }) {
    this.id = params.id ?? UUID.create();
    this.userId = params.userId;
    this.tokenHash = params.tokenHash;
    this.expiresAt = params.expiresAt;
    this.deviceInfo = params.deviceInfo;
    this.ipAddress = params.ipAddress;
    this.createdAt = params.createdAt ?? new Date();
  }

  // Getters
  public getId(): UUID {
    return this.id;
  }

  public getUserId(): UUID {
    return this.userId;
  }

  public getDeviceInfo(): string | undefined {
    return this.deviceInfo;
  }

  public getIpAddress(): string | undefined {
    return this.ipAddress;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getExpiresAt(): Date {
    return this.expiresAt;
  }

  public getTokenHash(): string {
    return this.tokenHash;
  }

  public isActive(): boolean {
    return !this.revokedAt && this.expiresAt > new Date();
  }

  // Behaviors
  public revoke(): void {
    this.revokedAt = new Date();
  }

  public updateToken(tokenHash: string, newExpiry: Date): void {
    this.tokenHash = tokenHash;
    this.expiresAt = newExpiry;
    this.revokedAt = undefined;
  }
}
