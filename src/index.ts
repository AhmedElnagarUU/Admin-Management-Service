// File: src/index.ts
// ==============================================
// Purpose:
//   - Server entry point
//   - Starts the Express server using server.ts
// ==============================================

import { createServer } from './server';

const PORT = process.env.PORT || 3000;

const app = createServer();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
