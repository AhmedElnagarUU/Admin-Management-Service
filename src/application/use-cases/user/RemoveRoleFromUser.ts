// src/application/use-cases/user/RemoveRoleFromUser.ts

import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UUID } from '../../../domain/value-objects/UUID';
import { DomainException } from '../../../domain/common/DomainException';

interface RemoveRoleFromUserRequest {
  userId: string; // raw string input
  role: string;
}

export class RemoveRoleFromUser {
  constructor(private userRepo: UserRepository) {}

  public async execute(request: RemoveRoleFromUserRequest): Promise<void> {
    // Convert raw string to UUID value object
    const userIdVO = UUID.create(() => request.userId);

    // Find the user
    const user = await this.userRepo.findById(userIdVO);
    if (!user) {
      throw new DomainException('User not found', 'USER_NOT_FOUND');
    }

    // Remove the role
    user.removeRole(request.role);

    // Save updated user
    await this.userRepo.update(user);
  }
}
