// src/application/use-cases/user/AssignRoleToUser.ts

import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UUID } from '../../../domain/value-objects/UUID';
import { DomainException } from '../../../domain/common/DomainException';

interface AssignRoleToUserRequest {
  userId: string; // raw string from input
  role: string;
}

export class AssignRoleToUser {
  constructor(private userRepo: UserRepository) {}

  public async execute(request: AssignRoleToUserRequest): Promise<void> {
    // Convert string to UUID value object
    const userIdVO = UUID.create(() => request.userId);

    // Find the user
    const user = await this.userRepo.findById(userIdVO);
    if (!user) {
      throw new DomainException('User not found', 'USER_NOT_FOUND');
    }

    // Assign the role
    user.assignRole(request.role);

    // Save the updated user
    await this.userRepo.update(user);
  }
}
