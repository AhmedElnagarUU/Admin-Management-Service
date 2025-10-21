// src/domain/entities/Permission.ts
// ==============================================
// Permission Entity
// Represents a system action that can be assigned to roles
// ==============================================

import { UUID } from '../value-objects/UUID';

export class Permission {
  private readonly id: UUID;
  private name: string; // e.g., 'users.manage', 'orders.read'
  private description?: string;

  constructor(name: string, description?: string, id?: UUID) {
    this.id = id ?? UUID.create();
    this.name = name;
    this.description = description;
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

  // Behaviors
  public rename(newName: string): void {
    this.name = newName;
  }

  public updateDescription(description: string): void {
    this.description = description;
  }
}
