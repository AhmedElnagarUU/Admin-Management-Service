// src/domain/value-objects/Password.ts

/**
 * Password value object
 * Handles validation and normalization of passwords.
 * (Hashing will be handled by infrastructure or service later)
 */
export class Password {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Factory method — validates password strength before creation
   */
  public static create(password: string): Password {
    if (!Password.isValid(password)) {
      throw new Error(
        'Password must be at least 8 characters long, include one uppercase, one lowercase, one number, and one special character.'
      );
    }
    return new Password(password);
  }

  /**
   * Simple password strength validation
   */
  private static isValid(password: string): boolean {
    // You can make this regex stricter based on system requirements
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    return strongPasswordRegex.test(password);
  }

  /**
   * Returns the plain value — should be used carefully
   */
  public getValue(): string {
    return this.value;
  }

  /**
   * Compares two passwords (plain-text)
   */
  public equals(other: Password): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return '********'; // never expose the raw password
  }
}
