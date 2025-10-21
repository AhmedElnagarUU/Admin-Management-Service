// src/domain/value-objects/UUID.ts
export class UUID {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(generator: () => string = UUID.defaultGenerator): UUID {
    const id = generator();
    if (!UUID.isValid(id)) {
      throw new Error(`Invalid UUID format: ${id}`);
    }
    return new UUID(id);
  }

  private static defaultGenerator(): string {
    // fallback generator
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  private static isValid(id: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: UUID): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
