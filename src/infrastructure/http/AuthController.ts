// File: src/infrastructure/http/AuthController.ts
// ==============================================
// Purpose:
//   - Handle authentication HTTP requests (register, login, verify email, etc.)
//   - Call corresponding use cases from application layer
// ==============================================

import { Request, Response } from 'express';
import { VerifyUserEmail } from '../../application/use-cases/user/VerifyUserEmail';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserTokenRepository } from '../../domain/repositories/UserTokenRepository';

export class AuthController {
  constructor(
    private verifyUserEmailUseCase: VerifyUserEmail
  ) {}

  // Example: Verify user email endpoint
  async verifyEmail(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const user = await this.verifyUserEmailUseCase.execute({ token });
      res.json({ message: 'Email verified', userId: user.getId().toString() });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
