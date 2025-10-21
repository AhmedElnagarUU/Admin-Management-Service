// src/domain/entities/User.ts
// ==============================================
// User Entity
// Aggregate root for authentication domain
// Holds value objects: UUID, Email, Password
// Manages status, roles, timestamps, and domain behaviors
// ==============================================

import { UUID } from '../value-objects/UUID';
import { Email } from '../value-objects/Email';
import { Password } from '../value-objects/Password';
import { DomainException } from '../common/DomainException';

export enum UserStatus {
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
}

export class User {
  private readonly id: UUID;
  private email: Email;
  private password: Password;
  private status: UserStatus;
  private roles: string[] = [];
  private createdAt: Date;
  private updatedAt: Date;
  private emailVerifiedAt?: Date;

  private constructor(
    id: UUID,
    email: Email,
    password: Password,
    status: UserStatus,
    roles: string[],
    createdAt: Date,
    updatedAt: Date,
    emailVerifiedAt?: Date
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.status = status;
    this.roles = roles;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.emailVerifiedAt = emailVerifiedAt;
  }

  // Factory method to create a new user (Pending status)
  public static register(email: Email, password: Password, roles: string[] = []): User {
    const now = new Date();
    return new User(
      UUID.create(),
      email,
      password,
      UserStatus.Pending,
      roles,
      now,
      now
    );
  }

  // Verify email
  public verifyEmail(): void {
    if (this.status === UserStatus.Disabled) {
      throw new DomainException('Cannot verify disabled user', 'USER_DISABLED');
    }
    this.status = UserStatus.Active;
    this.emailVerifiedAt = new Date();
    this.updatedAt = new Date();
  }

  // Change password
  public changePassword(newPassword: Password): void {
    this.password = newPassword;
    this.updatedAt = new Date();
  }

  // Disable user
  public disable(): void {
    this.status = UserStatus.Disabled;
    this.updatedAt = new Date();
  }

  // Assign role
  public assignRole(role: string): void {
    if (!this.roles.includes(role)) {
      this.roles.push(role);
      this.updatedAt = new Date();
    }
  }

  // Remove role
  public removeRole(role: string): void {
    this.roles = this.roles.filter(r => r !== role);
    this.updatedAt = new Date();
  }

  // Getters
  public getId(): UUID { return this.id; }
  public getEmail(): Email { return this.email; }
  public getPassword(): Password { return this.password; }
  public getStatus(): UserStatus { return this.status; }
  public getRoles(): string[] { return [...this.roles]; }
  public getCreatedAt(): Date { return this.createdAt; }
  public getUpdatedAt(): Date { return this.updatedAt; }
  public getEmailVerifiedAt(): Date | undefined { return this.emailVerifiedAt; }
}
