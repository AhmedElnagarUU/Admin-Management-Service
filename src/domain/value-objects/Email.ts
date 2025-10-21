// src/domain/value-objects/Email.ts

/**
 * Email value object
 * Represents a validated and normalized email address.
 * Immutable and self-validating.
 */
export class Email {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value.toLowerCase().trim();
  }

  /**
   * Factory method to create a valid Email instance
   */
  public static create(email: string): Email {
    if (!Email.isValid(email)) {
      throw new Error(`Invalid email format: ${email}`);
    }
    return new Email(email);
  }

  /**
   * Validates email format
   */
  private static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Returns the raw email string
   */
  public getValue(): string {
    return this.value;
  }

  /**
   * Compares two Email objects
   */
  public equals(other: Email): boolean {
    return this.value === other.value;
  }

  /**
   * Converts to string for display/logging
   */
  public toString(): string {
    return this.value;
  }
}
