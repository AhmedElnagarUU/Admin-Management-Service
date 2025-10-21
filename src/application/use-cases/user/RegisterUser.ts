// src/application/use-cases/user/RegisterUser.ts
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';
import { User } from '../../../domain/entities/User';
import { DomainException } from '../../../domain/common/DomainException';

interface RegisterUserRequest {
  email: string;
  password: string;
  roles?: string[];
}

export class RegisterUser {
  constructor(private userRepo: UserRepository) {}

  /**
   * Execute registration
   */
  public async execute(request: RegisterUserRequest): Promise<User> {
    const emailVO = Email.create(request.email);
    const passwordVO = Password.create(request.password);

    // Check if user already exists
    const existing = await this.userRepo.findByEmail(emailVO.getValue());
    if (existing) {
      throw new DomainException('Email already in use', 'EMAIL_EXISTS');
    }

    // Create user aggregate
    const user = User.register(emailVO, passwordVO, request.roles ?? []);

    // Save in repository
    await this.userRepo.save(user);

    return user;
  }
}
