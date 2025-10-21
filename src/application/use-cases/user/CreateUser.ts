// src/application/use-cases/user/CreateUser.ts
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';
import { User, UserStatus } from '../../../domain/entities/User';
import { DomainException } from '../../../domain/common/DomainException';

interface CreateUserRequest {
  email: string;
  password: string;
  roles?: string[];
}

export class CreateUser {
  constructor(private userRepo: UserRepository) {}

  public async execute(request: CreateUserRequest): Promise<User> {
    // 1️⃣ Normalize and validate email
    const emailVO = Email.create(request.email);

    // 2️⃣ Check if email already exists
    const existingUser = await this.userRepo.findByEmail(emailVO.getValue());
    if (existingUser) {
      throw new DomainException('Email already in use', 'EMAIL_EXISTS');
    }

    // 3️⃣ Create password value object
    const passwordVO = Password.create(request.password);

    // 4️⃣ Register user (status = Pending)
    const user = User.register(emailVO, passwordVO, request.roles ?? []);

    // 5️⃣ Save user to repository
    await this.userRepo.save(user);

    // 6️⃣ Return the newly created user
    return user;
  }
}
