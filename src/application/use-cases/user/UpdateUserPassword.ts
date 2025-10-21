// src/application/use-cases/user/UpdateUserPassword.ts

import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UUID } from '../../../domain/value-objects/UUID';
import { Password } from '../../../domain/value-objects/Password';
import { DomainException } from '../../../domain/common/DomainException';

interface UpdateUserPasswordRequest {
  userId: string;       // raw string ID
  newPassword: string;  // plain-text password
}

export class UpdateUserPassword {
  constructor(private userRepo: UserRepository) {}

  public async execute(request: UpdateUserPasswordRequest): Promise<void> {
    // Convert raw string to UUID value object
    const userIdVO = UUID.create(() => request.userId);

    // Find the user
    const user = await this.userRepo.findById(userIdVO);
    if (!user) {
      throw new DomainException('User not found', 'USER_NOT_FOUND');
    }

    // Create Password value object (validates strength)
    const newPasswordVO = Password.create(request.newPassword);

    // Change password
    user.changePassword(newPasswordVO);

    // Persist the changes
    await this.userRepo.update(user);
  }
}
