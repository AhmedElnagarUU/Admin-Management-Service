// ==============================================
// File: src/infrastructure/http/controllers/AuthController.ts
// ----------------------------------------------
// AuthController (Mongo version)
// - Handles HTTP requests for authentication (register, verify email, login)
// - Uses MongoDB repositories implemented with Mongoose
// ==============================================

import { Request, Response } from 'express';
import { RegisterUser } from '../../../application/use-cases/user/RegisterUser';
import { VerifyUserEmail } from '../../../application/use-cases/user/VerifyUserEmail';
import { MongooseUserRepository } from '../../database/mongoose/repositories/MongooseUserRepository';
import { MongooseUserTokenRepository } from '../../database/mongoose/repositories/MongooseUserTokenRepository';

// Instantiate real Mongoose-based repositories
const userRepo = new MongooseUserRepository();
const tokenRepo = new MongooseUserTokenRepository();

export class AuthController {
  /**
   * Register a new user
   */
  static async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const registerUser = new RegisterUser(userRepo, tokenRepo);
      const user = await registerUser.execute({ email, password });

      return res.status(201).json({
        message: 'User registered successfully. Please verify your email.',
        user: {
          id: user.getId().getValue(),
          email: user.getEmail().getValue(),
          status: user.getStatus(),
        },
      });
    } catch (err: any) {
      console.error('Error in AuthController.register:', err);
      return res.status(400).json({ error: err.message });
    }
  }

  /**
   * Verify user email with token
   */
  static async verifyEmail(req: Request, res: Response) {
    try {
      const { token } = req.body;

      const verifyEmail = new VerifyUserEmail(userRepo, tokenRepo);
      const user = await verifyEmail.execute({ token });

      return res.status(200).json({
        message: 'Email verified successfully.',
        user: {
          id: user.getId().getValue(),
          email: user.getEmail().getValue(),
          status: user.getStatus(),
        },
      });
    } catch (err: any) {
      console.error('Error in AuthController.verifyEmail:', err);
      return res.status(400).json({ error: err.message });
    }
  }

  /**
   * Placeholder for login (to be implemented later)
   */
  static async login(_req: Request, res: Response) {
    return res.status(501).json({ message: 'Login not implemented yet.' });
  }
}
