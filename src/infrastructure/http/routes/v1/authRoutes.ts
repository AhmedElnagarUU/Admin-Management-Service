// ==============================================
// File: src/infrastructure/http/routes/v1/authRoutes.ts
// ----------------------------------------------
// Handles all /api/v1/auth routes.
// Connects HTTP endpoints to controller actions.
// ==============================================

import express from 'express';
import { AuthController } from '../../controllers/AuthController';

const router = express.Router();

// Register
router.post('/register', AuthController.register);

// Verify Email
router.post('/verify-email', AuthController.verifyEmail);

// Login (for example, later)
router.post('/login', AuthController.login);

export default router;
