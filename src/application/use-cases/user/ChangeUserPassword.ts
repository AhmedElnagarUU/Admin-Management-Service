// ============================================================
// File: src/application/use-cases/user/ChangeUserPassword.ts
// ============================================================
// Use Case: ChangeUserPassword
// ---------------------------
// This use case allows a user’s password to be changed.
// Responsibilities:
// 1. Retrieve the user by ID
// 2. Validate that the user exists
// 3. Update the password using the Password value object
// 4. Persist the updated user in the repository
// ============================================================

import { UserRepository } from '../../../domain/repositories/UserRepository';
import { Password } from '../../../domain/value-objects/Password';
import { DomainException } from '../../../domain/common/DomainException';
import { UUID } from '../../../domain/value-objects/UUID'

interface ChangeUserPasswordRequest {
  userId: string;       // User ID
  newPassword: string;  // New plain password
}

export class ChangeUserPassword {
  constructor(private userRepo: UserRepository) {}

  public async execute(request: ChangeUserPasswordRequest) {
    // 1️⃣ Find the user by ID
    const user = await this.userRepo.findById(UUID.create(() => request.userId));
    if (!user) {
      throw new DomainException('User not found', 'USER_NOT_FOUND');
    }

    // 2️⃣ Create Password value object
    const newPasswordVO = Password.create(request.newPassword);

    // 3️⃣ Update user's password
    user.changePassword(newPasswordVO);

    // 4️⃣ Persist changes
    await this.userRepo.update(user);

    // ✅ Return updated user
    return user;
  }
}
