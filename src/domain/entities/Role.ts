// src/domain/entities/Role.ts
// ==============================================
// Role Aggregate
// Represents a user role and its associated permissions
// ==============================================

import { UUID } from '../value-objects/UUID';

export class Role {
  private readonly id: UUID;
  private name: string;
  private description?: string;
  private permissions: Set<string>; // e.g., ['users.manage', 'orders.read']

  constructor(name: string, description?: string, permissions: string[] = [], id?: UUID) {
    this.id = id ?? UUID.create();
    this.name = name;
    this.description = description;
    this.permissions = new Set(permissions);
  }

  // Getters
  public getId(): UUID {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string | undefined {
    return this.description;
  }

  public getPermissions(): string[] {
    return Array.from(this.permissions);
  }

  // Behaviors
  public addPermission(permission: string): void {
    this.permissions.add(permission);
  }

  public removePermission(permission: string): void {
    this.permissions.delete(permission);
  }

  public hasPermission(permission: string): boolean {
    return this.permissions.has(permission);
  }
}
