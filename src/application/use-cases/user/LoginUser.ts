// src/application/use-cases/user/LoginUser.ts
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { DomainException } from '../../../domain/common/DomainException';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';

interface LoginUserRequest {
  email: string;
  password: string;
}

export class LoginUser {
  constructor(private userRepo: UserRepository) {}

  public async execute(request: LoginUserRequest) {
    // 1️⃣ Normalize email
    const emailVO = Email.create(request.email);

    // 2️⃣ Find user by email
    const user = await this.userRepo.findByEmail(emailVO.getValue());
    if (!user) {
      throw new DomainException('User not found', 'USER_NOT_FOUND');
    }

    // 3️⃣ Check user status
    if (user.getStatus() !== 'ACTIVE') {
      throw new DomainException('User is not active', 'USER_INACTIVE');
    }

    // 4️⃣ Check password
    const passwordVO = Password.create(request.password); // plain password
    if (!user.getPassword().equals(passwordVO)) {
      throw new DomainException('Invalid credentials', 'INVALID_CREDENTIALS');
    }

    // 5️⃣ Return user (or later generate JWT in infra)
    return user;
  }
}
