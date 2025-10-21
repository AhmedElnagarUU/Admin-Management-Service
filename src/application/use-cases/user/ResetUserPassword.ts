// ============================================================
// File: src/application/use-cases/user/ResetUserPassword.ts
// ============================================================
// Use Case: ResetUserPassword
// ---------------------------
// This use case handles resetting a user's password using a token.
// Responsibilities of the application layer:
// 1. Retrieve the token and validate it
// 2. Verify that the token is active and of the correct type
// 3. Retrieve the associated user
// 4. Update the user's password
// 5. Persist changes to the user repository
// 6. Mark the token as used
// ============================================================

import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UserTokenRepository } from '../../../domain/repositories/UserTokenRepository';
import { DomainException } from '../../../domain/common/DomainException';
import { UserToken, UserTokenType } from '../../../domain/entities/UserToken';
import { Password } from '../../../domain/value-objects/Password';

interface ResetUserPasswordRequest {
  token: string;          // Token provided by the user for password reset
  newPassword: string;    // The new password to set
}

export class ResetUserPassword {
  constructor(
    private userRepo: UserRepository,
    private tokenRepo: UserTokenRepository
  ) {}

  public async execute(request: ResetUserPasswordRequest) {
    // 1️⃣ Retrieve token entity
    const tokenEntity = await this.tokenRepo.findByToken(request.token);
    if (!tokenEntity || tokenEntity.getType() !== UserTokenType.PASSWORD_RESET) {
      throw new DomainException('Invalid or expired token', 'TOKEN_INVALID');
    }

    // 2️⃣ Check if token is active
    if (!tokenEntity.isActive()) {
      throw new DomainException('Token is expired or already used', 'TOKEN_INACTIVE');
    }

    // 3️⃣ Retrieve the user associated with the token
    const user = await this.userRepo.findById(tokenEntity.getUserId());
    if (!user) {
      throw new DomainException('User not found', 'USER_NOT_FOUND');
    }

    // 4️⃣ Update the user's password
    const newPassword = Password.create(request.newPassword); // create value object
    user.changePassword(newPassword);

    // 5️⃣ Persist changes
    await this.userRepo.update(user);

    // 6️⃣ Mark token as used
    tokenEntity.markUsed();
    await this.tokenRepo.update(tokenEntity);

    // ✅ Return updated user entity
    return user;
  }
}
