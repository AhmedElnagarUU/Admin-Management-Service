// ==============================================
// File: src/infrastructure/http/routes/index.ts
// ----------------------------------------------
// Root router for all API versions.
// Passes control to versioned routers like v1, v2, etc.
// ==============================================

import express from 'express';
import authRoutes from './v1/authRoutes';

const router = express.Router();

// All version 1 routes
router.use('/v1/auth', authRoutes);

export default router;
