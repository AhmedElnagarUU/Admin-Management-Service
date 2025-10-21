// ============================================================
// File: src/application/use-cases/user/VerifyUserEmail.ts
// ============================================================
// Use Case: VerifyUserEmail
// -------------------------
// This use case handles the process of verifying a user's email
// using a token. It follows the application layer's responsibility 
// of coordinating domain entities and repositories without directly
// dealing with infrastructure.
//
// Steps:
// 1. Retrieve the token from the repository
// 2. Validate token type and status
// 3. Find the associated user
// 4. Activate the user account
// 5. Persist the updated user
// 6. Mark the token as used
// ============================================================

import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UserTokenRepository } from '../../../domain/repositories/UserTokenRepository';
import { DomainException } from '../../../domain/common/DomainException';
import { UserToken, UserTokenType } from '../../../domain/entities/UserToken';

interface VerifyUserEmailRequest {
  token: string; // Token provided by the user for email verification
}

export class VerifyUserEmail {
  constructor(
    private userRepo: UserRepository,
    private tokenRepo: UserTokenRepository
  ) {}

  public async execute(request: VerifyUserEmailRequest) {
    // 1️⃣ Retrieve token entity from repository
    const tokenEntity = await this.tokenRepo.findByToken(request.token);
    if (!tokenEntity || tokenEntity.getType() !== UserTokenType.EMAIL_VERIFICATION) {
      throw new DomainException('Invalid or expired token', 'TOKEN_INVALID');
    }

    // 2️⃣ Check if token is active (not used or expired)
    if (!tokenEntity.isActive()) {
      throw new DomainException('Token is expired or already used', 'TOKEN_INACTIVE');
    }

    // 3️⃣ Find the user associated with the token
    const user = await this.userRepo.findById(tokenEntity.getUserId());
    if (!user) {
      throw new DomainException('User not found', 'USER_NOT_FOUND');
    }

    // 4️⃣ Activate the user's email (update domain entity)
    user.verifyEmail();

    // 5️⃣ Persist changes to user repository
    await this.userRepo.update(user);

    // 6️⃣ Mark the token as used and update repository
    tokenEntity.markUsed();
    await this.tokenRepo.update(tokenEntity);

    // ✅ Return the updated user entity
    return user;
  }
}
