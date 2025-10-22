// File: src/server.ts
// ==============================================
// Purpose:
//   - Initialize Express app
//   - Register middleware (JSON parser, logging, etc.)
//   - Mount routes from infrastructure layer
// ==============================================

import express, { Application } from 'express';
import { json } from 'body-parser';
import { authRoutes } from './infrastructure/http/authRoutes';

export const createServer = (): Application => {
  const app = express();

  // Middleware
  app.use(json()); // parse JSON body

  // Routes
  app.use('/api/auth', authRoutes);

  // Health check
  app.get('/health', (req, res) => res.json({ status: 'ok' }));

  return app;
};
