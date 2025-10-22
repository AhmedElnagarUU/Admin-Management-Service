// File: src/infrastructure/services/HashService.ts
// ==============================================
// Purpose:
//   - Handle password hashing and comparison
//   - Can be replaced with bcrypt or Argon2
// ==============================================

export class HashService {
  static async hash(password: string): Promise<string> {
    // Simple example; replace with bcrypt.hash(password, saltRounds)
    return `hashed-${password}`;
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    // Simple example; replace with bcrypt.compare
    return `hashed-${password}` === hash;
  }
}
