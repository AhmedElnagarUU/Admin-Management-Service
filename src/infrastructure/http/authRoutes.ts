// File: src/infrastructure/http/authRoutes.ts
// ==============================================
// Purpose:
//   - Define authentication-related HTTP routes
//   - Connect routes to controller methods
// ==============================================

import { Router } from 'express';
import { AuthController } from './AuthController';
import { VerifyUserEmail } from '../../application/use-cases/user/VerifyUserEmail';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserTokenRepository } from '../../domain/repositories/UserTokenRepository';

// TODO: replace with real repository instances
const userRepo: UserRepository = {} as any;
const tokenRepo: UserTokenRepository = {} as any;

const verifyUserEmailUseCase = new VerifyUserEmail(userRepo, tokenRepo);
const controller = new AuthController(verifyUserEmailUseCase);

export const authRoutes = Router();

authRoutes.post('/verify-email', (req, res) => controller.verifyEmail(req, res));
